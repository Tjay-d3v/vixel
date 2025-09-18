<script setup lang="ts">
import { useCart } from '~/composables/useCart'
const props = defineProps<{ product: { id:number; productName:string; productImage:string; sellPrice:number; description?:string } }>()
const { addToCart } = useCart()

function add() {
  addToCart({ id: props.product.id, productName: props.product.productName, sellPrice: props.product.sellPrice, productImage: props.product.productImage })
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col">
    <img :src="product.productImage" :alt="product.productName" class="w-full h-44 object-cover rounded mb-4" />
    <h3 class="font-semibold text-lg mb-1 line-clamp-2">{{ product.productName }}</h3>
    <p class="text-blue-600 font-bold text-lg mb-3">₱{{ product.sellPrice }}</p>
    <p class="text-sm text-gray-500 flex-grow line-clamp-2">{{ product.description || '' }}</p>
    <div class="mt-4 flex gap-2">
      <NuxtLink :to="`/products/${product.id}`" class="flex-1 text-center px-3 py-2 border rounded-lg hover:bg-gray-50">View</NuxtLink>
      <button @click="add" class="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">Add</button>
    </div>
  </div>
</template>
