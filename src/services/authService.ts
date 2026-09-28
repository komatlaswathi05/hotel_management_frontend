import { api } from './api'

export type User = {
  id: string
  fullName: string
  email: string
  phone?: string
}

type AuthResponse = {
  token: string
  user: User
}

export type SignupPayload = {
  fullName: string
  email: string
  phone?: string
  password: string
}

export const authService = {
  async login(email: string, password: string) {
    const { token, user } = await api.post<AuthResponse>('/auth/login', { email, password })
    api.setToken(token)
    return user
  },

  signup(payload: SignupPayload) {
    return api.post<User>('/auth/signup', payload)
  },

  forgotPassword(email: string) {
    return api.post<void>('/auth/forgot-password', { email })
  },

  logout() {
    api.setToken(null)
  },
}
