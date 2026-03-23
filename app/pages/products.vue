<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AddToCartModal from '~/components/AddToCartModal.vue'

type Category = 'Electronics' | 'Accessories' | 'Home & Living' | 'Office Setup' | 'Fitness'
type SortOption = 'default' | 'price-asc' | 'price-desc'

type Product = {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  category: Category
}

type RawProduct = Omit<Product, 'id' | 'images'> & {
  seed: string
}

const categories: Category[] = ['Electronics', 'Accessories', 'Home & Living', 'Office Setup', 'Fitness']

function createProductImages(seed: string): string[] {
  return Array.from({ length: 5 }, (_, index) => `https://picsum.photos/seed/${seed}-${index + 1}/800/600`)
}

const rawProducts: RawProduct[] = [
  { category: 'Electronics', name: 'Wireless Earbuds Pro', price: 49.99, description: 'Crystal-clear sound with active noise cancellation.', seed: 'electronics-earbuds-pro' },
  { category: 'Electronics', name: 'Smart Watch X2', price: 79.99, description: 'Track workouts, heart rate, and daily notifications.', seed: 'electronics-smartwatch-x2' },
  { category: 'Electronics', name: '4K Action Camera', price: 119.99, description: 'Capture smooth and sharp outdoor videos in 4K.', seed: 'electronics-action-camera' },
  { category: 'Electronics', name: 'Mini Projector', price: 139.99, description: 'Portable projector for movie nights and presentations.', seed: 'electronics-mini-projector' },
  { category: 'Electronics', name: 'Noise Cancelling Headphones', price: 99.99, description: 'Over-ear comfort with immersive premium audio.', seed: 'electronics-headphones' },
  { category: 'Electronics', name: 'Portable Bluetooth Speaker', price: 45.5, description: 'Compact speaker with deep bass and long battery life.', seed: 'electronics-speaker' },
  { category: 'Accessories', name: 'Mechanical Keyboard', price: 74.99, description: 'RGB keyboard with tactile keys and durable build.', seed: 'accessories-keyboard' },
  { category: 'Accessories', name: 'Gaming Mouse', price: 29.99, description: 'Precision tracking with adjustable DPI levels.', seed: 'accessories-mouse' },
  { category: 'Accessories', name: 'USB-C Hub', price: 34.99, description: 'Expand connectivity with HDMI, USB, and card slots.', seed: 'accessories-usb-hub' },
  { category: 'Accessories', name: 'Laptop Stand', price: 24.5, description: 'Aluminum stand for ergonomic viewing angles.', seed: 'accessories-laptop-stand' },
  { category: 'Accessories', name: 'Tablet Stylus Pen', price: 22.99, description: 'Responsive stylus for sketching and note-taking.', seed: 'accessories-stylus' },
  { category: 'Accessories', name: 'MagSafe Phone Mount', price: 18.99, description: 'Magnetic dashboard mount with secure grip.', seed: 'accessories-phone-mount' },
  { category: 'Home & Living', name: 'Air Purifier', price: 129.0, description: 'HEPA purifier for cleaner air in your room.', seed: 'home-air-purifier' },
  { category: 'Home & Living', name: 'Robot Vacuum', price: 179.99, description: 'Smart cleaning with auto-charge and app control.', seed: 'home-robot-vacuum' },
  { category: 'Home & Living', name: 'Electric Kettle', price: 31.49, description: 'Fast boiling with auto shut-off protection.', seed: 'home-electric-kettle' },
  { category: 'Home & Living', name: 'Smart Home Camera', price: 64.99, description: '1080p security with motion alerts and night vision.', seed: 'home-smart-camera' },
  { category: 'Home & Living', name: 'Aroma Diffuser', price: 26.75, description: 'Ultrasonic diffuser with soft ambient lighting.', seed: 'home-aroma-diffuser' },
  { category: 'Home & Living', name: 'LED Floor Lamp', price: 58.25, description: 'Minimalist floor lamp with adjustable brightness.', seed: 'home-floor-lamp' },
  { category: 'Office Setup', name: 'Ergonomic Office Chair', price: 149.99, description: 'Mesh chair with lumbar support and adjustable height.', seed: 'office-chair' },
  { category: 'Office Setup', name: 'External SSD 1TB', price: 99.99, description: 'Portable high-speed storage for work and backup.', seed: 'office-ssd' },
  { category: 'Office Setup', name: 'LED Desk Lamp', price: 27.75, description: 'Eye-friendly lighting with touch dimmer.', seed: 'office-desk-lamp' },
  { category: 'Office Setup', name: 'Monitor Light Bar', price: 39.95, description: 'Space-saving monitor lamp with anti-glare design.', seed: 'office-monitor-light-bar' },
  { category: 'Office Setup', name: 'Webcam 1080p', price: 46.99, description: 'Sharp video quality for meetings and streaming.', seed: 'office-webcam' },
  { category: 'Office Setup', name: 'Desk Organizer Set', price: 21.99, description: 'Keep your essentials neat and easy to access.', seed: 'office-desk-organizer' },
  { category: 'Fitness', name: 'Fitness Resistance Bands', price: 19.99, description: 'Set of 5 bands for strength and mobility training.', seed: 'fitness-resistance-bands' },
  { category: 'Fitness', name: 'Smart Jump Rope', price: 28.99, description: 'Tracks jumps, calories, and workout duration.', seed: 'fitness-jump-rope' },
  { category: 'Fitness', name: 'Yoga Mat Pro', price: 32.5, description: 'Non-slip mat with extra cushioning and grip.', seed: 'fitness-yoga-mat' },
  { category: 'Fitness', name: 'Adjustable Dumbbells', price: 159.99, description: 'Space-saving weights for home training.', seed: 'fitness-dumbbells' },
  { category: 'Fitness', name: 'Massage Gun Mini', price: 69.99, description: 'Compact muscle recovery tool with multiple speeds.', seed: 'fitness-massage-gun' },
  { category: 'Fitness', name: 'Hydration Tracker Bottle', price: 17.5, description: 'Smart bottle reminders to stay hydrated all day.', seed: 'fitness-bottle' }
]

