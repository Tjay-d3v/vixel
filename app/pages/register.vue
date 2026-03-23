<script setup lang="ts">
const route = useRoute()
const { clearRedirectTarget, fetchUser, getAuthRedirectTarget, isAuthenticated, signInWithGoogle, register } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: true,
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)
const isGoogleSubmitting = ref(false)

await fetchUser()

if (isAuthenticated.value) {
  await navigateTo(getAuthRedirectTarget('/products'), { replace: true })
}

function getErrorMessage(error: unknown, fallback: string) {
  const message = (error as { data?: { statusMessage?: string }, statusMessage?: string, message?: string })

  return message.data?.statusMessage || message.statusMessage || message.message || fallback
}

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
    errorMessage.value = 'Name, email, and password are required.'
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isSubmitting.value = true

  try {
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe,
    })

    if (result.requiresEmailConfirmation) {
      successMessage.value = 'Account created. Check your email to confirm your address before logging in.'
      form.password = ''
      form.confirmPassword = ''
      clearRedirectTarget()
      return
    }

    const redirectTarget = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : getAuthRedirectTarget('/products')

    clearRedirectTarget()
    await navigateTo(redirectTarget, { replace: true })
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Unable to create your account right now.')
  } finally {
    isSubmitting.value = false
  }
}

async function handleGoogleSignup() {
  errorMessage.value = ''
  successMessage.value = ''
  isGoogleSubmitting.value = true

  try {
    await signInWithGoogle(typeof route.query.redirect === 'string' ? route.query.redirect : undefined)
  } catch (error) {
    errorMessage.value = getErrorMessage(error, 'Unable to start Google sign-in right now.')
    isGoogleSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Loading Modal -->
    <Transition name="fade">
      <div v-if="isSubmitting || isGoogleSubmitting" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="flex flex-col items-center rounded-xl bg-white px-10 py-8 text-center shadow-2xl">
          <div class="mb-4">
            <div class="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
          </div>
          <p class="text-base font-semibold text-slate-800">
            {{ isSubmitting ? 'Creating your account...' : 'Redirecting to Google...' }}
          </p>
          <p class="mt-1 text-xs text-slate-500">
            {{ isSubmitting ? 'Setting up your profile' : 'Please wait' }}
          </p>
        </div>
      </div>
    </Transition>

    <section class="grid min-h-[65vh] gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
      <div class="banner-panel px-8 py-10 md:px-10">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Create access</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight">Create an account before your first bundle lands in the cart.</h1>
        <p class="mt-5 text-base leading-relaxed text-white/75">
          Registration now runs through Supabase Auth while keeping the cart and checkout flow protected.
        </p>
      </div>

      <div class="surface-card w-full max-w-xl p-8">
        <h2 class="text-3xl font-black text-slate-950">Create Account</h2>
        <p class="mt-3 text-sm text-slate-600">Set up your shopper account and continue with protected checkout.</p>

        <!-- Success Message Section -->
        <Transition name="fade">
          <div v-if="successMessage" class="mt-6 rounded-2xl bg-emerald-50 px-6 py-4">
            <p class="text-sm font-semibold text-emerald-700">✓ {{ successMessage }}</p>
            <p class="mt-2 text-xs text-emerald-600">
              Once you confirm your email, you can log in with your credentials.
            </p>
          </div>
        </Transition>

        <!-- Form (hidden if success) -->
        <form v-if="!successMessage" class="mt-6 space-y-4" @submit.prevent="handleRegister">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700" for="name">Full name</label>
            <input id="name" v-model="form.name" autocomplete="name" class="input-field" placeholder="Taylor Jones" required />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700" for="email">Email</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" class="input-field" placeholder="you@example.com" required />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700" for="password">Password</label>
            <input id="password" v-model="form.password" type="password" autocomplete="new-password" class="input-field" placeholder="At least 8 characters" required />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700" for="confirm-password">Confirm password</label>
            <input id="confirm-password" v-model="form.confirmPassword" type="password" autocomplete="new-password" class="input-field" placeholder="Repeat your password" required />
          </div>

          <label class="flex items-center gap-3 text-sm font-medium text-slate-600">
            <input v-model="form.rememberMe" type="checkbox" class="h-4 w-4 rounded border-orange-200 text-orange-500 focus:ring-orange-500" />
            Keep me signed in on this device
          </label>

          <Transition name="fade">
            <p v-if="errorMessage" class="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {{ errorMessage }}
            </p>
          </Transition>

          <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Divider -->
        <div v-if="!successMessage" class="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span class="h-px flex-1 bg-orange-100" />
          <span>or</span>
          <span class="h-px flex-1 bg-orange-100" />
        </div>

        <!-- Google Button -->
        <button v-if="!successMessage" class="btn-secondary w-full" :disabled="isGoogleSubmitting" @click="handleGoogleSignup">
          {{ isGoogleSubmitting ? 'Redirecting to Google...' : 'Continue with Google' }}
        </button>

        <!-- Sign In Link -->
        <p v-if="!successMessage" class="mt-4 text-sm text-slate-600">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-orange-600">Log in</NuxtLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
