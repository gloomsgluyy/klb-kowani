import Image from "next/image"
import { LandmarkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export const KLB_LOGO_URL =
  "https://lh3.googleusercontent.com/aida/ADBb0ugolZxe0Ik2UCb0cxCrfnSOpO0WA9wM2HVqu9xmOu_9fn8op4YPCh8l5FB2lYmIC26T2FcfXhfkyLvqKiBJ2O8yr9rekw-F-K8CDtwh69Ui2MY86kIbNWBWjv1WhHdG7n7zMF7Ju5aMCYJRlFS56L25Y6UR8FZONmd9eFXjOiVg4De9E-OFgLpwJUbdn5X1aiV17443OVcakXkvS8FiyumJUI7sHPygOJe4RzdVowZv0gVvK6wddFqzoOdTM-Hu9rojtCKj_pAv"

export const KLB_BATIK_PATTERN_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOhFAQkCWpNOrgafp9ot_Qy_L-xE03Db7yvJHvfRRVMfYQ4w52p86qMWquWz-3HJ0Jt_vTKI7rWIoXvnqzCVXkvNdxwRDREZZCix_H3hzAYcl4HjCKP2xiZoAfcoqnkH809VfWQbXtQwQ9mLu5JKrQmvdhgY2KwEMSf12RYNvqyidk4xBdDkDppy1_7wU26WbmUYODXIeo2DK9CODjfTLzz6zi1V7VRPxJrDlrdJwu3t64y58QadiAbpCF8f56ErpZIOvdQJbzw1s"

export function KlbTopBar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b bg-background/90 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <LandmarkIcon className="size-6 shrink-0 text-primary" />
          <h1 className="truncate font-heading text-2xl font-semibold text-primary italic">
            Kongres Luar Biasa
          </h1>
        </div>
        <Image
          alt="Logo Kowani"
          className="h-10 w-auto object-contain"
          height={80}
          priority
          src={KLB_LOGO_URL}
          width={240}
        />
      </div>
    </header>
  )
}

export function KlbFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t bg-muted/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs font-semibold text-muted-foreground sm:px-8 md:flex-row lg:px-10">
        <p>2026 Kongres Luar Biasa. Empowering the Collective Voice.</p>
        <nav className="flex gap-5">
          <a className="hover:text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary hover:underline" href="#">
            Support
          </a>
          <a className="hover:text-primary hover:underline" href="#">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  )
}

export function KlbBatikBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
      style={{
        backgroundImage: `url(${KLB_BATIK_PATTERN_URL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  )
}

export function KlbLogoMark({ className }: { className?: string }) {
  return (
    <Image
      alt="Logo Kowani"
      className={cn("mx-auto h-24 w-auto object-contain md:h-28", className)}
      height={160}
      priority
      src={KLB_LOGO_URL}
      width={320}
    />
  )
}
