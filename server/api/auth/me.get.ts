import { createServerSupabaseClient } from '../../utils/supabase'
import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  shouldPersistSession,
  toPublicUser,
} from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const accessToken = getAccessToken(event)
  const refreshToken = getRefreshToken(event)

  if (!accessToken) {
    return { user: null }
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (!error && data.user) {
    return {
      user: toPublicUser(data.user),
    }
  }

  if (!refreshToken) {
    clearAuthCookies(event)
    return { user: null }
  }

  const refreshed = await supabase.auth.refreshSession({ refresh_token: refreshToken })

  if (refreshed.error || !refreshed.data.session) {
    clearAuthCookies(event)
    return { user: null }
  }

  setAuthCookies(event, refreshed.data.session.access_token, refreshed.data.session.refresh_token, shouldPersistSession(event))

  return {
    user: toPublicUser(refreshed.data.session.user),
  }
})
