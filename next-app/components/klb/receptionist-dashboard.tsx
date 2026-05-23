"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  ClockIcon,
  RefreshCcwIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import { toast } from "sonner"

import {
  formatCheckInTime,
  getAttendanceSummary,
  getSeedAttendanceSummary,
  GuestRecord,
  resetAttendanceDemo,
  subscribeAttendance,
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

export function ReceptionistDashboard() {
  const [query, setQuery] = React.useState("")
  const [summary, setSummary] = React.useState(() => getSeedAttendanceSummary())
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      setSummary(getAttendanceSummary())
      setIsHydrated(true)
    }, 0)

    const unsubscribe = subscribeAttendance((attendanceEvent) => {
      setSummary(getAttendanceSummary())
      toast.success(`${attendanceEvent.guest.fullName} sudah hadir di KLB.`, {
        description: `${attendanceEvent.guest.organization} - ${attendanceEvent.guest.invitationNumber}`,
      })
    })

    return () => {
      window.clearTimeout(hydrationTimer)
      unsubscribe()
    }
  }, [])

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

  function handleResetDemo() {
    resetAttendanceDemo()
    setSummary(getAttendanceSummary())
    toast.info("Data demo kehadiran sudah dikosongkan.")
  }

  return (
    <main className="flex min-h-svh flex-col bg-background">
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
            <Button variant="outline" onClick={handleResetDemo}>
              <RefreshCcwIcon data-icon="inline-start" />
              Reset Demo
            </Button>
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
                  Kehadiran terbaru akan muncul otomatis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isHydrated ? (
                  <ArrivalSkeleton />
                ) : summary.recentArrivals.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {summary.recentArrivals.map((guest) => (
                      <ArrivalItem guest={guest} key={guest.invitationNumber} />
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
  )
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

function ArrivalItem({ guest }: { guest: GuestRecord }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 rounded-lg border bg-background/70 p-3">
      <div className="min-w-0">
        <div className="truncate font-heading font-semibold">
          {guest.fullName}
        </div>
        <div className="truncate text-sm text-muted-foreground">
          {guest.organization}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <Badge>{guest.invitationNumber}</Badge>
        <div className="mt-1 text-xs text-muted-foreground">
          {formatCheckInTime(guest.checkedInAt)}
        </div>
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
