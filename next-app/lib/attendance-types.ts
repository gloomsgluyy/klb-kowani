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

export type AttendanceSummary = {
  totalGuests: number
  totalCheckedIn: number
  totalPending: number
  attendanceRate: number
  recentArrivals: GuestRecord[]
  guests: GuestRecord[]
}

export type GuestOrganizationGroup = {
  organization: string
  guests: GuestRecord[]
  totalGuests: number
  totalCheckedIn: number
}

export type GuestCatalogResponse =
  | {
      status: "ok"
      organizations: GuestOrganizationGroup[]
    }
  | {
      status: "error"
      message: string
    }

export type VerifyGuestResponse =
  | {
      status: "found" | "already_checked_in"
      guest: GuestRecord
    }
  | {
      status: "not_found"
      message: string
    }

export type CheckInGuestResponse =
  | {
      status: "checked_in" | "already_checked_in"
      guest: GuestRecord
    }
  | {
      status: "not_found"
      message: string
    }

export type ReceptionistSummaryResponse =
  | {
      status: "ok"
      summary: AttendanceSummary
    }
  | {
      status: "unauthorized"
      message: string
    }

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

export function isValidReceptionistToken(token: string | null | undefined) {
  const configuredToken =
    process.env.RECEPTIONIST_TOKEN ??
    (process.env.NODE_ENV === "production" ? "" : "klb-reception-2026")

  return Boolean(configuredToken) && token === configuredToken
}
