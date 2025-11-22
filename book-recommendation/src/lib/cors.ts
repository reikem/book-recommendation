// src/lib/cors.ts
import { NextResponse, NextRequest } from "next/server"

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.109:3000",
]

export function withCors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin") || ""
  const allowed = allowedOrigins.includes(origin)
  res.headers.set("Access-Control-Allow-Origin", allowed ? origin : "*")
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization")
  res.headers.set("Access-Control-Allow-Credentials", "true")
  return res
}

export function handleOptions(req: NextRequest) {
  const origin = req.headers.get("origin") || ""
  const allowed = allowedOrigins.includes(origin)
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowed ? origin : "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Credentials": "true"
    }
  })
}
