import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { Book } from "@/core/books/model/book"
import type { IBook } from "../type"

interface BookRouteParams {
  params: {
    id: string;
  };
}

// ─────────────────────────────
// GET /api/books/[id]
// ─────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: BookRouteParams
) {
  const payload = verifyToken(req)
  if (payload.error) return payload.response

  try {
    const book = await Book.findByPk(params.id)

    if (!book) {
      return NextResponse.json(
        { error: "Libro no encontrado" },
        { status: 404 }
      )
    }

    // Extraer datos tipados
    const data = book.get() as unknown as IBook

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Error: " + error },
      { status: 500 }
    )
  }
}

// ─────────────────────────────
// PUT /api/books/[id]
// ─────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: BookRouteParams
) {
  const payload = verifyToken(req)
  if (payload.error) return payload.response

  try {
    const book = await Book.findByPk(params.id)

    if (!book) {
      return NextResponse.json(
        { error: "Libro no encontrado" },
        { status: 404 }
      )
    }

    const body: Partial<IBook> = await req.json()
    await book.update(body as any)

    const updated = book.get() as unknown as IBook

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: "Error: " + error },
      { status: 500 }
    )
  }
}

// ─────────────────────────────
// DELETE /api/books/[id]
// ─────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: BookRouteParams
) {
  const payload = verifyToken(req)
  if (payload.error) return payload.response

  try {
    const book = await Book.findByPk(params.id)

    if (!book) {
      return NextResponse.json(
        { error: "Libro no encontrado" },
        { status: 404 }
      )
    }

    await book.destroy()

    return NextResponse.json({ message: "Libro eliminado" })
  } catch (error) {
    return NextResponse.json(
      { error: "Error: " + error },
      { status: 500 }
    )
  }
}
