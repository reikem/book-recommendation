import { NextRequest, NextResponse } from "next/server"
import { initDB } from "./db"

export function apiHandler(
    handler: (req: NextRequest) => Promise<NextResponse>
) {
    return async function (req: NextRequest) {
        await initDB() // asegura conexión lista
        try {
            return await handler(req)
        } catch (err) {
            console.error("API error:", err)
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            )
        }
    }
}