const products: Product[] = rawProducts.map(({ seed, ...product }, index) => ({
  ...product,
  id: index + 1,
  images: createProductImages(seed)
}))

const selectedCategory = ref<Category | 'All'>('All')
const searchQuery = ref('')
const sortBy = ref<SortOption>('default')

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  let result = products.filter((product) => {
    const categoryMatch = selectedCategory.value === 'All' || product.category === selectedCategory.value
    const queryMatch = !query
      || product.name.toLowerCase().includes(query)
      || product.description.toLowerCase().includes(query)

    return categoryMatch && queryMatch
  })

  if (sortBy.value === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
})

const PRODUCTS_BATCH_SIZE = 8
const visibleCount = ref(PRODUCTS_BATCH_SIZE)
const isLoadingMore = ref(false)
const loadMoreTrigger = ref<HTMLElement | null>(null)
let infiniteScrollObserver: IntersectionObserver | null = null

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))
const hasMoreProducts = computed(() => visibleCount.value < filteredProducts.value.length)

function loadMoreProducts() {
  if (!hasMoreProducts.value || isLoadingMore.value) return

  isLoadingMore.value = true

  setTimeout(() => {
    visibleCount.value = Math.min(visibleCount.value + PRODUCTS_BATCH_SIZE, filteredProducts.value.length)
    isLoadingMore.value = false
  }, 180)
}

function setupInfiniteScrollObserver() {
  if (infiniteScrollObserver) {
    infiniteScrollObserver.disconnect()
    infiniteScrollObserver = null
  }

  if (!loadMoreTrigger.value) return

  infiniteScrollObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) loadMoreProducts()
    },
    { root: null, rootMargin: '200px 0px', threshold: 0 },
  )

  infiniteScrollObserver.observe(loadMoreTrigger.value)
}

watch(filteredProducts, async () => {
  visibleCount.value = PRODUCTS_BATCH_SIZE
  await nextTick()
  setupInfiniteScrollObserver()
})

watch(loadMoreTrigger, () => {
  setupInfiniteScrollObserver()
})

onMounted(() => {
  setupInfiniteScrollObserver()
})

onBeforeUnmount(() => {
  infiniteScrollObserver?.disconnect()
})

const showModal = ref(false)
const selectedProduct = ref<(Product & { qty: number }) | null>(null)

