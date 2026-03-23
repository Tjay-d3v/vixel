<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  show: boolean
  product: {
    id: number
    name: string
    price: number
    description: string
    images: string[]
    qty: number
  }
}>()

const emit = defineEmits(['close'])
const { addToCart } = useCart()
const { isAuthenticated, requireAuth } = useAuth()
const route = useRoute()

const qty = ref(1)
const currentImage = ref(0)

watch(() => props.show, (val) => {
  if (val) {
    qty.value = 1
    currentImage.value = 0
  }
})

function prevImage() {
  currentImage.value = currentImage.value > 0 ? currentImage.value - 1 : props.product.images.length - 1
}

function nextImage() {
  currentImage.value = currentImage.value < props.product.images.length - 1 ? currentImage.value + 1 : 0
}

function increaseQty() {
  qty.value++
}

function decreaseQty() {
  if (qty.value > 1) qty.value--
}

async function handleAddToCart() {
  const image = props.product.images[currentImage.value] ?? props.product.images[0] ?? ''
  const allowed = await requireAuth({
    redirectTo: route.fullPath,
    pendingCartItem: {
      id: props.product.id,
      image,
      name: props.product.name,
      price: props.product.price,
      quantity: qty.value,
    },
  })

  if (!allowed) {
    emit('close')
    return
  }

  for (let i = 0; i < qty.value; i++) {
    addToCart({
      id: props.product.id,
      image,
      name: props.product.name,
      price: props.product.price,
    })
  }

  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div class="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.9)]">
        <button @click="emit('close')" class="absolute right-5 top-4 z-10 text-3xl font-bold text-slate-400 transition hover:text-slate-800">&times;</button>

        <div class="md:flex">
          <div class="relative md:w-1/2">
            <div class="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
              <span class="promo-chip border-white/20 bg-white/20 text-white">Flash pick</span>
              <span class="promo-chip border-white/20 bg-white/20 text-white">Event bundle</span>
            </div>
            <div class="bg-gradient-to-br from-orange-100 via-white to-rose-100 p-4">
              <img :src="props.product.images[currentImage]" alt="" class="h-96 w-full rounded-[26px] object-cover" />
              <button @click="prevImage" class="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white">&lt;</button>
              <button @click="nextImage" class="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow hover:bg-white">&gt;</button>
            </div>
          </div>

          <div class="flex flex-col p-6 md:w-1/2 md:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Campaign product</p>
            <h2 class="mt-2 text-3xl font-black text-slate-950">{{ props.product.name }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600">{{ props.product.description }}</p>
            <p class="mt-5 text-2xl font-black text-rose-500">${{ (props.product.price * qty).toFixed(2) }}</p>

            <div class="mt-5 rounded-[24px] bg-orange-50 p-4 text-sm text-slate-700">
              <p class="font-semibold text-slate-900">Bundle hook</p>
              <p class="mt-2">Add this item now and pair it with a creator favorite to build a higher-value cart.</p>
            </div>

            <div class="mt-5 flex items-center gap-2">
              <button @click="decreaseQty" class="rounded-full border border-orange-200 px-4 py-2 font-semibold hover:bg-orange-50">-</button>
              <span class="rounded-full border border-orange-100 px-5 py-2 font-semibold">{{ qty }}</span>
              <button @click="increaseQty" class="rounded-full border border-orange-200 px-4 py-2 font-semibold hover:bg-orange-50">+</button>
            </div>

            <div class="mt-5 flex gap-2 overflow-x-auto">
              <img
                v-for="(img, index) in props.product.images"
                :key="index"
                :src="img"
                :class="{ 'border-2 border-orange-500': index === currentImage }"
                class="h-16 w-16 cursor-pointer rounded-2xl object-cover"
                @click="currentImage = index"
              />
            </div>

            <div class="mt-auto flex gap-4 pt-8">
              <button @click="handleAddToCart" class="btn-primary flex-1">
                {{ isAuthenticated ? 'Add to Cart' : 'Log In to Add' }}
              </button>
              <button @click="emit('close')" class="btn-secondary flex-1">
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
