import { createError, deleteCookie, getCookie, getHeader, setCookie, type H3Event } from 'h3'
import type { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthBody {
  name?: unknown
  email?: unknown
  password?: unknown
  rememberMe?: unknown
}

interface LoginRateLimitRecord {
  attempts: number[]
}

const ACCESS_TOKEN_COOKIE = 'vixel_access_token'
const REFRESH_TOKEN_COOKIE = 'vixel_refresh_token'
const PERSIST_COOKIE = 'vixel_persist'
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30
const LOGIN_WINDOW_MS = 60_000
const LOGIN_MAX_ATTEMPTS = 5
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const loginAttempts = new Map<string, LoginRateLimitRecord>()

function assertObject(value: unknown) {
  if (!value || typeof value !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body.',
    })
  }
}

function pruneAttempts(attempts: number[], now: number) {
  return attempts.filter((timestamp) => now - timestamp < LOGIN_WINDOW_MS)
}

export function normalizeName(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ')
}

export function normalizeEmail(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

export function validatePassword(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

export function validateRegisterBody(body: unknown) {
  assertObject(body)
  const payload = body as AuthBody
  const name = normalizeName(payload.name)
  const email = normalizeEmail(payload.email)
  const password = validatePassword(payload.password)
  const rememberMe = Boolean(payload.rememberMe)

  if (name.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name must be at least 2 characters long.',
    })
  }

  if (!emailPattern.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid email address is required.',
    })
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 8 characters long.',
    })
  }

  return { name, email, password, rememberMe }
}

export function validateLoginBody(body: unknown) {
  assertObject(body)
  const payload = body as AuthBody
  const email = normalizeEmail(payload.email)
  const password = validatePassword(payload.password)
  const rememberMe = Boolean(payload.rememberMe)

  if (!emailPattern.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid email address is required.',
    })
  }

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is required.',
    })
  }

  return { email, password, rememberMe }
}

export function getClientIp(event: H3Event) {
  const forwardedFor = getHeader(event, 'x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || event.node.req.socket.remoteAddress || 'unknown'
}

export function isLoginRateLimited(key: string) {
  const now = Date.now()
  const record = loginAttempts.get(key)

  if (!record) {
    return false
  }

  record.attempts = pruneAttempts(record.attempts, now)

  if (!record.attempts.length) {
    loginAttempts.delete(key)
    return false
  }

  return record.attempts.length >= LOGIN_MAX_ATTEMPTS
}

export function recordFailedLogin(key: string) {
  const now = Date.now()
  const record = loginAttempts.get(key) ?? { attempts: [] }
  record.attempts = [...pruneAttempts(record.attempts, now), now]
  loginAttempts.set(key, record)
}

export function clearFailedLogins(key: string) {
  loginAttempts.delete(key)
}

function createCookieOptions(rememberMe: boolean) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    ...(rememberMe ? { maxAge: REMEMBER_ME_MAX_AGE } : {}),
  }
}

export function setAuthCookies(event: H3Event, accessToken: string, refreshToken: string, rememberMe: boolean) {
  const options = createCookieOptions(rememberMe)

  setCookie(event, ACCESS_TOKEN_COOKIE, accessToken, options)
  setCookie(event, REFRESH_TOKEN_COOKIE, refreshToken, options)
  setCookie(event, PERSIST_COOKIE, rememberMe ? '1' : '0', options)
}

export function clearAuthCookies(event: H3Event) {
  const options = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  }

  deleteCookie(event, ACCESS_TOKEN_COOKIE, options)
  deleteCookie(event, REFRESH_TOKEN_COOKIE, options)
  deleteCookie(event, PERSIST_COOKIE, options)
}

export function getAccessToken(event: H3Event) {
  return getCookie(event, ACCESS_TOKEN_COOKIE) || ''
}

export function getRefreshToken(event: H3Event) {
  return getCookie(event, REFRESH_TOKEN_COOKIE) || ''
}

export function shouldPersistSession(event: H3Event) {
  return getCookie(event, PERSIST_COOKIE) === '1'
}

export function toPublicUser(user: User): AuthUser {
  const metadataName = typeof user.user_metadata?.name === 'string' ? user.user_metadata.name.trim() : ''
  const email = user.email || ''

  return {
    id: user.id,
    name: metadataName || email.split('@')[0] || 'Shopper',
    email,
  }
}
