"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  CircleXIcon,
  HelpCircleIcon,
  InfoIcon,
  SearchIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
} from "lucide-react"

import {
  checkInGuest,
  formatCheckInTime,
  GuestRecord,
  normalizeInvitationNumber,
  verifyGuest,
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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

type ScreenState =
  | "initial"
  | "confirm"
  | "success"
  | "already_checked_in"
  | "not_found"
  | "wrong_identity"
  | "connection_error"

export function GuestCheckIn() {
  const [invitationNumber, setInvitationNumber] = React.useState("")
  const [screenState, setScreenState] = React.useState<ScreenState>("initial")
  const [selectedGuest, setSelectedGuest] = React.useState<GuestRecord | null>(
    null
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const normalizedInvitationNumber = normalizeInvitationNumber(invitationNumber)
  const canSubmit = normalizedInvitationNumber.length > 0 && !isLoading

  React.useEffect(() => {
    if (
      screenState === "initial" ||
      screenState === "not_found" ||
      screenState === "wrong_identity"
    ) {
      inputRef.current?.focus()
    }
  }, [screenState])

  function resetForm(shouldClear = true) {
    if (shouldClear) {
      setInvitationNumber("")
    }

    setSelectedGuest(null)
    setScreenState("initial")
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    setIsLoading(true)
    setScreenState("initial")

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 350))

      const guest = verifyGuest(normalizedInvitationNumber)

      if (!guest) {
        setSelectedGuest(null)
        setScreenState("not_found")
        return
      }

      setSelectedGuest(guest)
      setScreenState(
        guest.attendanceStatus === "checked_in"
          ? "already_checked_in"
          : "confirm"
      )
    } catch {
      setScreenState("connection_error")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirmAttendance() {
    if (!selectedGuest) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 350))

      const result = checkInGuest(selectedGuest.invitationNumber)

      if (result.status === "not_found") {
        setScreenState("not_found")
        return
      }

      setSelectedGuest(result.guest)
      setScreenState(
        result.status === "checked_in" ? "success" : "already_checked_in"
      )
    } catch {
      setScreenState("connection_error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-svh flex-col bg-background">
      <KlbTopBar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:px-8 lg:px-10">
        <KlbBatikBackground />
        <div className="w-full max-w-[520px]">
          {screenState === "confirm" && selectedGuest ? (
            <ConfirmationCard
              guest={selectedGuest}
              isLoading={isLoading}
              onConfirm={handleConfirmAttendance}
              onReject={() => {
                setScreenState("wrong_identity")
                setSelectedGuest(null)
              }}
            />
          ) : screenState === "success" && selectedGuest ? (
            <ResultCard
              guest={selectedGuest}
              title="Selamat Datang!"
              description={`Terima kasih, ${selectedGuest.fullName}, sudah menghadiri Kongres Luar Biasa.`}
              badgeLabel="Hadir"
              onReset={() => resetForm()}
            />
          ) : screenState === "already_checked_in" && selectedGuest ? (
            <ResultCard
              guest={selectedGuest}
              title="Kehadiran Sudah Tercatat"
              description={`${selectedGuest.fullName} sudah tercatat hadir pada ${formatCheckInTime(selectedGuest.checkedInAt)}.`}
              badgeLabel="Sudah hadir"
              onReset={() => resetForm()}
            />
          ) : (
            <VerificationCard
              canSubmit={canSubmit}
              invitationNumber={invitationNumber}
              inputRef={inputRef}
              isLoading={isLoading}
              screenState={screenState}
              onChange={(value) => setInvitationNumber(value.toUpperCase())}
              onSubmit={handleVerify}
              onRetry={() => setScreenState("initial")}
            />
          )}
        </div>
      </section>
      <KlbFooter />
    </main>
  )
}

