<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { ref } from 'vue'
const { cart, subtotal, clearCart } = useCart()

const name = ref('')
const email = ref('')
const address = ref('')
const city = ref('')
const postal = ref('')

function placeOrder() {
  if (!name.value || !email.value || !address.value) {
    alert('Please fill required fields')
    return
  }
  // For now: simple simulate order placed
  alert(`Order placed! Total: ₱${(subtotal.value).toFixed(2)}. We'll process via CJ API next.`)
  clearCart()
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <form @submit.prevent="placeOrder" class="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label class="block text-sm font-medium">Full name</label>
          <input v-model="name" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="email" type="email" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium">Address</label>
          <input v-model="address" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <input v-model="city" placeholder="City" class="border px-3 py-2 rounded" />
          <input v-model="postal" placeholder="Postal code" class="border px-3 py-2 rounded" />
        </div>

        <button type="submit" class="bg-green-600 text-white px-6 py-3 rounded-lg">Place Order</button>
      </form>

      <aside class="bg-white p-6 rounded shadow h-fit">
        <h2 class="font-semibold mb-4">Order Summary</h2>
        <div v-for="item in cart" :key="item.id" class="flex justify-between mb-2">
          <span>{{ item.productName }} x{{ item.qty }}</span>
          <span>₱{{ (item.sellPrice * item.qty).toFixed(2) }}</span>
        </div>
        <hr class="my-3" />
        <div class="flex justify-between font-bold">Total <span>₱{{ subtotal.toFixed(2) }}</span></div>
      </aside>
    </div>
  </section>
</template>
