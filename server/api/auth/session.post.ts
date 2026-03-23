import { createServerSupabaseClient } from '../../utils/supabase'
import { setAuthCookies } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const accessToken = typeof body?.accessToken === 'string' ? body.accessToken : ''
  const refreshToken = typeof body?.refreshToken === 'string' ? body.refreshToken : ''
  const rememberMe = body?.rememberMe !== false

  if (!accessToken || !refreshToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing Supabase session tokens.',
    })
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Supabase session is invalid.',
    })
  }

  setAuthCookies(event, accessToken, refreshToken, rememberMe)

  return {
    user: {
      id: data.user.id,
      name: typeof data.user.user_metadata?.name === 'string'
        ? data.user.user_metadata.name
        : (data.user.email || 'Shopper').split('@')[0],
      email: data.user.email || '',
    },
  }
})