function VerificationCard({
  canSubmit,
  invitationNumber,
  inputRef,
  isLoading,
  screenState,
  onChange,
  onSubmit,
  onRetry,
}: {
  canSubmit: boolean
  invitationNumber: string
  inputRef: React.RefObject<HTMLInputElement | null>
  isLoading: boolean
  screenState: ScreenState
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onRetry: () => void
}) {
  const isInvalid =
    screenState === "not_found" ||
    screenState === "wrong_identity" ||
    screenState === "connection_error"

  return (
    <Card className="relative overflow-hidden rounded-xl border bg-card/95 shadow-sm backdrop-blur-sm">
      <div className="absolute top-0 left-0 h-2 w-full bg-primary" />
      <CardHeader className="items-center px-6 pt-10 text-center sm:px-10">
        <KlbLogoMark className="mb-2" />
        <CardTitle className="font-heading text-3xl font-bold text-primary">
          KONGRES LUAR BIASA
        </CardTitle>
        <CardDescription className="text-base">
          Masukkan Nomor Undangan Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-10">
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <FieldGroup>
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor="invitation-number">
                Nomor Undangan
              </FieldLabel>
              <Input
                ref={inputRef}
                id="invitation-number"
                aria-invalid={isInvalid}
                autoComplete="off"
                className="h-14 rounded-lg bg-card pl-4 text-base uppercase sm:text-lg"
                placeholder="Contoh: A-001"
                value={invitationNumber}
                onChange={(event) => onChange(event.target.value)}
              />
              <FieldDescription>
                Pastikan nomor sama seperti yang tertera pada surat undangan.
              </FieldDescription>
              {screenState === "not_found" ? (
                <FieldError>
                  Nomor undangan tidak ditemukan. Silakan periksa kembali atau
                  hubungi resepsionis.
                </FieldError>
              ) : null}
              {screenState === "wrong_identity" ? (
                <FieldError>
                  Silakan periksa kembali nomor undangan Anda atau hubungi
                  resepsionis.
                </FieldError>
              ) : null}
            </Field>
          </FieldGroup>

          {screenState === "connection_error" ? (
            <Alert variant="destructive">
              <TriangleAlertIcon />
              <AlertTitle>Koneksi bermasalah</AlertTitle>
              <AlertDescription>
                Silakan coba lagi dalam beberapa saat.
              </AlertDescription>
            </Alert>
          ) : null}

          <Button
            className="h-12 w-full rounded-lg sm:h-14"
            disabled={!canSubmit}
          >
            {isLoading ? <Spinner data-icon="inline-start" /> : null}
            {isLoading ? "Memverifikasi..." : "Verifikasi Kehadiran"}
            {!isLoading ? <ArrowRightIcon data-icon="inline-end" /> : null}
          </Button>

          {screenState === "connection_error" ? (
            <Button type="button" variant="outline" onClick={onRetry}>
              <SearchIcon data-icon="inline-start" />
              Coba Lagi
            </Button>
          ) : null}
        </form>
        <div className="mt-8 border-t pt-6 text-center">
          <p className="flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground">
            <HelpCircleIcon className="size-4" />
            Butuh bantuan? Hubungi Panitia
          </p>
        </div>
      </CardContent>
    </Card>
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
    <Card className="items-center rounded-2xl border bg-card/95 text-center shadow-lg backdrop-blur-md">
      <CardHeader className="items-center px-6 pt-8 sm:px-12">
        <div className="mb-2 flex size-24 items-center justify-center rounded-full border bg-accent/10 text-primary shadow-inner">
          <BadgeCheckIcon className="size-12" />
        </div>
        <CardTitle className="font-heading text-3xl font-bold text-primary italic">
          Konfirmasi Identitas
        </CardTitle>
        <CardDescription className="max-w-sm text-lg leading-relaxed">
          Apakah benar Anda {guest.fullName} dari {guest.organization}?
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
      <CardHeader className="items-center px-6 pt-8 text-center sm:px-12">
        <div className="relative mb-2 flex size-24 items-center justify-center rounded-full bg-muted text-primary">
          <CheckCircle2Icon className="size-14 fill-primary/10" />
          <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20" />
        </div>
        <Badge>{badgeLabel}</Badge>
        <CardTitle className="font-heading text-4xl font-bold text-primary sm:text-5xl">
          {title}
        </CardTitle>
        <CardDescription className="max-w-md text-lg leading-relaxed">
          {description}
        </CardDescription>
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
      <DetailItem label="Nama Lengkap" value={guest.fullName} />
      <DetailItem label="Organisasi / Asal" value={guest.organization} />
      <DetailItem label="Nomor Undangan" value={guest.invitationNumber} />
      {guest.role ? <DetailItem label="Peran" value={guest.role} /> : null}
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
      <dd className="truncate font-heading text-base font-semibold text-foreground">
        {value}
      </dd>
    </div>
  )
}
