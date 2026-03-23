<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { fetchUser, isAuthenticated, signIn, signInWithGoogle, storeRedirectTarget, getRedirectTarget } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const isSubmitting = ref(false)
const isGoogleSubmitting = ref(false)

// Check if already logged in
await fetchUser()

if (isAuthenticated.value) {
  const redirectTarget = getRedirectTarget()
  await navigateTo(redirectTarget, { replace: true })
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message
  }

  const obj = error as Record<string, any>
  return obj?.statusMessage || obj?.message || fallback
}

async function handleLogin() {
  errorMessage.value = ''

  if (!form.email.trim() || !form.password.trim()) {
    errorMessage.value = 'Email and password are required.'
    return
  }

  isSubmitting.value = true

  try {
    await signIn(form.email, form.password)

    const redirectTarget = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : getRedirectTarget()

    await router.push(redirectTarget)
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Unable to log in. Please check your credentials.')
    console.error('[Login] Error:', error)
  } finally {
    isSubmitting.value = false
  }
}

async function handleGoogleLogin() {
  errorMessage.value = ''
  isGoogleSubmitting.value = true

  try {
    // Store redirect target before starting OAuth flow
    const redirectTarget = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/products'

    storeRedirectTarget(redirectTarget)

    // Start Google sign-in
    const redirectUrl = new URL('/auth/callback', window.location.origin).toString()
    await signInWithGoogle(redirectUrl)

    // User will be redirected to Google
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Unable to start Google sign-in. Please try again.')
    console.error('[Login] Google error:', error)
    isGoogleSubmitting.value = false
  }
}
</script>

<template>
  <section class="grid min-h-[65vh] gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
    <div class="banner-panel px-8 py-10 md:px-10">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Welcome back</p>
      <h1 class="mt-4 text-4xl font-black tracking-tight">Log in before you build your next cart.</h1>
      <p class="mt-5 text-base leading-relaxed text-white/75">
        Sign in to save your session, protect checkout, and keep product adds tied to a real account.
      </p>
    </div>

    <div class="surface-card w-full max-w-xl p-8">
      <h2 class="text-3xl font-black text-slate-950">Log In</h2>
      <p class="mt-3 text-sm text-slate-600">Use your email and password to continue shopping.</p>

      <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700" for="email">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" class="input-field" placeholder="you@example.com" required />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700" for="password">Password</label>
          <input id="password" v-model="form.password" type="password" autocomplete="current-password" class="input-field" placeholder="At least 8 characters" required />
        </div>

        <label class="flex items-center gap-3 text-sm font-medium text-slate-600">
          <input v-model="form.rememberMe" type="checkbox" class="h-4 w-4 rounded border-orange-200 text-orange-500 focus:ring-orange-500" />
          Remember me for 30 days
        </label>

        <p v-if="errorMessage" class="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ errorMessage }}
        </p>

        <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
          {{ isSubmitting ? 'Logging in...' : 'Log In' }}
        </button>
      </form>

      <div class="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        <span class="h-px flex-1 bg-orange-100" />
        <span>or</span>
        <span class="h-px flex-1 bg-orange-100" />
      </div>

      <button class="btn-secondary w-full" :disabled="isGoogleSubmitting" @click="handleGoogleLogin">
        {{ isGoogleSubmitting ? 'Redirecting to Google...' : 'Continue with Google' }}
      </button>

      <p class="mt-4 text-sm text-slate-600">
        Need an account?
        <NuxtLink to="/register" class="font-semibold text-orange-600">Create one</NuxtLink>
      </p>
    </div>
  </section>
</template>
