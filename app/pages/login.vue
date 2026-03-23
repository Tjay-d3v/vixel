<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')

function handleLogin() {
  alert(`Logged in (demo): ${email.value}`)
  email.value = password.value = ''
}
</script>

<template>
  <section class="grid min-h-[65vh] gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
    <div class="banner-panel px-8 py-10 md:px-10">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Welcome back</p>
      <h1 class="mt-4 text-4xl font-black tracking-tight">Jump back into your promo-ready storefront.</h1>
      <p class="mt-5 text-base leading-relaxed text-white/75">
        Log in to continue shaping bundles, featured banners, and campaign moments across the store.
      </p>
    </div>

    <div class="surface-card w-full max-w-xl p-8">
      <h2 class="text-3xl font-black text-slate-950">Log In</h2>
      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="input-field" required />
        <input v-model="password" type="password" placeholder="Password" class="input-field" required />
        <button type="submit" class="btn-primary w-full">Enter Dashboard</button>
      </form>
      <p class="mt-4 text-sm text-slate-600">
        Do not have an account?
        <NuxtLink to="/signup" class="font-semibold text-orange-600">Sign up</NuxtLink>
      </p>
    </div>
  </section>
</template>
