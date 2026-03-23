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
    addToCart({ id: product.id, productImage: product.productImage, productName: product.productName, sellPrice: product.sellPrice })
    router.push('/cart')
  }
}
</script>

<template>
  <div v-if="product" class="space-y-10">
    <section class="banner-panel overflow-hidden px-8 py-10 md:px-12 md:py-12">
      <div class="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <span class="promo-chip border-white/20 bg-white/10 text-white">Featured drop</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Bundle favorite</span>
          </div>
          <h1 class="mt-5 text-4xl font-black tracking-tight md:text-5xl">{{ product.productName }}</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">{{ product.description }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button @click="add" class="btn-primary">Add to Cart</button>
            <NuxtLink to="/products" class="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">Back to products</NuxtLink>
          </div>
        </div>

        <div class="rounded-[30px] border border-white/10 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Price spotlight</p>
          <p class="mt-3 text-4xl font-black">${{ product.sellPrice.toFixed(2) }}</p>
          <p class="mt-4 text-sm text-white/70">Position this item as a hero product, add-on offer, or event card feature.</p>
        </div>
      </div>
    </section>

    <section class="grid gap-10 md:grid-cols-[1fr_0.9fr]">
      <div class="surface-card p-4">
        <img :src="product.productImage" :alt="product.productName" class="w-full rounded-[24px] object-cover" />
      </div>

      <div class="space-y-6">
        <article class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Campaign notes</p>
          <ul class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <li>Strong lead image for homepage banners and category spotlights.</li>
            <li>Easy to position inside creator picks and limited-time drops.</li>
            <li>High contrast pricing area keeps the CTA visually obvious.</li>
          </ul>
        </article>

        <article class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Commercial angle</p>
          <h2 class="mt-3 text-2xl font-black text-slate-950">Great for promos that need one strong anchor product.</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Use this detail page as a direct destination from hero banners, live-event blocks, or sales grids.
          </p>
        </article>
      </div>
    </section>
  </div>

  <div v-else class="surface-card px-8 py-16 text-center text-slate-500">
    Product not found.
  </div>
</template>
