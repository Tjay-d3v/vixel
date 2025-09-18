<script setup lang="ts">
import { ref } from 'vue'
import AddToCartModal from '~/components/AddToCartModal.vue'

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 39.99,
    description: 'High-quality wireless earbuds with noise cancellation.',
    images: [
      'https://images.unsplash.com/photo-1580894732444-8ecded36c1f0',
      'https://images.unsplash.com/photo-1580894732444-1',
      'https://images.unsplash.com/photo-1580894732444-2',
      'https://images.unsplash.com/photo-1580894732444-3',
      'https://images.unsplash.com/photo-1580894732444-4'
    ]
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 59.99,
    description: 'Stylish smart watch with fitness tracking and notifications.',
    images: [
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d',
      'https://images.unsplash.com/photo-1517430816045-1',
      'https://images.unsplash.com/photo-1517430816045-2',
      'https://images.unsplash.com/photo-1517430816045-3',
      'https://images.unsplash.com/photo-1517430816045-4'
    ]
  }
  // Add the rest similarly
]

const showModal = ref(false)
const selectedProduct = ref(products[0])

function openModal(product: typeof products[0]) {
  selectedProduct.value = product
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <section class="container mx-auto py-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <div v-for="product in products" :key="product.id" class="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col">
      <img :src="product.images[0]" :alt="product.name" class="h-56 w-full object-cover"/>
      <div class="p-4 flex flex-col flex-1">
        <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
        <p class="text-indigo-600 font-bold mb-4">${{ product.price }}</p>
        <button @click="openModal(product)" class="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  </section>

  <AddToCartModal :show="showModal" :product="selectedProduct" @close="closeModal"/>
</template>
