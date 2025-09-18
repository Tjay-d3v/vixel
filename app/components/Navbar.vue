<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { cart } = useCart()
const cartCount = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))

const isOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
      isScrolled ? 'bg-white shadow' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-2xl font-extrabold text-blue-600">Vixel</span>
        <span class="text-sm font-medium text-gray-600">Store</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <!-- Home Icon -->
        <NuxtLink to="/" class="nav-link flex items-center gap-1">
          🏠 <span>Home</span>
        </NuxtLink>

        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>

        <!-- Cart -->
        <NuxtLink to="/cart" class="relative nav-link">
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>

        <!-- Auth -->
        <NuxtLink to="/login" class="btn-primary">Login</NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button class="md:hidden text-2xl" @click="isOpen = !isOpen">☰</button>
    </div>

    <!-- Mobile dropdown -->
    <div v-if="isOpen" class="md:hidden bg-white border-t shadow">
      <div class="flex flex-col px-4 py-4 gap-3">
        <NuxtLink to="/" class="nav-link flex items-center gap-1">
          🏠 <span>Home</span>
        </NuxtLink>
        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        <NuxtLink to="/cart" class="nav-link">Cart ({{ cartCount }})</NuxtLink>
        <NuxtLink to="/login" class="btn-primary text-center">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600 transition font-medium;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition;
}
</style>
