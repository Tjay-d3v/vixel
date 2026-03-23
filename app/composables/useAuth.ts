import { computed, ref, readonly } from 'vue'

export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export interface PendingCartItem {
  id: number
  name: string
  price: number
  image: string
  quantity?: number
}

interface RequireAuthOptions {
  redirectTo?: string
}

export const AUTH_REDIRECT_KEY = 'vixel:auth-redirect'
export const PENDING_CART_KEY = 'vixel:pending-cart'

export function useAuth() {
  // Initialize state inside the function (proper Nuxt context)
  const user = useState<AuthUser | null>('auth-user', () => null)
  const userProfile = useState<UserProfile | null>('auth-profile', () => null)
  const initialized = useState<boolean>('auth-initialized', () => false)
  const loading = useState<boolean>('auth-loading', () => false)

  const supabase = useSupabaseClient()
  const router = useRouter()
  const route = useRoute()

  const isAuthenticated = computed(() => Boolean(user.value))

  /**
   * Fetch the current logged-in user from Supabase
   */
  const fetchUser = async (force = false) => {
    if (loading.value) {
      return user.value
    }

    if (initialized.value && !force) {
      return user.value
    }

    loading.value = true

    try {
      const {
        data: { user: supabaseUser },
        error,
      } = await supabase.auth.getUser()

      if (error || !supabaseUser) {
        user.value = null
        userProfile.value = null
      } else {
        user.value = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          user_metadata: supabaseUser.user_metadata as any,
        }

        // Also try to fetch the profile
        await fetchUserProfile(supabaseUser.id)
      }
    } catch (err) {
      console.error('[Auth] Error fetching user:', err)
      user.value = null
      userProfile.value = null
    } finally {
      loading.value = false
      initialized.value = true
    }

    return user.value
  }

  /**
   * Fetch user profile from 'profiles' table, create if missing
   */
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // Profile doesn't exist - create it
        if (error.code === 'PGRST116') {
          console.log('[Auth] Profile not found, creating...')
          
          // Get user data from auth
          const { data: { user } } = await supabase.auth.getUser()
          const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
          
          // Create profile
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              full_name: fullName,
            })
            .select()
            .single()

          if (createError) {
            console.warn('[Auth] Failed to create profile:', createError)
            return null
          }

          userProfile.value = newProfile
          return newProfile
        }
        
        console.warn('[Auth] Could not fetch profile:', error)
        return null
      }

      userProfile.value = data
      return data
    } catch (err) {
      console.error('[Auth] Error fetching profile:', err)
      return null
    }
  }

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: fullName,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        user.value = {
          id: data.user.id,
          email: data.user.email || '',
          user_metadata: data.user.user_metadata,
        }
        initialized.value = true
      }

      return data
    } catch (err) {
      console.error('[Auth] Sign up error:', err)
      throw err
    }
  }

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        user.value = {
          id: data.user.id,
          email: data.user.email || '',
          user_metadata: data.user.user_metadata,
        }
        await fetchUserProfile(data.user.id)
        initialized.value = true
      }

      return data
    } catch (err) {
      console.error('[Auth] Sign in error:', err)
      throw err
    }
  }

  /**
   * Register (signup with email and password)
   * Wrapper around signUp that handles profile creation
   */
  const register = async (options: {
    email: string
    password: string
    name: string
    rememberMe?: boolean
  }) => {
    try {
      const { email, password, name } = options

      // Sign up the user
      const signUpResult = await signUp(email, password, name)

      // Check if session was automatically created (auto-confirmed)
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        // Auto-confirmed signup - user is logged in immediately
        // Create profile if it doesn't exist
        await fetchUserProfile(session.user.id)
      }

      return {
        user: signUpResult.user,
        session: signUpResult.session,
        requiresEmailConfirmation: !signUpResult.session, // No session = email confirmation needed
      }
    } catch (err) {
      console.error('[Auth] Register error:', err)
      throw err
    }
  }

  /**
   * Sign in with OAuth (Google)
   */
  const signInWithGoogle = async (redirectUrl?: string) => {
    try {
      if (!redirectUrl) {
        redirectUrl = new URL('/auth/callback', window.location.origin).toString()
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: 'consent',
          },
        },
      })

      if (error) throw error

      // The user will be redirected to Google, then back to the callback
      return data
    } catch (err) {
      console.error('[Auth] Google sign-in error:', err)
      throw err
    }
  }

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({
        scope: 'local',
      })

      if (error) throw error

      user.value = null
      userProfile.value = null
      initialized.value = false

      // Clear session storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(AUTH_REDIRECT_KEY)
      }

      return true
    } catch (err) {
      console.error('[Auth] Sign out error:', err)
      throw err
    }
  }

  /**
   * Store redirect target before auth
   */
  const storeRedirectTarget = (target: string) => {
    if (typeof window !== 'undefined') {
      if (target && target.startsWith('/') && !target.startsWith('//')) {
        sessionStorage.setItem(AUTH_REDIRECT_KEY, target)
      }
    }
  }

  /**
   * Get stored redirect target
   */
  const getRedirectTarget = () => {
    if (typeof window === 'undefined') {
      return '/products'
    }

    const stored = sessionStorage.getItem(AUTH_REDIRECT_KEY)
    if (stored && stored.startsWith('/') && !stored.startsWith('//')) {
      return stored
    }

    return '/products'
  }

  /**
   * Clear redirect target
   */
  const clearRedirectTarget = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_REDIRECT_KEY)
    }
  }

  /**
   * Require auth - redirect to login if not authenticated
   */
  const requireAuth = async (options: RequireAuthOptions = {}) => {
    await fetchUser(true)

    if (isAuthenticated.value) {
      return true
    }

    const redirectTo = options.redirectTo || route.fullPath
    storeRedirectTarget(redirectTo)

    await router.push({
      path: '/login',
      query: { redirect: redirectTo },
    })

    return false
  }

  return {
    user: readonly(user),
    userProfile: readonly(userProfile),
    isAuthenticated,
    loading: readonly(loading),
    initialized: readonly(initialized),
    fetchUser,
    fetchUserProfile,
    signUp,
    signIn,
    register,
    signInWithGoogle,
    signOut,
    storeRedirectTarget,
    getRedirectTarget,
    clearRedirectTarget,
    requireAuth,
  }
}
