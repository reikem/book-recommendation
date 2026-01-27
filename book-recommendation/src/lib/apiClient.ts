import axios from "axios"

const base =
    process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL + "/api"
        : "/api"

export const api = axios.create({
    baseURL: base,
    withCredentials: true,
})

export function setAuthToken(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function clearAuthToken() {
    delete api.defaults.headers.common["Authorization"]
}
