import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const route = useRoute()

  // Skip auth initialization on OAuth callback page to avoid interfering with PKCE code verifier
  if (route.path === '/auth/callback') {
    console.debug('[Auth Init] Skipping auth init on callback page')
    return
  }

  const { fetchUser } = useAuth()

  // Only fetch user on client side to avoid SSR issues
  if (process.client) {
    try {
      await fetchUser()
    } catch (err) {
      console.error('[Auth Init] Error fetching user:', err)
    }
  }
})
