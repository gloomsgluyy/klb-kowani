"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  Building2Icon,
  CheckCircle2Icon,
  CircleXIcon,
  HelpCircleIcon,
  InfoIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react"

import {
  CheckInGuestResponse,
  formatCheckInTime,
  GuestCatalogResponse,
  GuestOrganizationGroup,
  GuestRecord,
} from "@/lib/attendance-store"
import {
  KlbBatikBackground,
  KlbFooter,
  KlbLogoMark,
  KlbTopBar,
} from "@/components/klb/klb-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

type ScreenState =
  | "organization"
  | "guest"
  | "confirm"
  | "success"
  | "already_checked_in"
  | "wrong_identity"
  | "connection_error"

export function GuestCheckIn() {
  const [organizations, setOrganizations] = React.useState<
    GuestOrganizationGroup[]
  >([])
  const [screenState, setScreenState] =
    React.useState<ScreenState>("organization")
  const [selectedOrganization, setSelectedOrganization] =
    React.useState<GuestOrganizationGroup | null>(null)
  const [selectedGuest, setSelectedGuest] = React.useState<GuestRecord | null>(
    null
  )
  const [isLoadingCatalog, setIsLoadingCatalog] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      try {
        const response = await fetch("/api/guests/catalog", {
          cache: "no-store",
        })
        const result = (await response.json()) as GuestCatalogResponse

        if (!response.ok || result.status !== "ok") {
          throw new Error("Catalog failed")
        }

        if (isMounted) {
          setOrganizations(result.organizations)
        }
      } catch {
        if (isMounted) {
          setScreenState("connection_error")
        }
      } finally {
        if (isMounted) {
          setIsLoadingCatalog(false)
        }
      }
    }

    void loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  function resetFlow() {
    setSelectedOrganization(null)
    setSelectedGuest(null)
    setScreenState("organization")
  }

  function handleSelectOrganization(organization: GuestOrganizationGroup) {
    setSelectedOrganization(organization)
    setSelectedGuest(null)
    setScreenState("guest")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSelectGuest(guest: GuestRecord) {
    setSelectedGuest(guest)
    setScreenState(
      guest.attendanceStatus === "checked_in" ? "already_checked_in" : "confirm"
    )
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleConfirmAttendance() {
    if (!selectedGuest) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/attendance/check-in", {
        body: JSON.stringify({
          invitationNumber: selectedGuest.invitationNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      const result = (await response.json()) as CheckInGuestResponse

      if (!response.ok && result.status !== "not_found") {
        setScreenState("connection_error")
        return
      }

      if (result.status === "not_found") {
        setScreenState("wrong_identity")
        return
      }

      setSelectedGuest(result.guest)
      setScreenState(
        result.status === "checked_in" ? "success" : "already_checked_in"
      )
    } catch {
      setScreenState("connection_error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const showOrganizationList =
    screenState === "organization" ||
    screenState === "wrong_identity" ||
    screenState === "connection_error"

  return (
    <main className="flex min-h-svh flex-col bg-background">
      <KlbTopBar />
      <section className="relative flex-1 overflow-hidden">
        <KlbBatikBackground />
        {showOrganizationList ? (
          <OrganizationPicker
            isLoading={isLoadingCatalog}
            organizations={organizations}
            screenState={screenState}
            totalOrganizations={organizations.length}
            onRetry={() => {
              setScreenState("organization")
              setIsLoadingCatalog(true)
              window.location.reload()
            }}
            onSelectOrganization={handleSelectOrganization}
          />
        ) : screenState === "guest" && selectedOrganization ? (
          <GuestPicker
            organization={selectedOrganization}
            onBack={() => {
              setSelectedOrganization(null)
              setScreenState("organization")
            }}
            onSelectGuest={handleSelectGuest}
          />
        ) : screenState === "confirm" && selectedGuest ? (
          <CenteredPanel>
            <ConfirmationCard
              guest={selectedGuest}
              isLoading={isSubmitting}
              onConfirm={handleConfirmAttendance}
              onReject={() => {
                setSelectedGuest(null)
                setScreenState("wrong_identity")
              }}
            />
          </CenteredPanel>
        ) : screenState === "success" && selectedGuest ? (
          <CenteredPanel>
            <ResultCard
              guest={selectedGuest}
              title="Selamat Datang!"
              description={`Terima kasih, ${selectedGuest.fullName}, sudah menghadiri Kongres Luar Biasa.`}
              badgeLabel="Hadir"
              onReset={resetFlow}
            />
          </CenteredPanel>
        ) : screenState === "already_checked_in" && selectedGuest ? (
          <CenteredPanel>
            <ResultCard
              guest={selectedGuest}
              title="Kehadiran Sudah Tercatat"
              description={`${selectedGuest.fullName} sudah tercatat hadir pada ${formatCheckInTime(selectedGuest.checkedInAt)}.`}
              badgeLabel="Sudah hadir"
              onReset={resetFlow}
            />
          </CenteredPanel>
        ) : null}
      </section>
      <KlbFooter />
    </main>
  )
}

function OrganizationPicker({
  isLoading,
  organizations,
  screenState,
  totalOrganizations,
  onRetry,
  onSelectOrganization,
}: {
  isLoading: boolean
  organizations: GuestOrganizationGroup[]
  screenState: ScreenState
  totalOrganizations: number
  onRetry: () => void
  onSelectOrganization: (organization: GuestOrganizationGroup) => void
}) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-8 sm:px-8 lg:px-10">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
        <KlbLogoMark />
        <Badge variant="secondary">Registrasi Kehadiran</Badge>
        <h1 className="font-heading text-4xl font-bold text-primary sm:text-5xl">
          Selamat Datang
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Silakan pilih asal organisasi Anda, kemudian pilih nama Anda pada
          daftar undangan.
        </p>
      </section>

      {screenState === "wrong_identity" ? (
        <Alert className="mx-auto max-w-4xl">
          <HelpCircleIcon />
          <AlertTitle>Pilih data yang sesuai</AlertTitle>
          <AlertDescription>
            Silakan pilih kembali organisasi dan nama yang benar.
          </AlertDescription>
        </Alert>
      ) : null}

      {screenState === "connection_error" ? (
        <Alert className="mx-auto max-w-4xl" variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Koneksi bermasalah</AlertTitle>
          <AlertDescription>
            Data undangan belum dapat dimuat. Silakan coba lagi.
          </AlertDescription>
          <Button className="mt-3 w-fit" type="button" onClick={onRetry}>
            Coba Lagi
          </Button>
        </Alert>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <OrganizationSkeleton />
        ) : organizations.length > 0 ? (
          organizations.map((organization) => (
            <OrganizationCard
              key={organization.organization}
              organization={organization}
              onSelect={() => onSelectOrganization(organization)}
            />
          ))
        ) : (
          <div className="sm:col-span-2 xl:col-span-3">
            <Empty className="bg-card/95">
              <EmptyHeader>
                <EmptyTitle>Organisasi Tidak Ditemukan</EmptyTitle>
                <EmptyDescription>
                  Tidak ada organisasi yang cocok dari {totalOrganizations} data
                  undangan.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </section>
    </div>
  )
}

function OrganizationCard({
  organization,
  onSelect,
}: {
  organization: GuestOrganizationGroup
  onSelect: () => void
}) {
  return (
    <button
      className="group h-full rounded-xl text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      type="button"
      onClick={onSelect}
    >
      <Card className="h-full bg-card/95 transition group-hover:border-primary group-hover:shadow-md">
        <CardHeader className="gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2Icon className="size-7" />
          </div>
          <div className="min-w-0">
            <CardTitle className="line-clamp-2 font-heading text-2xl text-primary">
              {organization.organization}
            </CardTitle>
            <CardDescription className="mt-2 flex items-center gap-2">
              <UsersIcon className="size-4" />
              {organization.totalGuests} nama undangan
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">
            {organization.totalCheckedIn} sudah hadir
          </Badge>
        </CardContent>
      </Card>
    </button>
  )
}

function GuestPicker({
  organization,
  onBack,
  onSelectGuest,
}: {
  organization: GuestOrganizationGroup
  onBack: () => void
  onSelectGuest: (guest: GuestRecord) => void
}) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8 lg:px-10">
      <Button className="w-fit" variant="outline" onClick={onBack}>
        <ArrowLeftIcon data-icon="inline-start" />
        Kembali
      </Button>

      <section className="grid gap-4 sm:grid-cols-2">
        {organization.guests.map((guest) => (
          <GuestCard
            guest={guest}
            key={guest.invitationNumber}
            onSelect={() => onSelectGuest(guest)}
          />
        ))}
      </section>
    </div>
  )
}

function GuestCard({
  guest,
  onSelect,
}: {
  guest: GuestRecord
  onSelect: () => void
}) {
  return (
    <button
      className="group h-full rounded-xl text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      type="button"
      onClick={onSelect}
    >
      <Card className="h-full bg-card/95 transition group-hover:border-primary group-hover:shadow-md">
        <CardHeader className="gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <UserRoundIcon className="size-7" />
          </div>
          <div className="min-w-0">
            <CardTitle className="font-heading text-2xl text-primary">
              {guest.fullName}
            </CardTitle>
            <CardDescription className="mt-2">
              Nomor undangan {guest.invitationNumber}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Badge
            variant={
              guest.attendanceStatus === "checked_in" ? "secondary" : "outline"
            }
          >
            {guest.attendanceStatus === "checked_in"
              ? "Sudah hadir"
              : "Belum hadir"}
          </Badge>
        </CardContent>
      </Card>
    </button>
  )
}

function CenteredPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-[calc(100svh-8rem)] items-center justify-center px-4 py-8 sm:px-8 lg:px-10">
      <div className="w-full max-w-3xl">{children}</div>
    </div>
  )
}

function ConfirmationCard({
  guest,
  isLoading,
  onConfirm,
  onReject,
}: {
  guest: GuestRecord
  isLoading: boolean
  onConfirm: () => void
  onReject: () => void
}) {
  return (
    <Card className="rounded-2xl border bg-card/95 text-center shadow-lg backdrop-blur-md">
      <CardHeader className="flex w-full flex-col items-center px-6 pt-8 text-center sm:px-12">
        <div className="mb-2 flex size-24 items-center justify-center rounded-full border bg-accent/10 text-primary shadow-inner">
          <BadgeCheckIcon className="size-12" />
        </div>
        <CardTitle className="font-heading text-3xl font-bold text-primary italic">
          Konfirmasi Identitas
        </CardTitle>
        <CardDescription className="mx-auto w-full max-w-2xl text-lg leading-relaxed text-balance sm:text-xl">
          Apakah benar Anda&nbsp;
          <strong className="font-semibold text-foreground">
            {guest.fullName}
          </strong>
          &nbsp;dari&nbsp;
          <strong className="font-semibold text-foreground">
            {guest.organization}
          </strong>
          ?
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full px-6 sm:px-12">
        <GuestDetails guest={guest} />
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-3 border-0 bg-transparent px-6 pb-8 sm:px-12">
        <Button
          className="h-12 w-full rounded-full"
          disabled={isLoading}
          onClick={onConfirm}
        >
          {isLoading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <ShieldCheckIcon data-icon="inline-start" />
          )}
          Ya, Saya Hadir
        </Button>
        <Button
          className="h-12 w-full rounded-full border-2"
          disabled={isLoading}
          type="button"
          variant="outline"
          onClick={onReject}
        >
          <CircleXIcon data-icon="inline-start" />
          Tidak
        </Button>
      </CardFooter>
    </Card>
  )
}

