import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

export default defineNuxtPlugin(async (nuxtApp) => {
  const route = useRoute()

  // Skip auth initialization on OAuth callback page to avoid interfering with PKCE code verifier
  if (route.path === '/auth/callback') {
    console.debug('[Auth Init] Skipping auth init on callback page')
    return
  }

  const { fetchUser, isAuthenticated } = useAuth()
  const { mergeLocalCart, initializeCart } = useCart()

  // Only fetch user on client side to avoid SSR issues
  if (process.client) {
    try {
      await fetchUser()
      
      // Initialize cart (load from Supabase if logged in)
      await initializeCart()
      
      // If user just logged in, merge localStorage cart into Supabase
      if (isAuthenticated.value) {
        await mergeLocalCart()
      }
    } catch (err) {
      console.error('[Auth Init] Error during initialization:', err)
    }
  }
})
