<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { products } from '~/data/products'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const product = products.find(p => p.id === id) || null
const { addToCart } = useCart()

function add() {
  if (product) {
    addToCart({ id: product.id, productName: product.productName, sellPrice: product.sellPrice, productImage: product.productImage })
    router.push('/cart')
  }
}
</script>

<template>
  <div v-if="product" class="grid md:grid-cols-2 gap-10">
    <div>
      <img :src="product.productImage" :alt="product.productName" class="rounded-lg shadow" />
    </div>

    <div>
      <h1 class="text-3xl font-bold mb-2">{{ product.productName }}</h1>
      <p class="text-2xl font-extrabold text-blue-600 mb-4">₱{{ product.sellPrice }}</p>
      <p class="text-gray-700 mb-6">{{ product.description }}</p>

      <div class="flex items-center gap-4">
        <button @click="add" class="bg-green-600 text-white px-6 py-3 rounded-lg">Add to Cart</button>
        <NuxtLink to="/products" class="text-gray-600">Back to products</NuxtLink>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 py-20">
    Product not found.
  </div>
</template>
