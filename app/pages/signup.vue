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
  // TODO: call an auth API (Supabase/Firebase) later
  alert(`Welcome ${name.value}! Account created (demo).`)
  name.value = email.value = password.value = confirmPassword.value = ''
}
</script>

<template>
  <section class="flex items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-4">Create Account</h1>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <input v-model="name" placeholder="Full name" class="w-full border px-3 py-2 rounded" required />
        <input v-model="email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full border px-3 py-2 rounded" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm password" class="w-full border px-3 py-2 rounded" required />
        <button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
      <p class="text-center text-sm mt-4">Already have an account? <NuxtLink to="/login" class="text-blue-600">Log in</NuxtLink></p>
    </div>
  </section>
</template>
