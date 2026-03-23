<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

const { cart } = useCart()
const { fetchUser, isAuthenticated, signOut, user } = useAuth()
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))

const isOpen = ref(false)
const isScrolled = ref(false)
const isLoggingOut = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 14
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  await fetchUser()
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

async function handleLogout() {
  isLoggingOut.value = true

  try {
    await signOut()
    isOpen.value = false
    await navigateTo('/login')
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="border-b border-white/20 bg-slate-950 text-white">
      <div class="mx-auto flex w-[min(1200px,calc(100%-1rem))] items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em]">
        <p class="truncate text-white/80">Flash season live | Creator kits, launch bundles, and weekend markdowns</p>
        <NuxtLink to="/products" class="shrink-0 text-amber-300 transition hover:text-white">
          Shop the banners
        </NuxtLink>
      </div>
    </div>

    <nav
      :class="[
        'mx-auto mt-4 w-[min(1200px,calc(100%-1rem))] rounded-[30px] border transition-all duration-300',
        isScrolled || isOpen
          ? 'border-white/70 bg-white/95 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.48)] backdrop-blur'
          : 'border-white/50 bg-white/80 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.5)] backdrop-blur'
      ]"
    >
      <div class="flex items-center justify-between gap-4 px-5 py-4">
        <NuxtLink to="/" class="flex items-center gap-3 text-slate-900">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-amber-400 text-sm font-black uppercase text-white shadow-lg">
            VX
          </span>
          <span>
            <span class="block text-lg font-black tracking-tight">Vixel Store</span>
            <span class="block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Launch-ready promos
            </span>
          </span>
        </NuxtLink>

        <div class="hidden items-center gap-2 md:flex">
          <NuxtLink
            to="/"
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-slate-900"
            exact-active-class="bg-orange-100 text-slate-950"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-slate-900"
            active-class="bg-orange-100 text-slate-950"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-slate-900"
            active-class="bg-orange-100 text-slate-950"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-slate-900"
            active-class="bg-orange-100 text-slate-950"
          >
            Contact
          </NuxtLink>
          <NuxtLink
            to="/cart"
            class="relative rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-slate-900"
            active-class="bg-orange-100 text-slate-950"
          >
            Cart
            <span
              v-if="cartCount > 0"
              class="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-1.5 py-0.5 text-[11px] font-semibold text-white"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <div class="ml-2 hidden items-center gap-2 xl:flex">
            <span class="promo-chip">48h launch sprint</span>
            <span class="promo-chip">Sale-ready storefronts</span>
          </div>

          <div v-if="isAuthenticated && user" class="ml-2 hidden items-center gap-3 xl:flex">
            <div class="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-slate-800">
              {{ user.name }}
            </div>
            <button class="btn-secondary px-5 py-2.5" :disabled="isLoggingOut" @click="handleLogout">
              {{ isLoggingOut ? 'Signing Out...' : 'Log Out' }}
            </button>
          </div>

          <template v-else>
            <NuxtLink to="/login" class="btn-secondary ml-2 px-5 py-2.5">
              Log In
            </NuxtLink>
            <NuxtLink to="/register" class="btn-primary px-5 py-2.5">
              Create Account
            </NuxtLink>
          </template>
        </div>

        <button
          class="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 md:hidden"
          @click="isOpen = !isOpen"
        >
          {{ isOpen ? 'Close' : 'Menu' }}
        </button>
      </div>

      <div v-if="isOpen" class="space-y-2 border-t border-orange-100 px-5 py-4 md:hidden">
        <NuxtLink
          to="/"
          class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          exact-active-class="bg-orange-100 text-slate-900"
          @click="isOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          active-class="bg-orange-100 text-slate-900"
          @click="isOpen = false"
        >
          Products
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          active-class="bg-orange-100 text-slate-900"
          @click="isOpen = false"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          active-class="bg-orange-100 text-slate-900"
          @click="isOpen = false"
        >
          Contact
        </NuxtLink>
        <NuxtLink
          to="/cart"
          class="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
          active-class="bg-orange-100 text-slate-900"
          @click="isOpen = false"
        >
          Cart ({{ cartCount }})
        </NuxtLink>

        <div v-if="isAuthenticated && user" class="rounded-3xl border border-orange-100 bg-orange-50 px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Signed in</p>
          <p class="mt-2 text-base font-black text-slate-950">{{ user.name }}</p>
          <p class="mt-1 text-sm text-slate-600">{{ user.email }}</p>
          <button class="btn-secondary mt-4 w-full" :disabled="isLoggingOut" @click="handleLogout">
            {{ isLoggingOut ? 'Signing Out...' : 'Log Out' }}
          </button>
        </div>
        <div v-else class="grid gap-2">
          <NuxtLink to="/login" class="btn-secondary w-full" @click="isOpen = false">
            Log In
          </NuxtLink>
          <NuxtLink to="/register" class="btn-primary w-full" @click="isOpen = false">
            Create Account
          </NuxtLink>
        </div>

        <div class="mt-4 rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 p-[1px]">
          <div class="rounded-[calc(1.5rem-1px)] bg-white px-4 py-4">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Promo Drop</p>
            <p class="mt-2 text-sm font-semibold text-slate-900">Weekend banners are live across best sellers.</p>
            <NuxtLink
              to="/products"
              class="btn-primary mt-4 w-full"
              @click="isOpen = false"
            >
              Browse Event Picks
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
