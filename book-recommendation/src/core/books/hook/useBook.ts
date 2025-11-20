import { useQuery } from "@tanstack/react-query"

export const API_URL = "/api/books"

export const fetcher = async (url: string) => {
    const res = await fetch(url, { credentials: "include" })
    if (!res.ok) throw new Error("Error en la petición")
    return res.json()
}

//all books
export function useAllBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: () => fetcher(API_URL).then((res) => res.books)
    })
}

//single book
export function useBook(id: string) {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => fetcher(`${API_URL}/${id}`).then((res) => res.book)
    })
}
