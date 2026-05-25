import { NextResponse } from "next/server"

import { normalizeInvitationNumber } from "@/lib/attendance-types"
import { checkInGuestInDb } from "@/lib/server/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      invitationNumber?: string
    } | null

    if (!body) {
      return NextResponse.json(
        {
          status: "bad_request",
          message: "Format request tidak valid.",
        },
        { status: 400 }
      )
    }

    const invitationNumber = normalizeInvitationNumber(
      body.invitationNumber ?? ""
    )

    if (!invitationNumber) {
      return NextResponse.json(
        {
          status: "not_found",
          message: "Nomor undangan tidak ditemukan.",
        },
        { status: 404 }
      )
    }

    const result = await checkInGuestInDb(invitationNumber)

    if (result.status === "not_found") {
      return NextResponse.json(
        {
          status: "not_found",
          message: "Nomor undangan tidak ditemukan.",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        status: "error",
        message: "Terjadi gangguan server.",
      },
      { status: 500 }
    )
  }
}
