"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export interface Review {
  id: string
  bookId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  text: string
  date: string
  helpful: number
}

export interface TermsAcceptance {
  id: string
  userId: string
  bookId: string
  acceptedAt: string
  ipAddress?: string
  userAgent?: string
}

export interface ModerationLog {
  id: string
  bookId: string
  moderatorId: string
  moderatorName: string
  action: "block" | "unblock" | "flag" | "approve"
  reason: string
  timestamp: string
}

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  description: string
  cover: string
  pages: number
  year: number
  relatedDocs: string[]
  addedDate?: string
  content?: string
  uploadedBy: string
  isBlocked: boolean
  blockReason?: string
  termsAcceptanceId?: string
}

type UserRole = "user" | "reviewer" | "admin"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}

interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
}

export interface ReadingStats {
  totalBooks: number
  totalPages: number
  totalHours: number
  booksThisMonth: number
  booksThisYear: number
  averageRating: number
  favoriteGenre: string
  readingStreak: number
}

interface AppContextType {
  // User state
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>
  logout: () => void
  updateUserRole: (userId: string, role: UserRole) => void

  // Books state
  books: Book[]
  addBook: (book: Book) => void
  updateBook: (id: string, book: Partial<Book>) => void
  deleteBook: (id: string) => void
  getBookById: (id: string) => Book | undefined
  importBooks: (books: Book[]) => void
  getVisibleBooks: () => Book[]

  // Moderation
  blockBook: (bookId: string, reason: string) => void
  unblockBook: (bookId: string) => void
  flagBook: (bookId: string, reason: string) => void
  getModerationLogs: (bookId?: string) => ModerationLog[]
  getBlockedBooks: () => Book[]
  moderationLogs: ModerationLog[]

  // Terms acceptance
  acceptTerms: (bookId: string) => TermsAcceptance
  getTermsAcceptance: (bookId: string) => TermsAcceptance | undefined
  termsAcceptances: TermsAcceptance[]

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
  getBookReviews: (bookId: string) => Review[]
  updateReviewHelpful: (reviewId: string) => void

  // Favorites state
  favorites: string[]
  addToFavorites: (bookId: string) => void
  removeFromFavorites: (bookId: string) => void
  isFavorite: (bookId: string) => boolean

  // Reading progress
  readingProgress: Record<string, number>
  updateReadingProgress: (bookId: string, progress: number) => void

  // Search history
  searchHistory: string[]
  addToSearchHistory: (term: string) => void
  clearSearchHistory: () => void

  // Reading stats
  getReadingStats: () => ReadingStats

  // Offline mode
  isOnline: boolean

