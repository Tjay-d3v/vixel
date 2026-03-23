<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { cart, increaseQty, decreaseQty, removeFromCart, subtotal, clearCart } = useCart()
const shipping = 12
const total = computed(() => subtotal.value + shipping)
</script>

<template>
  <section class="space-y-12">
    <section class="banner-panel overflow-hidden px-8 py-10 md:px-12 md:py-12">
      <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Cart</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight md:text-5xl">Turn the cart into a stronger bundle moment.</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            The new cart keeps the commercial tone alive with a promotion-first summary, cross-sell energy, and a clearer path to checkout.
          </p>
        </div>
        <div class="rounded-[28px] border border-white/10 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Current offer</p>
          <p class="mt-3 text-2xl font-black">Add one more item and style the basket like a curated event bundle.</p>
        </div>
      </div>
    </section>

    <div v-if="cart.length" class="grid gap-8 md:grid-cols-[1.35fr_0.65fr]">
      <div class="space-y-4">
        <article
          v-for="item in cart"
          :key="item.id"
          class="surface-card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-4">
            <img :src="item.productImage" alt="" class="h-24 w-24 rounded-[22px] object-cover"/>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Bundle candidate</p>
              <div class="mt-2 text-xl font-black text-slate-950">{{ item.productName }}</div>
              <div class="mt-2 text-sm font-semibold text-rose-500">${{ item.sellPrice.toFixed(2) }}</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center rounded-full border border-orange-100 bg-white px-2 py-1">
              <button @click="decreaseQty(item.id)" class="rounded-full px-3 py-1 font-semibold hover:bg-orange-50">-</button>
              <div class="px-4 font-semibold">{{ item.qty }}</div>
              <button @click="increaseQty(item.id)" class="rounded-full px-3 py-1 font-semibold hover:bg-orange-50">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="rounded-full border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">
              Remove
            </button>
          </div>
        </article>
      </div>

      <aside class="space-y-4">
        <section class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Order summary</p>
          <div class="mt-5 space-y-3 text-sm text-slate-600">
            <div class="flex justify-between"><span>Subtotal</span><span class="font-semibold text-slate-900">${{ subtotal.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span>Shipping</span><span class="font-semibold text-slate-900">${{ shipping.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span>Promo styling</span><span class="font-semibold text-emerald-600">Included</span></div>
            <hr class="border-orange-100" />
            <div class="flex justify-between text-lg font-black text-slate-950"><span>Total</span><span>${{ total.toFixed(2) }}</span></div>
          </div>

          <NuxtLink to="/checkout" class="btn-primary mt-6 w-full">Proceed to Checkout</NuxtLink>
          <button @click="clearCart" class="btn-secondary mt-3 w-full">Clear Cart</button>
        </section>

        <section class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Cart headline</p>
          <h2 class="mt-3 text-2xl font-black text-slate-950">This basket is almost a campaign-ready bundle.</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Keep stacking hero-worthy items and bring the same promotional energy into checkout.
          </p>
        </section>
      </aside>
    </div>

    <div v-else class="surface-card px-8 py-16 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Cart empty</p>
      <h2 class="mt-3 text-3xl font-black text-slate-950">No products in the spotlight yet.</h2>
      <p class="mx-auto mt-4 max-w-xl text-slate-600">
        Browse the catalog and start building a stronger promotional mix with products that deserve banner space.
      </p>
      <NuxtLink to="/products" class="btn-primary mt-8">Shop Products</NuxtLink>
    </div>
  </section>
</template>
