const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export class ApiError extends Error {
  statusCode: number
  code: string

  constructor(message: string, statusCode: number, code: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}

export class AuthError extends ApiError {
  constructor(message = 'Session expired') {
    super(message, 401, 'AUTH_ERROR')
  }
}

let accessToken: string | null = null
let refreshTokenValue: string | null = null
let refreshPromise: Promise<void> | null = null

export function setTokens(access: string | null, refresh: string | null) {
  accessToken = access
  refreshTokenValue = refresh
}

export function clearTokens() {
  accessToken = null
  refreshTokenValue = null
}

async function refreshTokens(): Promise<void> {
  if (!refreshTokenValue) throw new AuthError()

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refreshTokenValue }),
  })

  if (!res.ok) {
    clearTokens()
    throw new AuthError()
  }

  const data = await res.json()
  if (data.data?.accessToken) {
    accessToken = data.data.accessToken
    refreshTokenValue = data.data.refreshToken
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  })

  if (res.status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshTokens().finally(() => { refreshPromise = null })
    }

    try {
      await refreshPromise
    } catch {
      throw new AuthError()
    }

    const retryHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    if (accessToken) {
      retryHeaders['Authorization'] = `Bearer ${accessToken}`
    }

    const retryRes = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: retryHeaders,
    })

    if (!retryRes.ok) {
      const errorData = await retryRes.json().catch(() => ({ error: { message: 'Request failed', code: 'ERROR' } }))
      throw new ApiError(errorData.error?.message || 'Request failed', retryRes.status, errorData.error?.code || 'ERROR')
    }

    const retryData = await retryRes.json()
    return retryData.data as T
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: { message: 'Request failed', code: 'ERROR' } }))
    throw new ApiError(errorData.error?.message || 'Request failed', res.status, errorData.error?.code || 'ERROR')
  }

  const data = await res.json()
  return data.data as T
}

function get<T>(path: string) {
  return apiFetch<T>(path)
}

function post<T>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })
}

function put<T>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })
}

function del<T>(path: string) {
  return apiFetch<T>(path, { method: 'DELETE' })
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) => post<any>('/auth/login', data),
    login2fa: (data: { email: string; password: string; twoFactorCode: string }) => post<any>('/auth/login/2fa', data),
    register: (data: { name: string; email: string; password: string; phone?: string }) => post<any>('/auth/register', data),
    logout: () => post<any>('/auth/logout'),
    me: () => get<any>('/auth/me'),
    refresh: () => post<any>('/auth/refresh', { refreshToken: refreshTokenValue }),
    forgotPassword: (data: { email: string }) => post<any>('/auth/forgot-password', data),
    resetPassword: (data: { token: string; password: string }) => post<any>('/auth/reset-password', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) => post<any>('/auth/change-password', data),
    setup2fa: () => post<any>('/auth/2fa/setup'),
    enable2fa: (data: { code: string }) => post<any>('/auth/2fa/enable', data),
    disable2fa: (data: { code: string }) => post<any>('/auth/2fa/disable', data),
  },
  courses: {
    list: () => get<any[]>('/courses'),
    get: (id: string) => get<any>(`/courses/${id}`),
    create: (data: any) => post<any>('/courses', data),
    update: (id: string, data: any) => put<any>(`/courses/${id}`, data),
    delete: (id: string) => del<any>(`/courses/${id}`),
  },
  enrollments: {
    enroll: (data: { courseId: string }) => post<any>('/enrollments', data),
    my: () => get<any[]>('/enrollments/my'),
  },
  students: {
    list: () => get<any[]>('/students'),
    update: (id: string, data: any) => put<any>(`/students/${id}`, data),
    delete: (id: string) => del<any>(`/students/${id}`),
  },
  staff: {
    list: () => get<any[]>('/staff'),
    listPublic: () => get<any[]>('/staff/public'),
    create: (data: any) => post<any>('/staff', data),
    update: (id: string, data: any) => put<any>(`/staff/${id}`, data),
    delete: (id: string) => del<any>(`/staff/${id}`),
  },
  payments: {
    initialize: (data: { courseId: string; callbackUrl?: string }) => post<any>('/payments/initialize', data),
    verify: (reference: string) => get<any>(`/payments/verify/${reference}`),
    create: (data: { courseId: string; amount: number; method: string }) => post<any>('/payments', data),
    my: () => get<any[]>('/payments/my'),
    all: () => get<any[]>('/payments'),
    updateStatus: (id: string, status: string) => put<any>(`/payments/${id}`, { status }),
    delete: (id: string) => del<any>(`/payments/${id}`),
  },
  assignments: {
    submit: (data: any) => post<any>('/assignments', data),
    my: () => get<any[]>('/assignments/my'),
  },
  certificates: {
    issue: (data: { studentId: string; courseId: string }) => post<any>('/certificates', data),
    verify: (id: string) => get<any>(`/certificates/${id}/verify`),
    my: () => get<any[]>('/certificates/my'),
    delete: (id: string) => del<any>(`/certificates/${id}`),
  },
  blog: {
    list: () => get<any[]>('/blog'),
    create: (data: any) => post<any>('/blog', data),
    update: (id: string, data: any) => put<any>(`/blog/${id}`, data),
    delete: (id: string) => del<any>(`/blog/${id}`),
  },
  gallery: {
    list: () => get<any[]>('/gallery'),
    add: (data: any) => post<any>('/gallery', data),
    delete: (id: string) => del<any>(`/gallery/${id}`),
  },
  stats: {
    dashboard: () => get<any>('/stats/dashboard'),
  },
  partners: {
    list: () => get<any[]>('/partners'),
    create: (data: any) => post<any>('/partners', data),
    update: (id: string, data: any) => put<any>(`/partners/${id}`, data),
    delete: (id: string) => del<any>(`/partners/${id}`),
  },
}
