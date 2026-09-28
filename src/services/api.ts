// Single place for every HTTP request in the app.
// Auth headers, error handling, and base URL all live here, so changing how
// requests are authenticated only means editing this file.

const TOKEN_STORAGE_KEY = 'authToken'

type QueryParams = Record<string, string | number | boolean | undefined>

type RequestOptions = {
  params?: QueryParams
  headers?: HeadersInit
  signal?: AbortSignal
}

export class ApiError extends Error {
  readonly status: number
  readonly data: unknown

  constructor(status: number, message: string, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  return 'Unable to reach the server. Please try again.'
}

class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '')
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>('GET', path, undefined, options)
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>('POST', path, body, options)
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>('PUT', path, body, options)
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>('DELETE', path, undefined, options)
  }

  setToken(token: string | null) {
    try {
      if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
      else localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {
      // Storage can be unavailable (private mode, blocked cookies)
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch {
      return null
    }
  }

  private async request<T>(method: string, path: string, body: unknown, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers)
    headers.set('Accept', 'application/json')
    if (body !== undefined) headers.set('Content-Type', 'application/json')

    const token = this.getToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)

    const response = await fetch(this.buildUrl(path, options.params), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: options.signal,
    })

    const data = await this.parseBody(response)

    if (!response.ok) {
      if (response.status === 401) this.setToken(null)
      throw new ApiError(response.status, this.errorMessage(data, response), data)
    }

    return data as T
  }

  private buildUrl(path: string, params?: QueryParams) {
    const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`
    if (!params) return url

    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) search.append(key, String(value))
    }
    const query = search.toString()
    return query ? `${url}?${query}` : url
  }

  private async parseBody(response: Response): Promise<unknown> {
    if (response.status === 204) return null
    const text = await response.text()
    if (!text) return null
    const contentType = response.headers.get('Content-Type') ?? ''
    return contentType.includes('application/json') ? JSON.parse(text) : text
  }

  private errorMessage(data: unknown, response: Response) {
    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
      return data.message
    }
    if (typeof data === 'string' && data) return data
    return response.statusText || `Request failed with status ${response.status}`
  }
}

export const api = new ApiClient(import.meta.env.VITE_API_BASE_URL ?? '/api')
