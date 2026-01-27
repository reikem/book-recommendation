import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "secret_dev"

export function issueToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" })
}

export function verifyToken(req: NextRequest) {
  try {
    const cookie = req.cookies.get("token")?.value
    if (!cookie) {
      return { error: true, response: NextResponse.json({ error: "No token" }, { status: 401 }) }
    }
    const decoded = jwt.verify(cookie, SECRET)
    return { error: false, decoded }
  } catch (err: unknown) {
    return { error: true, response: NextResponse.json({ error: "Invalid token" }, { status: 401 }) }
  }
}