function ResultCard({
  badgeLabel,
  description,
  guest,
  title,
  onReset,
}: {
  badgeLabel: string
  description: string
  guest: GuestRecord
  title: string
  onReset: () => void
}) {
  return (
    <Card className="rounded-xl border bg-card/95 text-center shadow-lg backdrop-blur-sm">
      <CardHeader className="flex w-full flex-col items-center px-6 pt-8 text-center sm:px-12">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3">
          <div className="relative flex size-24 items-center justify-center rounded-full bg-muted text-primary">
            <CheckCircle2Icon className="size-14 fill-primary/10" />
            <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20" />
          </div>
          <Badge>{badgeLabel}</Badge>
          <CardTitle className="font-heading text-4xl font-bold text-primary sm:text-5xl">
            {title}
          </CardTitle>
          <CardDescription className="max-w-xl text-lg leading-relaxed text-balance">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 sm:px-12">
        <div className="mb-4 w-full text-left">
          <h2 className="border-b pb-2 font-heading text-2xl font-bold text-primary">
            Bukti Kehadiran
          </h2>
        </div>
        <GuestDetails guest={guest} showTime />
        <Separator className="my-6" />
        <p
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground"
          aria-live="polite"
        >
          <InfoIcon className="size-4" />
          Silakan tunjukkan halaman ini kepada resepsionis.
        </p>
      </CardContent>
      <CardFooter className="justify-center border-0 bg-transparent px-6 pb-8 sm:px-12">
        <Button className="rounded-full px-8" onClick={onReset}>
          <ArrowLeftIcon data-icon="inline-start" />
          Cek Peserta Lain
        </Button>
      </CardFooter>
    </Card>
  )
}

function GuestDetails({
  guest,
  showTime = false,
}: {
  guest: GuestRecord
  showTime?: boolean
}) {
  return (
    <dl className="grid gap-4 rounded-lg border bg-muted/60 p-5 text-left sm:grid-cols-2">
      <DetailItem label="Nomor Undangan" value={guest.invitationNumber} />
      <DetailItem label="Nama Lengkap" value={guest.fullName} />
      <DetailItem label="Organisasi / Asal" value={guest.organization} />
      {showTime ? (
        <DetailItem
          label="Waktu Hadir"
          value={formatCheckInTime(guest.checkedInAt)}
        />
      ) : null}
    </dl>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="font-heading text-base font-semibold break-words text-foreground">
        {value}
      </dd>
    </div>
  )
}

function OrganizationSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card className="bg-card/95" key={index}>
          <CardHeader className="gap-4">
            <Skeleton className="size-14 rounded-full" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-7 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-28" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
