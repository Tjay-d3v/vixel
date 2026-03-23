<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  alert(`Welcome ${name.value}! Account created (demo).`)
  name.value = email.value = password.value = confirmPassword.value = ''
}
</script>

<template>
  <section class="grid min-h-[65vh] gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
    <div class="banner-panel px-8 py-10 md:px-10">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Create access</p>
      <h1 class="mt-4 text-4xl font-black tracking-tight">Start building campaigns, banners, and offers from day one.</h1>
      <p class="mt-5 text-base leading-relaxed text-white/75">
        Create an account and step into a storefront theme designed to feel more active, promotional, and launch-ready.
      </p>
    </div>

    <div class="surface-card w-full max-w-xl p-8">
      <h2 class="text-3xl font-black text-slate-950">Create Account</h2>
      <form @submit.prevent="handleSignup" class="mt-6 space-y-4">
        <input v-model="name" placeholder="Full name" class="input-field" required />
        <input v-model="email" type="email" placeholder="Email" class="input-field" required />
        <input v-model="password" type="password" placeholder="Password" class="input-field" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm password" class="input-field" required />
        <button type="submit" class="btn-primary w-full">Create Account</button>
      </form>
      <p class="mt-4 text-sm text-slate-600">
        Already have an account?
        <NuxtLink to="/login" class="font-semibold text-orange-600">Log in</NuxtLink>
      </p>
    </div>
  </section>
</template>
