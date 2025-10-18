"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "../../contexts/appContext"
import { BookOpen, Mail, Lock, Loader2, Shield, User, Crown } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"user" | "reviewer" | "admin">("user")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useApp()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password, role)
      if (success) {
        router.replace("/")
      } else {
        setError("Credenciales inválidas. La contraseña debe tener al menos 6 caracteres.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return <Crown className="w-4 h-4" />
      case "reviewer":
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleDescription = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return "Acceso completo y gestión de usuarios"
      case "reviewer":
        return "Puede bloquear y moderar contenido"
      default:
        return "Acceso estándar a la biblioteca"
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                Inicia sesión para acceder a tu biblioteca
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 dark:text-gray-200">
                  Rol de Usuario
                </Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    <SelectItem value="user">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Usuario</div>
                          <div className="text-xs text-gray-500">{getRoleDescription("user")}</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="reviewer">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-medium">Revisor</div>
                          <div className="text-xs text-gray-500">{getRoleDescription("reviewer")}</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-yellow-600" />
                        <div>
                          <div className="font-medium">Administrador</div>
                          <div className="text-xs text-gray-500">{getRoleDescription("admin")}</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    {getRoleIcon(role)}
                    <span className="ml-2">
                      Iniciar Sesión como {role === "admin" ? "Admin" : role === "reviewer" ? "Revisor" : "Usuario"}
                    </span>
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-4 space-y-2">
                <p>Demo: Usa cualquier email y contraseña de 6+ caracteres</p>
                <p className="text-xs">
                  <strong>Roles disponibles:</strong> Usuario, Revisor, Administrador
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
