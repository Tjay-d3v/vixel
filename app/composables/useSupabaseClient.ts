import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

/**
 * Browser-safe Supabase client using localStorage for PKCE
 * (localStorage persists across OAuth redirects)
 */
export function useSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const config = useRuntimeConfig()

    // Use localStorage which persists across page navigation/redirects
    // This is essential for PKCE flow to work with OAuth
    supabaseClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey,
      {
        auth: {
          flowType: 'pkce',
          detectSessionInUrl: false, // Handle manually in callback page
          persistSession: true,
          autoRefreshToken: true,
          storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        },
      },
    )

    console.debug('[Supabase Client] Initialized with localStorage-based PKCE storage')
  }

  return supabaseClient
}

