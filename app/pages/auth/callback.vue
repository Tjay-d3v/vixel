<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const { fetchUser, getRedirectTarget, clearRedirectTarget } = useAuth()

const errorMessage = ref('')
const isLoading = ref(true)

onMounted(async () => {
  try {
    console.log('[Auth Callback] Page loaded')

    const code = route.query.code as string

    if (code) {
      console.log('[Auth Callback] Code found in URL, exchanging...')
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('[Auth Callback] Code exchange failed:', error)
        throw error
      }

      if (!data.session) {
        throw new Error('Failed to establish session')
      }

      console.log('[Auth Callback] Session established successfully')
    } else {
      console.log('[Auth Callback] No code in URL, checking session...')

      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        throw new Error('No session found. Please try signing in again.')
      }

      console.log('[Auth Callback] Session retrieved from storage')
    }

    await fetchUser(true)

    const redirectTarget = getRedirectTarget()
    clearRedirectTarget()

    console.log('[Auth Callback] Redirecting to', redirectTarget)

    await navigateTo(redirectTarget)
  } catch (err) {
    console.error('[Auth Callback] Error:', err)

    errorMessage.value =
      err instanceof Error
        ? err.message
        : 'An error occurred during sign-in. Please try again.'

    isLoading.value = false
  }
})
</script>

<template>
  <section class="flex min-h-screen items-center justify-center bg-slate-950 p-4">
    <div class="w-full max-w-md rounded-xl bg-slate-900 p-8 text-center shadow-lg">

      <!-- Loading State -->
      <template v-if="isLoading">
        <h1 class="text-2xl font-bold text-slate-100">
          Completing Sign-In
        </h1>

        <p class="mt-4 text-sm text-slate-400 leading-relaxed">
          Please wait while we finalize your Google account sign-in...
        </p>

        <div class="mt-8 flex justify-center">
          <div
            class="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"
          />
        </div>
      </template>

      <!-- Error State -->
      <template v-else>
        <h1 class="text-2xl font-bold text-red-500">
          Sign-In Failed
        </h1>

        <p class="mt-4 text-sm text-slate-400 leading-relaxed">
          {{ errorMessage }}
        </p>

        <NuxtLink
          to="/login"
          class="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Back to Login
        </NuxtLink>
      </template>

    </div>
  </section>
</template>
