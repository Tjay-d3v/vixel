<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')

function handleLogin() {
  // TODO: integrate real auth
  alert(`Logged in (demo): ${email.value}`)
  email.value = password.value = ''
}
</script>

<template>
  <section class="flex items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-4">Log In</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full border px-3 py-2 rounded" required />
        <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <p class="text-center text-sm mt-4">Don't have an account? <NuxtLink to="/signup" class="text-blue-600">Sign up</NuxtLink></p>
    </div>
  </section>
</template>
