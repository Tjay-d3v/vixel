<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCart } from '~/composables/useCart'

// Props
const props = defineProps<{
  show: boolean
  product: {
    id: number
    name: string
    price: number
    description: string
    images: string[]
  }
}>()

const emit = defineEmits(['close'])

// Cart composable
const { addToCart } = useCart()

// Reactive state
const qty = ref(1)
const currentImage = ref(0)

// Reset qty and carousel when modal opens
watch(() => props.show, (val) => {
  if (val) {
    qty.value = 1
    currentImage.value = 0
  }
})

// Carousel
function prevImage() {
  currentImage.value = currentImage.value > 0 ? currentImage.value - 1 : props.product.images.length - 1
}
function nextImage() {
  currentImage.value = currentImage.value < props.product.images.length - 1 ? currentImage.value + 1 : 0
}

// Quantity
function increaseQty() { qty.value++ }
function decreaseQty() { if (qty.value > 1) qty.value-- }

// Add to cart
function handleAddToCart() {
  addToCart({ ...props.product, qty: qty.value })
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden relative">
        <!-- Close button -->
        <button @click="emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>

        <div class="md:flex">
          <!-- Carousel -->
          <div class="md:w-1/2 bg-gray-50 flex items-center justify-center relative p-4">
            <img :src="props.product.images[currentImage]" alt="" class="w-full h-96 object-cover rounded-xl"/>
            <button @click="prevImage" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100">&lt;</button>
            <button @click="nextImage" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100">&gt;</button>
          </div>

          <!-- Product Info -->
          <div class="md:w-1/2 p-6 flex flex-col">
            <h2 class="text-2xl font-bold mb-2">{{ props.product.name }}</h2>
            <p class="text-gray-600 mb-4">{{ props.product.description }}</p>
            <p class="text-indigo-600 font-bold text-xl mb-4">₱{{ (props.product.price * qty).toFixed(2) }}</p>

            <!-- Quantity selector -->
            <div class="flex items-center gap-2 mb-4">
              <button @click="decreaseQty" class="px-3 py-1 border rounded hover:bg-gray-100">-</button>
              <span class="px-4 py-1 border rounded">{{ qty }}</span>
              <button @click="increaseQty" class="px-3 py-1 border rounded hover:bg-gray-100">+</button>
            </div>



            <!-- Carousel Thumbnails -->
            <div class="flex gap-2 mt-4 overflow-x-auto">
              <img
                v-for="(img, index) in props.product.images"
                :key="index"
                :src="img"
                :class="{'border-2 border-indigo-600': index === currentImage}"
                class="w-16 h-16 object-cover rounded cursor-pointer"
                @click="currentImage = index"
              />
            </div>


            <!-- Buttons -->
            <div class="flex gap-4 mt-auto">
              <button @click="handleAddToCart" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Add to Cart
              </button>
              <button @click="emit('close')" class="flex-1 border rounded-lg py-3 font-semibold hover:bg-gray-100 transition">
                Continue Shopping
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
