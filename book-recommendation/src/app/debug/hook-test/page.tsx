"use client"

import { useAllBooks } from "@/core/books/hook/useBook"

export default function HookTest() {
    const { data, isLoading, error } = useAllBooks()

    if (isLoading) return <div>Cargando libros…</div>
    if (error) return <div>Error: {(error as Error).message}</div>

    return (
        <div>
            <h1>Libros:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}