import { NextResponse } from "next/server"

import { getGuestCatalogFromDb } from "@/lib/server/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const organizations = await getGuestCatalogFromDb()

    return NextResponse.json({
      status: "ok",
      organizations,
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