  // Custom themes
  customThemes: Theme[]
  currentTheme: string
  addCustomTheme: (theme: Theme) => void
  setCurrentTheme: (themeId: string) => void
  deleteCustomTheme: (themeId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialBooks: Book[] = [
  {
    id: "1",
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo Mágico",
    rating: 4.8,
    description:
      "Una obra maestra que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    cover: "bg-gradient-to-br from-emerald-400 to-teal-500",
    pages: 417,
    year: 1967,
    relatedDocs: ["Análisis literario", "Biografía del autor", "Contexto histórico"],
    addedDate: "2024-01-15",
    content:
      "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo...",
    uploadedBy: "system",
    isBlocked: false,
  },
  {
    id: "2",
    title: "El Nombre del Viento",
    author: "Patrick Rothfuss",
    genre: "Fantasía",
    rating: 4.6,
    description: "La historia de Kvothe, un joven que se convierte en leyenda, contada por él mismo en una posada.",
    cover: "bg-gradient-to-br from-orange-400 to-red-500",
    pages: 662,
    year: 2007,
    relatedDocs: ["Mapa del mundo", "Sistema de magia", "Cronología"],
    addedDate: "2024-01-10",
    content:
      "Mi nombre es Kvothe. Es un nombre que quizás hayas oído. Los nombres son importantes, ya que nos dicen mucho sobre una persona...",
    uploadedBy: "system",
    isBlocked: false,
  },
  {
    id: "3",
    title: "Neuromante",
    author: "William Gibson",
    genre: "Ciencia Ficción",
    rating: 4.4,
    description:
      "Una novela cyberpunk que definió el género y exploró temas de inteligencia artificial y realidad virtual.",
    cover: "bg-gradient-to-br from-cyan-400 to-blue-500",
    pages: 271,
    year: 1984,
    relatedDocs: ["Glosario cyberpunk", "Influencia cultural", "Tecnología predicha"],
    addedDate: "2024-01-08",
    content: "El cielo sobre el puerto tenía el color de una televisión sintonizada en un canal muerto...",
    uploadedBy: "system",
    isBlocked: false,
  },
  {
    id: "4",
    title: "Orgullo y Prejuicio",
    author: "Jane Austen",
    genre: "Romance",
    rating: 4.7,
    description:
      "Una novela que explora temas de amor, clase social y crecimiento personal en la Inglaterra del siglo XIX.",
    cover: "bg-gradient-to-br from-pink-400 to-rose-500",
    pages: 432,
    year: 1813,
    relatedDocs: ["Contexto social", "Análisis de personajes", "Adaptaciones"],
    addedDate: "2024-01-05",
    content:
      "Es una verdad universalmente reconocida que un hombre soltero, poseedor de una gran fortuna, necesita una esposa...",
    uploadedBy: "system",
    isBlocked: false,
  },
  {
    id: "5",
    title: "Fundación",
    author: "Isaac Asimov",
    genre: "Ciencia Ficción",
    rating: 4.5,
    description:
      "La primera novela de la serie Fundación, que explora el concepto de psicohistoria y el futuro de la humanidad.",
    cover: "bg-gradient-to-br from-purple-400 to-indigo-500",
    pages: 244,
    year: 1951,
    relatedDocs: ["Leyes de la robótica", "Cronología galáctica", "Conceptos científicos"],
    addedDate: "2024-01-03",
    content: "Su nombre era Gaal Dornick y era solo un campesino que nunca había visto Trántor...",
    uploadedBy: "system",
    isBlocked: false,
  },
  {
    id: "6",
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasía",
    rating: 4.9,
    description:
      "La aventura de Bilbo Bolsón que precede a El Señor de los Anillos, llena de dragones, enanos y tesoros.",
    cover: "bg-gradient-to-br from-green-400 to-emerald-500",
    pages: 310,
    year: 1937,
    relatedDocs: ["Mapa de la Tierra Media", "Lenguas élficas", "Mitología tolkieniana"],
    addedDate: "2024-01-01",
    content:
      "En un agujero en el suelo, vivía un hobbit. No un agujero húmedo, sucio, repugnante, con restos de gusanos y olor a fango...",
    uploadedBy: "system",
    isBlocked: false,
  },
]

const defaultThemes: Theme[] = [
  {
    id: "default",
    name: "Púrpura Predeterminado",
    colors: {
      primary: "262.1 83.3% 57.8%",
      secondary: "210 40% 96%",
      accent: "210 40% 96%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
  },
  {
    id: "ocean",
    name: "Océano Azul",
    colors: {
      primary: "199 89% 48%",
      secondary: "197 37% 24%",
      accent: "189 81% 94%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
  },
  {
    id: "forest",
    name: "Bosque Verde",
    colors: {
      primary: "142 76% 36%",
      secondary: "138 76% 97%",
      accent: "142 71% 45%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
  },
  {
    id: "sunset",
    name: "Atardecer Naranja",
    colors: {
      primary: "25 95% 53%",
      secondary: "24 95% 97%",
      accent: "20 94.6% 48.2%",
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user")
      return saved ? JSON.parse(saved) : null
    }
    return null
  })

  const [books, setBooks] = useState<Book[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("books")
      return saved ? JSON.parse(saved) : initialBooks
    }
    return initialBooks
  })

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reviews")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [readingProgress, setReadingProgress] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("readingProgress")
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("searchHistory")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [customThemes, setCustomThemes] = useState<Theme[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customThemes")
      return saved ? JSON.parse(saved) : defaultThemes
    }
    return defaultThemes
  })

