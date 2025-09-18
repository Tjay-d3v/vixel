<script setup lang="ts">
import { useCart } from '~/composables/useCart'
const { cart, increaseQty, decreaseQty, removeFromCart, subtotal, clearCart } = useCart()
const shipping = 120
const total = computed(() => subtotal.value + shipping)
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.length" class="grid md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-4">
        <div v-for="item in cart" :key="item.id" class="flex items-center justify-between bg-white p-4 rounded shadow">
          <div class="flex items-center gap-4">
            <img :src="item.productImage" alt="" class="w-20 h-20 object-cover rounded" />
            <div>
              <div class="font-semibold">{{ item.productName }}</div>
              <div class="text-gray-600">₱{{ item.sellPrice }}</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center border rounded">
              <button @click="decreaseQty(item.id)" class="px-3 py-1">-</button>
              <div class="px-4">{{ item.qty }}</div>
              <button @click="increaseQty(item.id)" class="px-3 py-1">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="text-red-600">Remove</button>
          </div>
        </div>
      </div>

      <aside class="p-6 bg-white rounded shadow h-fit">
        <div class="mb-4">
          <div class="flex justify-between text-gray-600"><span>Subtotal</span><span>₱{{ subtotal.toFixed(2) }}</span></div>
          <div class="flex justify-between text-gray-600"><span>Shipping</span><span>₱{{ shipping }}</span></div>
          <hr class="my-4" />
          <div class="flex justify-between font-bold text-lg"><span>Total</span><span>₱{{ total.toFixed(2) }}</span></div>
        </div>

        <NuxtLink to="/checkout" class="block bg-blue-600 text-white text-center px-4 py-3 rounded-lg">Proceed to Checkout</NuxtLink>
        <button @click="clearCart" class="mt-3 w-full border rounded px-4 py-2">Clear Cart</button>
      </aside>
    </div>

    <div v-else class="text-center py-20 text-gray-500">
      <p class="mb-4 text-xl">Your cart is empty 🛒</p>
      <NuxtLink to="/products" class="bg-blue-600 text-white px-6 py-3 rounded-lg">Shop Products</NuxtLink>
    </div>
  </section>
</template>
