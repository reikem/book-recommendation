import { z } from "zod"

export const BookCreateSchema = z.object({
    title: z.string().min(3).max(255),
    author: z.string().min(3).max(100),
    genre: z.array(z.string()).optional().default([]),
    pages: z.number().optional().default(0),
    rating: z.number().optional().default(0),
    description: z.string().optional().default(""),
    cover: z.string().optional().default(""),
    year: z.string().optional().default(""),
    language: z.string().optional().default(""),
    isbn: z.string().optional().default(""),
    publisher: z.string().optional().default(""),
    content: z.string().optional().default(""),
    file_path: z.string().optional().default(""),
    file_size: z.string().optional().default(""),
    file_type: z.string().optional().default(""),
    uploaded_by: z.string().optional().default(""),
    is_blocked: z.boolean().optional().default(false),
    blocked_reason: z.string().optional().default(""),
    blocked_at: z.date().optional().default(new Date()),
    blocked_by: z.string().optional().default(""),


})

export const BookUpdateSchema = BookCreateSchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
    uploaded_by: true,
    is_blocked: true,
    blocked_reason: true,
    blocked_at: true,
    blocked_by: true,
})