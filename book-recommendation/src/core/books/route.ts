// app/api/books/route.ts
import { apiHandler } from "@/lib/handler"
import { NextRequest, NextResponse } from "next/server"
import { Book } from "@/core/books/model/book"
import { withCors, handleOptions } from "@/lib/cors"

export function OPTIONS(req: NextRequest) {
  return handleOptions(req)
}

export const GET = apiHandler(async (req: NextRequest) => {
  console.log("📗 GET /api/books")
  const books = await Book.findAll()
  return withCors(req, NextResponse.json(books))
})

export const POST = apiHandler(async (req: NextRequest) => {
  console.log("📘 POST /api/books")
  const body = await req.json()
  const created = await Book.create(body)
  return withCors(req, NextResponse.json(created))
})
