import { createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseAdmin: SupabaseClient | null = null

/**
 * Server-side Supabase client with service role key
 * Use this for operations that need full database access (creating profiles, orders, etc.)
 * NEVER expose service role key to client code
 */
export function useSupabaseServerAdmin(): SupabaseClient {
  if (supabaseAdmin) {
    return supabaseAdmin
  }

  const config = useRuntimeConfig()
  const supabaseUrl = config.supabaseUrl
  const supabaseServiceRoleKey = config.supabaseServiceRoleKey

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Supabase server configuration is missing (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)',
    })
  }

  supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })

  return supabaseAdmin
}

/**
 * Create a Supabase client for a specific user session
 * Use this when you have a user's access token
 */
export function createServerSupabaseClient(token?: string) {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase environment variables are missing.',
    })
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })

  // If a token is provided, set it as the auth token
  if (token) {
    client.auth.setSession({
      access_token: token,
      refresh_token: '',
      user: null as any,
    })
  }

  return client
}

