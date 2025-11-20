import axios from "axios"
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    withCredentials: true,
})

export function setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearAuthToken() {
    delete api.defaults.headers.common['Authorization']
}