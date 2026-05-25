import { NextResponse } from "next/server"

import { isValidReceptionistToken } from "@/lib/attendance-types"
import { getAttendanceSummaryFromDb } from "@/lib/server/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get("token")

    if (!isValidReceptionistToken(token)) {
      return NextResponse.json(
        {
          status: "unauthorized",
          message: "Link dashboard tidak valid atau sudah tidak aktif.",
        },
        { status: 401 }
      )
    }

    const summary = await getAttendanceSummaryFromDb()

    return NextResponse.json({
      status: "ok",
      summary,
    })
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
