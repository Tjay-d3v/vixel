import { createServerSupabaseClient } from '../../utils/supabase'
import { clearAuthCookies, setAuthCookies, toPublicUser, validateRegisterBody } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password, rememberMe } = validateRegisterBody(body)
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  if (data.session) {
    setAuthCookies(event, data.session.access_token, data.session.refresh_token, rememberMe)
  } else {
    clearAuthCookies(event)
  }

  return {
    user: data.session?.user ? toPublicUser(data.session.user) : null,
    requiresEmailConfirmation: !data.session,
  }
})
