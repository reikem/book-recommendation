export interface IUser {
    id: string
    name: string
    email: string
    passwordHash: string
    avatar?: string
    role: "user" | "reviewer" | "admin"
    createdAt: Date
    updatedAt: Date
    lastLogin?: Date
    isActive: boolean
  }