import { createServerSupabaseClient } from '../../utils/supabase'
import {
  clearFailedLogins,
  getClientIp,
  isLoginRateLimited,
  recordFailedLogin,
  setAuthCookies,
  toPublicUser,
  validateLoginBody,
} from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const ip = getClientIp(event)

  if (isLoginRateLimited(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many login attempts. Please try again in a minute.',
    })
  }

  const body = await readBody(event)
  const { email, password, rememberMe } = validateLoginBody(body)
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.session) {
    recordFailedLogin(ip)

    throw createError({
      statusCode: 401,
      statusMessage: error?.message || 'Invalid email or password.',
    })
  }

  clearFailedLogins(ip)
  setAuthCookies(event, data.session.access_token, data.session.refresh_token, rememberMe)

  return {
    user: toPublicUser(data.session.user),
  }
})
