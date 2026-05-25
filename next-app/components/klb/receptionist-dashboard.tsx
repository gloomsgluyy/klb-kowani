"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  ClockIcon,
  PrinterIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import { toast } from "sonner"

import {
  AttendanceSummary,
  formatCheckInTime,
  GuestRecord,
  ReceptionistSummaryResponse,
} from "@/lib/attendance-store"
import {
  KlbBatikBackground,
  KlbFooter,
  KlbTopBar,
} from "@/components/klb/klb-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const emptySummary: AttendanceSummary = {
  totalGuests: 0,
  totalCheckedIn: 0,
  totalPending: 0,
  attendanceRate: 0,
  recentArrivals: [],
  guests: [],
}

export function ReceptionistDashboard({ token }: { token: string }) {
  const [query, setQuery] = React.useState("")
  const [summary, setSummary] = React.useState<AttendanceSummary>(emptySummary)
  const [isHydrated, setIsHydrated] = React.useState(false)
  const [ticketGuest, setTicketGuest] = React.useState<GuestRecord | null>(null)
  const previousCheckedInCount = React.useRef(0)

  React.useEffect(() => {
    let isMounted = true

    async function loadSummary(shouldToast = false) {
      let nextSummary: AttendanceSummary

      try {
        nextSummary = await fetchReceptionistSummary(token)
      } catch {
        if (isMounted) {
          setIsHydrated(true)
          toast.error("Gagal mengambil data dashboard.")
        }

        return
      }

      if (!isMounted) {
        return
      }

      if (
        shouldToast &&
        nextSummary.totalCheckedIn > previousCheckedInCount.current &&
        nextSummary.recentArrivals[0]
      ) {
        const latestGuest = nextSummary.recentArrivals[0]

        toast.success(`${latestGuest.fullName} sudah hadir di KLB.`, {
          description: `${latestGuest.organization} - ${latestGuest.invitationNumber}`,
        })
      }

      previousCheckedInCount.current = nextSummary.totalCheckedIn
      setSummary(nextSummary)
      setIsHydrated(true)
    }

    void loadSummary()

    const interval = window.setInterval(() => {
      void loadSummary(true)
    }, 3000)

    return () => {
      isMounted = false
      window.clearInterval(interval)
    }
  }, [token])

  React.useEffect(() => {
    if (!ticketGuest) {
      return
    }

    function handleAfterPrint() {
      setTicketGuest(null)
    }

    window.addEventListener("afterprint", handleAfterPrint)

    const timeout = window.setTimeout(() => {
      window.print()
    }, 80)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [ticketGuest])

  const filteredGuests = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return summary.guests
    }

    return summary.guests.filter((guest) => {
      return [
        guest.fullName,
        guest.organization,
        guest.invitationNumber,
        guest.role ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [query, summary.guests])

  function handlePrintTicket(guest: GuestRecord) {
    setTicketGuest(guest)
  }

  return (
    <>
      <main className="screen-only flex min-h-svh flex-col bg-background">
        <KlbTopBar />
        <section className="relative flex-1 overflow-hidden">
          <KlbBatikBackground />
          <div className="relative z-10 border-b bg-card/90 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
              <div className="min-w-0">
                <Badge className="mb-3" variant="secondary">
                  Resepsionis
                </Badge>
                <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  Dashboard Resepsionis
                </h1>
                <p className="text-sm text-muted-foreground">
                  Kongres Luar Biasa - Kongres Wanita Indonesia
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-8 lg:px-10">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={UsersIcon}
                label="Total Undangan"
                value={summary.totalGuests}
              />
              <MetricCard
                icon={CheckCircle2Icon}
                label="Total Hadir"
                value={summary.totalCheckedIn}
              />
              <MetricCard
                icon={ClockIcon}
                label="Belum Hadir"
                value={summary.totalPending}
              />
              <MetricCard
                icon={CheckCircle2Icon}
                label="Kehadiran"
                suffix="%"
                value={summary.attendanceRate}
              />
            </section>

            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
              <Card className="bg-card/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Arrivals</CardTitle>
                  <CardDescription>
                    Kehadiran terbaru akan muncul otomatis. Cetak tiket dari
                    masing-masing tamu.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isHydrated ? (
                    <ArrivalSkeleton />
                  ) : summary.recentArrivals.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {summary.recentArrivals.map((guest) => (
                        <ArrivalItem
                          guest={guest}
                          key={guest.invitationNumber}
                          onPrint={() => handlePrintTicket(guest)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <UsersIcon />
                        </EmptyMedia>
                        <EmptyTitle>Belum Ada Tamu Hadir</EmptyTitle>
                        <EmptyDescription>
                          Kehadiran terbaru akan muncul otomatis di sini.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Daftar Tamu Hadir</CardTitle>
                  <CardDescription>
                    Diurutkan berdasarkan waktu hadir terbaru.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="guest-search">Cari Tamu</FieldLabel>
                      <div className="relative">
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="guest-search"
                          className="h-11 pl-9"
                          placeholder="Nama, organisasi, atau nomor undangan"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </div>
                    </Field>
                  </FieldGroup>

                  {filteredGuests.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Organisasi</TableHead>
                          <TableHead>Nomor</TableHead>
                          <TableHead>Waktu Hadir</TableHead>
                          <TableHead className="text-right">Tiket</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuests.map((guest) => (
                          <TableRow key={guest.invitationNumber}>
                            <TableCell className="font-medium">
                              {guest.fullName}
                            </TableCell>
                            <TableCell>{guest.organization}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {guest.invitationNumber}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatCheckInTime(guest.checkedInAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                type="button"
                                variant="outline"
                                onClick={() => handlePrintTicket(guest)}
                              >
                                <PrinterIcon data-icon="inline-start" />
                                Cetak
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <SearchIcon />
                        </EmptyMedia>
                        <EmptyTitle>Data Tidak Ditemukan</EmptyTitle>
                        <EmptyDescription>
                          Tidak ada tamu hadir yang cocok dengan pencarian.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
        <KlbFooter />
      </main>
      <PrintableAttendanceTicket guest={ticketGuest} />
    </>
  )
}

async function fetchReceptionistSummary(token: string) {
  const response = await fetch(`/api/receptionist/summary?token=${token}`, {
    cache: "no-store",
  })
  const result = (await response.json()) as ReceptionistSummaryResponse

  if (result.status !== "ok") {
    throw new Error(result.message)
  }

  return result.summary
}

function MetricCard({
  icon: Icon,
  label,
  suffix = "",
  value,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  suffix?: string
  value: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          {label}
        </CardDescription>
        <CardTitle className="font-heading text-3xl">
          {value}
          {suffix}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

function ArrivalItem({
  guest,
  onPrint,
}: {
  guest: GuestRecord
  onPrint: () => void
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-lg border bg-background/70 p-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="truncate font-heading font-semibold">
          {guest.fullName}
        </div>
        <div className="truncate text-sm text-muted-foreground">
          {guest.organization}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
        <Badge>{guest.invitationNumber}</Badge>
        <div className="mt-1 text-xs text-muted-foreground">
          {formatCheckInTime(guest.checkedInAt)}
        </div>
        <Button size="sm" type="button" variant="outline" onClick={onPrint}>
          <PrinterIcon data-icon="inline-start" />
          Cetak
        </Button>
      </div>
    </div>
  )
}

function ArrivalSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="flex items-center justify-between gap-4 rounded-lg border bg-background/70 p-3"
          key={index}
        >
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  )
}

function PrintableAttendanceTicket({ guest }: { guest: GuestRecord | null }) {
  const printedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date())

  if (!guest) {
    return null
  }

  return (
    <section className="print-report">
      <div className="print-report-header">
        <div>
          <p className="print-eyebrow">Kongres Wanita Indonesia</p>
          <h1>Tiket Kehadiran KLB</h1>
          <p suppressHydrationWarning>Dicetak pada {printedAt}</p>
        </div>
        <div className="print-summary">
          <strong>{guest.invitationNumber}</strong>
          <span>Nomor undangan</span>
        </div>
      </div>

      <div className="print-ticket-grid">
        <article className="print-ticket">
          <div className="print-ticket-top">
            <span>Status</span>
            <strong>Hadir</strong>
          </div>
          <h2>{guest.fullName}</h2>
          <p>{guest.organization}</p>
          <div className="print-ticket-meta">
            <div>
              <span>Nomor Undangan</span>
              <strong>{guest.invitationNumber}</strong>
            </div>
            <div>
              <span>Waktu Hadir</span>
              <strong>{formatCheckInTime(guest.checkedInAt)}</strong>
            </div>
          </div>
          <div className="print-ticket-footer">
            <span>Validasi Resepsionis</span>
            <strong>Kongres Luar Biasa</strong>
          </div>
        </article>
      </div>
    </section>
  )
}
