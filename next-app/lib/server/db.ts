import { Pool, type PoolClient } from "pg"

import type {
  AttendanceSummary,
  GuestOrganizationGroup,
  GuestRecord,
} from "@/lib/attendance-types"
import { normalizeInvitationNumber } from "@/lib/attendance-types"

type GuestRow = {
  invitation_number: string
  full_name: string
  organization: string
  role: string | null
  phone: string | null
  notes: string | null
  attendance_status: "not_checked_in" | "checked_in"
  checked_in_at: Date | string | null
}

type CountRow = {
  total_guests: string
  total_checked_in: string
}

const globalForPool = globalThis as unknown as {
  klbPgPool?: Pool
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured")
  }

  globalForPool.klbPgPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  return globalForPool.klbPgPool
}

function mapGuest(row: GuestRow): GuestRecord {
  return {
    invitationNumber: row.invitation_number,
    fullName: row.full_name,
    organization: row.organization,
    role: row.role ?? undefined,
    phone: row.phone ?? undefined,
    notes: row.notes ?? undefined,
    attendanceStatus: row.attendance_status,
    checkedInAt: row.checked_in_at
      ? new Date(row.checked_in_at).toISOString()
      : null,
  }
}

export async function findGuestByInvitation(invitationNumber: string) {
  const normalizedInvitationNumber = normalizeInvitationNumber(invitationNumber)
  const result = await getPool().query<GuestRow>(
    `
      select
        invitation_number,
        full_name,
        organization,
        role,
        phone,
        notes,
        attendance_status,
        checked_in_at
      from guests
      where invitation_number = $1
      limit 1
    `,
    [normalizedInvitationNumber]
  )

  return result.rows[0] ? mapGuest(result.rows[0]) : null
}

export async function getGuestCatalogFromDb(): Promise<
  GuestOrganizationGroup[]
> {
  const result = await getPool().query<GuestRow>(
    `
      select
        invitation_number,
        full_name,
        organization,
        role,
        phone,
        notes,
        attendance_status,
        checked_in_at
      from guests
      order by organization asc, full_name asc
    `
  )

  const groups = new Map<string, GuestRecord[]>()

  for (const row of result.rows) {
    const guest = mapGuest(row)
    const guests = groups.get(guest.organization) ?? []

    guests.push(guest)
    groups.set(guest.organization, guests)
  }

  return Array.from(groups.entries()).map(([organization, guests]) => ({
    organization,
    guests,
    totalGuests: guests.length,
    totalCheckedIn: guests.filter(
      (guest) => guest.attendanceStatus === "checked_in"
    ).length,
  }))
}

export async function checkInGuestInDb(invitationNumber: string) {
  const normalizedInvitationNumber = normalizeInvitationNumber(invitationNumber)
  const client = await getPool().connect()

  try {
    await client.query("begin")

    const lockedGuest = await client.query<GuestRow & { id: string }>(
      `
        select
          id,
          invitation_number,
          full_name,
          organization,
          role,
          phone,
          notes,
          attendance_status,
          checked_in_at
        from guests
        where invitation_number = $1
        for update
      `,
      [normalizedInvitationNumber]
    )

    const guest = lockedGuest.rows[0]

    if (!guest) {
      await client.query("rollback")
      return { status: "not_found" as const, guest: null }
    }

    if (guest.attendance_status === "checked_in") {
      await client.query("commit")
      return { status: "already_checked_in" as const, guest: mapGuest(guest) }
    }

    const updatedGuest = await updateGuestAttendance(client, guest.id)

    await client.query(
      `
        insert into attendance_records (
          guest_id,
          invitation_number_snapshot,
          full_name_snapshot,
          organization_snapshot,
          checked_in_at
        )
        values ($1, $2, $3, $4, $5)
        on conflict (guest_id) do nothing
      `,
      [
        guest.id,
        updatedGuest.invitation_number,
        updatedGuest.full_name,
        updatedGuest.organization,
        updatedGuest.checked_in_at,
      ]
    )

    await client.query("commit")

    return { status: "checked_in" as const, guest: mapGuest(updatedGuest) }
  } catch (error) {
    await client.query("rollback")
    throw error
  } finally {
    client.release()
  }
}

async function updateGuestAttendance(client: PoolClient, guestId: string) {
  const updatedGuest = await client.query<GuestRow>(
    `
      update guests
      set
        attendance_status = 'checked_in',
        checked_in_at = now(),
        updated_at = now()
      where id = $1
      returning
        invitation_number,
        full_name,
        organization,
        role,
        phone,
        notes,
        attendance_status,
        checked_in_at
    `,
    [guestId]
  )

  return updatedGuest.rows[0]
}

export async function getAttendanceSummaryFromDb(): Promise<AttendanceSummary> {
  const [counts, checkedInGuests] = await Promise.all([
    getPool().query<CountRow>(
      `
        select
          count(*)::text as total_guests,
          count(*) filter (where attendance_status = 'checked_in')::text as total_checked_in
        from guests
      `
    ),
    getPool().query<GuestRow>(
      `
        select
          invitation_number,
          full_name,
          organization,
          role,
          phone,
          notes,
          attendance_status,
          checked_in_at
        from guests
        where attendance_status = 'checked_in'
        order by checked_in_at desc nulls last
      `
    ),
  ])

  const totalGuests = Number(counts.rows[0]?.total_guests ?? 0)
  const totalCheckedIn = Number(counts.rows[0]?.total_checked_in ?? 0)

  return {
    totalGuests,
    totalCheckedIn,
    totalPending: totalGuests - totalCheckedIn,
    attendanceRate:
      totalGuests > 0 ? Math.round((totalCheckedIn / totalGuests) * 100) : 0,
    recentArrivals: checkedInGuests.rows.slice(0, 5).map(mapGuest),
    guests: checkedInGuests.rows.map(mapGuest),
  }
}
