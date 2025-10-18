"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useApp} from "../contexts/appContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useApp()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login")
    }
  }, [isAuthenticated, router, pathname])

  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  return <>{children}</>
}