function openModal(product: Product) {
  selectedProduct.value = { ...product, qty: 1 }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="space-y-16">
    <section class="banner-panel overflow-hidden px-8 py-12 md:px-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <span class="promo-chip border-white/20 bg-white/10 text-white">Live catalog festival</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Spotlight banners</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Creator bundle picks</span>
          </div>
          <p class="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Products</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Browse products staged like a campaign, with event hooks and sale-ready presentation.
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Explore the catalog through featured launches, promotional groupings, and bolder product cards built to push attention toward the next click.
          </p>
        </div>

        <div class="grid gap-4">
          <article class="rounded-[28px] border border-white/10 bg-white/10 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">This weekend</p>
            <p class="mt-3 text-2xl font-black">Top tech, desk upgrades, and bundle-ready accessories</p>
          </article>
          <div class="grid gap-4 sm:grid-cols-2">
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Promo angle</p>
              <p class="mt-2 text-lg font-bold">Up to 35% off spotlight gear</p>
            </article>
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Energy</p>
              <p class="mt-2 text-lg font-bold">Warm, visual, and event-focused</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-5 md:grid-cols-3">
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Launch Banner</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">New arrivals get the hero slot first</h2>
      </article>
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">Creator Picks</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">Curate themed product groups that feel like events</h2>
      </article>
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">Sale Rhythm</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">Use promos, not just filters, to guide attention</h2>
      </article>
    </section>

    <section class="surface-card p-5 md:p-6">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="md:col-span-2">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Filter the campaign</p>
          <ul class="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <button
                type="button"
                class="rounded-full border px-4 py-2 font-semibold transition"
                :class="selectedCategory === 'All'
                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                  : 'border-orange-100 bg-white text-slate-700 hover:border-orange-300 hover:text-slate-950'"
                @click="selectedCategory = 'All'"
              >
                All
              </button>
            </li>

            <li v-for="category in categories" :key="category">
              <button
                type="button"
                class="rounded-full border px-4 py-2 font-semibold transition"
                :class="selectedCategory === category
                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                  : 'border-orange-100 bg-white text-slate-700 hover:border-orange-300 hover:text-slate-950'"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <label for="search-filter" class="mb-2 block text-sm font-semibold text-slate-700">Search the lineup</label>
          <input
            id="search-filter"
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or description"
            class="input-field"
          />
        </div>

        <div>
          <label for="sort-filter" class="mb-2 block text-sm font-semibold text-slate-700">Sort by price</label>
          <select
            id="sort-filter"
            v-model="sortBy"
            class="input-field"
          >
            <option value="default">Default</option>
            <option value="price-asc">Low to High</option>
            <option value="price-desc">High to Low</option>
          </select>
        </div>
      </div>
    </section>

    <section class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="product in visibleProducts"
        :key="product.id"
        class="surface-card group overflow-hidden"
      >
        <div class="relative overflow-hidden">
          <img :src="product.images[0]" :alt="product.name" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-800">
              {{ product.category }}
            </span>
            <span class="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              Sale ready
            </span>
          </div>
        </div>

        <div class="flex h-full flex-col p-5">
          <h2 class="text-xl font-black text-slate-950">{{ product.name }}</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">{{ product.description }}</p>
          <div class="mt-5 flex items-center justify-between">
            <p class="text-2xl font-black text-rose-500">${{ product.price.toFixed(2) }}</p>
            <span class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Event pick</span>
          </div>

          <button @click="openModal(product)" class="btn-primary mt-6 w-full">
            Add to Cart
          </button>
        </div>
      </article>
    </section>

    <div v-if="hasMoreProducts" ref="loadMoreTrigger" class="flex justify-center py-2">
      <p class="rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-slate-500">
        {{ isLoadingMore ? 'Loading more products...' : 'Scroll to load more products' }}
      </p>
    </div>

    <p
      v-else-if="filteredProducts.length > 0"
      class="surface-card p-4 text-center text-sm text-slate-500"
    >
      You have reached the end of the product festival.
    </p>

    <p v-if="filteredProducts.length === 0" class="surface-card p-6 text-center text-sm text-slate-500">
      No products matched the current filters.
    </p>

    <AddToCartModal
      v-if="selectedProduct"
      :show="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>
