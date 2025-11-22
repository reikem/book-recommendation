import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/apiClient"
import { IBook } from "../type"

export function useAllBooks() {
  return useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await api.get("/books")
      return res.data
    }
  })
}

export function useCreateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Partial<IBook>) => { const res = await api.post("/books", payload); return res.data },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] })
  })
}

export function useUpdateBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...data }: any) => { const res = await api.put(`/books/${id}`, data); return res.data },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] })
  })
}

export function useDeleteBook() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => { const res = await api.delete(`/books/${id}`); return res.data },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] })
  })
}