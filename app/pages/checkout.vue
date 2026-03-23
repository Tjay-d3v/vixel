<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useCart } from '~/composables/useCart'
import { useStripePayment } from '~/composables/useStripePayment'

const { cart, subtotal, clearCart } = useCart()
const {
  destroy,
  errorMessage,
  initialize,
  isInitializing,
  isProcessing,
  pay,
  successMessage,
} = useStripePayment()

const name = ref('')
const email = ref('')
const validationMessage = ref('')
const orderReference = ref('')

const totalInCents = computed(() => Math.round(subtotal.value * 100))

onMounted(async () => {
  await initialize()
})

onBeforeUnmount(() => {
  destroy()
})

const handlePayment = async () => {
  validationMessage.value = ''
  orderReference.value = ''

  if (!cart.value.length) {
    validationMessage.value = 'Your cart is empty.'
    return
  }

  if (!name.value.trim() || !email.value.trim()) {
    validationMessage.value = 'Name and email are required.'
    return
  }

  const isSuccessful = await pay({
    amount: totalInCents.value,
    billingDetails: {
      email: email.value.trim(),
      name: name.value.trim(),
    },
  })

  if (!isSuccessful) {
    return
  }

  orderReference.value = `TEST-${Date.now()}`
  clearCart()
}
</script>

<template>
  <section class="space-y-12">
    <section class="banner-panel overflow-hidden px-8 py-10 md:px-12 md:py-12">
      <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <span class="promo-chip border-white/20 bg-white/10 text-white">Stripe test mode</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Event checkout</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Promo-ready order flow</span>
          </div>
          <h1 class="mt-5 text-4xl font-black tracking-tight md:text-5xl">Checkout should feel like the final ad panel, not a boring form.</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            The payment flow stays functional, but the surrounding presentation now keeps the promotional energy alive all the way to conversion.
          </p>
        </div>
        <div class="rounded-[28px] border border-white/10 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Stripe test card</p>
          <p class="mt-3 text-2xl font-black">4242 4242 4242 4242</p>
          <p class="mt-3 text-sm text-white/70">Use any future expiry, any CVC, and any ZIP code.</p>
        </div>
      </div>
    </section>

    <div class="grid gap-8 md:grid-cols-[1.35fr_0.65fr]">
      <form
        class="surface-card space-y-5 p-6 md:p-8"
        @submit.prevent="handlePayment"
      >
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Customer details</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Finish the promo journey</h2>
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700" for="name">Full name</label>
          <input
            id="name"
            v-model="name"
            autocomplete="name"
            class="input-field"
            placeholder="Jenny Rosen"
            required
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            autocomplete="email"
            class="input-field"
            placeholder="jenny@example.com"
            required
            type="email"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">Card details</label>
          <div
            id="card-element"
            class="rounded-[24px] border border-orange-100 bg-white px-4 py-4"
          />
          <p v-if="isInitializing" class="mt-2 text-sm text-slate-500">Loading payment form...</p>
        </div>

        <p v-if="validationMessage" class="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {{ validationMessage }}
        </p>
        <p v-if="errorMessage" class="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ errorMessage }}
        </p>
        <div v-if="successMessage" class="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <p>{{ successMessage }}</p>
          <p v-if="orderReference" class="mt-1 font-medium">Order reference: {{ orderReference }}</p>
        </div>

        <button
          class="btn-primary w-full"
          :disabled="isInitializing || isProcessing || !cart.length"
          type="submit"
        >
          {{ isProcessing ? 'Processing payment...' : `Pay Now ($${subtotal.toFixed(2)})` }}
        </button>
      </form>

      <aside class="space-y-4">
        <section class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Order summary</p>
          <p v-if="!cart.length" class="mt-4 text-sm text-slate-500">Your cart is currently empty.</p>

          <div v-else class="mt-4 space-y-3">
            <div
              v-for="item in cart"
              :key="item.id"
              class="flex items-start justify-between gap-4 border-b border-orange-100 pb-3 text-sm text-slate-700"
            >
              <div>
                <p class="font-semibold text-slate-950">{{ item.productName }}</p>
                <p>Qty {{ item.qty }}</p>
              </div>
              <p class="font-semibold text-slate-950">${{ (item.sellPrice * item.qty).toFixed(2) }}</p>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-orange-100 pt-4 text-base font-black text-slate-950">
            <span>Total</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
        </section>

        <section class="surface-card p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Checkout message</p>
          <h2 class="mt-3 text-2xl font-black text-slate-950">Keep the customer in the story all the way to purchase.</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            The redesigned checkout stays calm enough to convert while still feeling connected to the banners and campaign language across the site.
          </p>
        </section>
      </aside>
    </div>
  </section>
</template>