  const [currentTheme, setCurrentThemeState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentTheme") || "default"
    }
    return "default"
  })

  const [termsAcceptances, setTermsAcceptances] = useState<TermsAcceptance[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("termsAcceptances")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [moderationLogs, setModerationLogs] = useState<ModerationLog[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("moderationLogs")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success("Conexión restaurada", {
        description: "Ya estás en línea nuevamente",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.warning("Sin conexión", {
        description: "Estás trabajando en modo offline",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    const theme = customThemes.find((t) => t.id === currentTheme)
    if (theme && typeof document !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--primary", theme.colors.primary)
      root.style.setProperty("--secondary", theme.colors.secondary)
      root.style.setProperty("--accent", theme.colors.accent)
      root.style.setProperty("--background", theme.colors.background)
      root.style.setProperty("--foreground", theme.colors.foreground)
    }
  }, [currentTheme, customThemes])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("books", JSON.stringify(books))
    }
  }, [books])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("reviews", JSON.stringify(reviews))
    }
  }, [reviews])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("readingProgress", JSON.stringify(readingProgress))
    }
  }, [readingProgress])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    }
  }, [searchHistory])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("customThemes", JSON.stringify(customThemes))
    }
  }, [customThemes])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentTheme", currentTheme)
    }
  }, [currentTheme])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("termsAcceptances", JSON.stringify(termsAcceptances))
    }
  }, [termsAcceptances])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moderationLogs", JSON.stringify(moderationLogs))
    }
  }, [moderationLogs])

  const login = async (email: string, password: string, role: UserRole = "user"): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password.length >= 6) {
      const newUser: User = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: role,
      }
      setUser(newUser)
      toast.success("Inicio de sesión exitoso", {
        description: `Bienvenido, ${newUser.name}! Rol: ${role}`,
      })
      return true
    }
    toast.error("Error al iniciar sesión", {
      description: "Credenciales inválidas",
    })
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    toast.info("Sesión cerrada", {
      description: "Has cerrado sesión exitosamente",
    })
  }

  const updateUserRole = (userId: string, role: UserRole) => {
    if (user && user.role === "admin") {
      setUser((prev) => (prev ? { ...prev, role } : null))
      toast.success("Rol actualizado", {
        description: `Tu rol ahora es: ${role}`,
      })
    } else {
      toast.error("Sin permisos", {
        description: "Solo los administradores pueden cambiar roles",
      })
    }
  }

  const acceptTerms = (bookId: string): TermsAcceptance => {
    const acceptance: TermsAcceptance = {
      id: `terms-${Date.now()}`,
      userId: user?.id || "anonymous",
      bookId,
      acceptedAt: new Date().toISOString(),
      ipAddress: "xxx.xxx.xxx.xxx", // En producción, obtener del servidor
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
    }
    setTermsAcceptances((prev) => [...prev, acceptance])
    return acceptance
  }

  const getTermsAcceptance = (bookId: string) => {
    return termsAcceptances.find((t) => t.bookId === bookId && t.userId === user?.id)
  }

  const addBook = (book: Book) => {
    setBooks((prev) => [...prev, book])
    toast.success("Libro agregado", {
      description: `"${book.title}" se agregó a tu biblioteca`,
    })
  }

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)))
    toast.success("Libro actualizado", {
      description: "Los cambios se guardaron correctamente",
    })
  }

  const deleteBook = (id: string) => {
    const book = books.find((b) => b.id === id)
    setBooks((prev) => prev.filter((book) => book.id !== id))
    setFavorites((prev) => prev.filter((favId) => favId !== id))
    toast.success("Libro eliminado", {
      description: book ? `"${book.title}" se eliminó de tu biblioteca` : "Libro eliminado",
    })
  }

  const getBookById = (id: string) => {
    return books.find((book) => book.id === id)
  }

  const getVisibleBooks = () => {
    if (user?.role === "reviewer" || user?.role === "admin") {
      return books
    }
    return books.filter((book) => !book.isBlocked)
  }

  const blockBook = (bookId: string, reason: string) => {
    if (user?.role !== "reviewer" && user?.role !== "admin") {
      toast.error("Sin permisos", {
        description: "Solo los revisores pueden bloquear libros",
      })
      return
    }

    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, isBlocked: true, blockReason: reason } : book)),
    )

    const log: ModerationLog = {
      id: `log-${Date.now()}`,
      bookId,
      moderatorId: user.id,
      moderatorName: user.name,
      action: "block",
      reason,
      timestamp: new Date().toISOString(),
    }
    setModerationLogs((prev) => [log, ...prev])

    toast.success("Libro bloqueado", {
      description: "El libro no será visible para usuarios regulares",
    })
  }

  const unblockBook = (bookId: string) => {
    if (user?.role !== "reviewer" && user?.role !== "admin") {
      toast.error("Sin permisos", {
        description: "Solo los revisores pueden desbloquear libros",
      })
      return
    }

    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, isBlocked: false, blockReason: undefined } : book)),
    )

    const log: ModerationLog = {
      id: `log-${Date.now()}`,
      bookId,
      moderatorId: user.id,
      moderatorName: user.name,
      action: "unblock",
      reason: "Revisión completada - contenido aprobado",
      timestamp: new Date().toISOString(),
    }
    setModerationLogs((prev) => [log, ...prev])

    toast.success("Libro desbloqueado", {
      description: "El libro ahora es visible para todos",
    })
  }

  const flagBook = (bookId: string, reason: string) => {
    const log: ModerationLog = {
      id: `log-${Date.now()}`,
      bookId,
      moderatorId: user?.id || "anonymous",
      moderatorName: user?.name || "Usuario anónimo",
      action: "flag",
      reason,
      timestamp: new Date().toISOString(),
    }
    setModerationLogs((prev) => [log, ...prev])

    toast.success("Libro reportado", {
      description: "Un revisor evaluará el contenido reportado",
    })
  }

  const getModerationLogs = (bookId?: string) => {
    if (bookId) {
      return moderationLogs.filter((log) => log.bookId === bookId)
    }
    return moderationLogs
  }

  const getBlockedBooks = () => {
    return books.filter((book) => book.isBlocked)
  }

  const importBooks = (newBooks: Book[]) => {
    setBooks((prev) => {
      const existingIds = new Set(prev.map((b) => b.id))
      const booksToAdd = newBooks.filter((b) => !existingIds.has(b.id))
      toast.success("Libros importados", {
        description: `Se importaron ${booksToAdd.length} libros nuevos`,
      })
      return [...prev, ...booksToAdd]
    })
  }

  const addReview = (review: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
      helpful: 0,
    }
    setReviews((prev) => [newReview, ...prev])
    toast.success("Reseña publicada", {
      description: "Tu reseña se agregó correctamente",
    })
  }

  const getBookReviews = (bookId: string) => {
    return reviews.filter((review) => review.bookId === bookId)
  }

  const updateReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )
    toast.success("Gracias por tu feedback", {
      description: "Marcaste esta reseña como útil",
    })
  }

  const addToFavorites = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)
    setFavorites((prev) => (prev.includes(bookId) ? prev : [...prev, bookId]))
    toast.success("Agregado a favoritos", {
      description: book ? `"${book.title}" está en tus favoritos` : "Libro agregado a favoritos",
    })
  }

  const removeFromFavorites = (bookId: string) => {
    const book = books.find((b) => b.id === bookId)
    setFavorites((prev) => prev.filter((id) => id !== bookId))
    toast.info("Quitado de favoritos", {
      description: book ? `"${book.title}" se quitó de favoritos` : "Libro quitado de favoritos",
    })
  }

  const isFavorite = (bookId: string) => {
    return favorites.includes(bookId)
  }

  const updateReadingProgress = (bookId: string, progress: number) => {
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: Math.min(100, Math.max(0, progress)),
    }))
    if (progress === 100) {
      toast.success("¡Libro completado!", {
        description: "Felicitaciones por terminar este libro",
      })
    }
  }

  const addToSearchHistory = (term: string) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t !== term)
      return [term, ...filtered].slice(0, 10)
    })
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    toast.info("Historial borrado", {
      description: "Se limpió el historial de búsqueda",
    })
  }

  const getReadingStats = (): ReadingStats => {
    const visibleBooks = getVisibleBooks()
    const totalBooks = visibleBooks.length
    const totalPages = visibleBooks.reduce((sum, book) => sum + book.pages, 0)
    const totalHours = Math.round(totalPages / 50)

    const now = new Date()
    const thisMonth = visibleBooks.filter((book) => {
      if (!book.addedDate) return false
      const bookDate = new Date(book.addedDate)
      return bookDate.getMonth() === now.getMonth() && bookDate.getFullYear() === now.getFullYear()
    }).length

    const thisYear = visibleBooks.filter((book) => {
      if (!book.addedDate) return false
      const bookDate = new Date(book.addedDate)
      return bookDate.getFullYear() === now.getFullYear()
    }).length

    const genreCounts: Record<string, number> = {}
    visibleBooks.forEach((book) => {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1
    })
    const favoriteGenre = Object.entries(genreCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"

    const averageRating = visibleBooks.reduce((sum, book) => sum + book.rating, 0) / visibleBooks.length || 0

    return {
      totalBooks,
      totalPages,
      totalHours,
      booksThisMonth: thisMonth,
      booksThisYear: thisYear,
      averageRating: Number.parseFloat(averageRating.toFixed(1)),
      favoriteGenre,
      readingStreak: 7,
    }
  }

  const addCustomTheme = (theme: Theme) => {
    setCustomThemes((prev) => [...prev, theme])
    toast.success("Tema creado", {
      description: `El tema "${theme.name}" se creó exitosamente`,
    })
  }

  const setCurrentTheme = (themeId: string) => {
    setCurrentThemeState(themeId)
    const theme = customThemes.find((t) => t.id === themeId)
    toast.success("Tema aplicado", {
      description: theme ? `Tema "${theme.name}" activado` : "Tema actualizado",
    })
  }

  const deleteCustomTheme = (themeId: string) => {
    if (themeId === "default") {
      toast.error("No se puede eliminar", {
        description: "El tema predeterminado no se puede eliminar",
      })
      return
    }
    const theme = customThemes.find((t) => t.id === themeId)
    setCustomThemes((prev) => prev.filter((t) => t.id !== themeId))
    if (currentTheme === themeId) {
      setCurrentThemeState("default")
    }
    toast.success("Tema eliminado", {
      description: theme ? `Tema "${theme.name}" eliminado` : "Tema eliminado",
    })
  }

  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserRole,
    books,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    importBooks,
    getVisibleBooks,
    blockBook,
    unblockBook,
    flagBook,
    getModerationLogs,
    getBlockedBooks,
    moderationLogs,
    acceptTerms,
    getTermsAcceptance,
    termsAcceptances,
    reviews,
    addReview,
    getBookReviews,
    updateReviewHelpful,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    readingProgress,
    updateReadingProgress,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    getReadingStats,
    isOnline,
    customThemes,
    currentTheme,
    addCustomTheme,
    setCurrentTheme,
    deleteCustomTheme,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
