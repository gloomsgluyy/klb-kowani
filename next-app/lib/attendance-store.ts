export const RECEPTIONIST_TOKEN = "klb-reception-2026"

export type AttendanceStatus = "not_checked_in" | "checked_in"

export type GuestRecord = {
  invitationNumber: string
  fullName: string
  organization: string
  role?: string
  phone?: string
  notes?: string
  attendanceStatus: AttendanceStatus
  checkedInAt: string | null
}

export type AttendanceEvent = {
  event: "guest_checked_in"
  guest: GuestRecord
}

export type AttendanceSummary = {
  totalGuests: number
  totalCheckedIn: number
  totalPending: number
  attendanceRate: number
  recentArrivals: GuestRecord[]
  guests: GuestRecord[]
}

const STORAGE_KEY = "klb-attendance-guests"
const CHANNEL_NAME = "klb-attendance"

const seedGuests: GuestRecord[] = [
  {
    invitationNumber: "A-001",
    fullName: "Susi Maharani",
    organization: "Organisasi A",
    role: "Delegasi",
    attendanceStatus: "not_checked_in",
    checkedInAt: null,
  },
  {
    invitationNumber: "A-002",
    fullName: "Rina Puspitasari",
    organization: "Persatuan Perempuan Indonesia",
    role: "Pengurus",
    attendanceStatus: "not_checked_in",
    checkedInAt: null,
  },
  {
    invitationNumber: "B-014",
    fullName: "Dr. Siti Nurhaliza Wijaya",
    organization: "Kongres Wanita Indonesia",
    role: "Undangan Kehormatan",
    attendanceStatus: "not_checked_in",
    checkedInAt: null,
  },
  {
    invitationNumber: "C-021",
    fullName: "Maya Kartika",
    organization: "Forum Perempuan Nusantara",
    role: "Peninjau",
    attendanceStatus: "not_checked_in",
    checkedInAt: null,
  },
  {
    invitationNumber: "D-108",
    fullName: "Dewi Anggraini",
    organization: "Ikatan Wanita Mandiri",
    role: "Delegasi",
    attendanceStatus: "not_checked_in",
    checkedInAt: null,
  },
]

export function normalizeInvitationNumber(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase()
}

export function formatCheckInTime(value: string | null) {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function getBrowserStorage() {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage
}

function sortByArrival(guests: GuestRecord[]) {
  return [...guests].sort((first, second) => {
    const firstTime = first.checkedInAt
      ? new Date(first.checkedInAt).getTime()
      : 0
    const secondTime = second.checkedInAt
      ? new Date(second.checkedInAt).getTime()
      : 0

    return secondTime - firstTime
  })
}

export function loadGuests() {
  const storage = getBrowserStorage()

  if (!storage) {
    return seedGuests
  }

  const storedGuests = storage.getItem(STORAGE_KEY)

  if (!storedGuests) {
    storage.setItem(STORAGE_KEY, JSON.stringify(seedGuests))
    return seedGuests
  }

  try {
    return JSON.parse(storedGuests) as GuestRecord[]
  } catch {
    storage.setItem(STORAGE_KEY, JSON.stringify(seedGuests))
    return seedGuests
  }
}

function saveGuests(guests: GuestRecord[]) {
  const storage = getBrowserStorage()

  if (!storage) {
    return
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(guests))
}

export function verifyGuest(invitationNumber: string) {
  const normalizedInvitationNumber = normalizeInvitationNumber(invitationNumber)

  return (
    loadGuests().find(
      (guest) => guest.invitationNumber === normalizedInvitationNumber
    ) ?? null
  )
}

export function checkInGuest(invitationNumber: string) {
  const normalizedInvitationNumber = normalizeInvitationNumber(invitationNumber)
  const guests = loadGuests()
  const guestIndex = guests.findIndex(
    (guest) => guest.invitationNumber === normalizedInvitationNumber
  )

  if (guestIndex < 0) {
    return { status: "not_found" as const, guest: null }
  }

  const guest = guests[guestIndex]

  if (guest.attendanceStatus === "checked_in") {
    return { status: "already_checked_in" as const, guest }
  }

  const checkedInGuest: GuestRecord = {
    ...guest,
    attendanceStatus: "checked_in",
    checkedInAt: new Date().toISOString(),
  }

  const updatedGuests = [...guests]
  updatedGuests[guestIndex] = checkedInGuest
  saveGuests(updatedGuests)
  publishAttendanceEvent(checkedInGuest)

  return { status: "checked_in" as const, guest: checkedInGuest }
}

export function getAttendanceSummary(): AttendanceSummary {
  return createAttendanceSummary(loadGuests())
}

export function getSeedAttendanceSummary(): AttendanceSummary {
  return createAttendanceSummary(seedGuests)
}

function createAttendanceSummary(guests: GuestRecord[]): AttendanceSummary {
  const checkedInGuests = sortByArrival(
    guests.filter((guest) => guest.attendanceStatus === "checked_in")
  )

  return {
    totalGuests: guests.length,
    totalCheckedIn: checkedInGuests.length,
    totalPending: guests.length - checkedInGuests.length,
    attendanceRate:
      guests.length > 0
        ? Math.round((checkedInGuests.length / guests.length) * 100)
        : 0,
    recentArrivals: checkedInGuests.slice(0, 5),
    guests: checkedInGuests,
  }
}

export function resetAttendanceDemo() {
  saveGuests(seedGuests)
}

function publishAttendanceEvent(guest: GuestRecord) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
    return
  }

  const channel = new BroadcastChannel(CHANNEL_NAME)
  channel.postMessage({
    event: "guest_checked_in",
    guest,
  } satisfies AttendanceEvent)
  channel.close()
}

export function subscribeAttendance(
  listener: (attendanceEvent: AttendanceEvent) => void
) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
    return () => {}
  }

  const channel = new BroadcastChannel(CHANNEL_NAME)

  channel.onmessage = (message) => {
    const attendanceEvent = message.data as AttendanceEvent

    if (attendanceEvent.event === "guest_checked_in") {
      listener(attendanceEvent)
    }
  }

  return () => {
    channel.close()
  }
}
