<script setup lang="ts">
</script>

<template>
  <section class="surface-card p-8 md:p-10">
    <div class="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Account-ready shopping</p>
        <h2 class="mt-3 text-3xl font-black text-slate-950">Create an account before you start building the cart.</h2>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
          The storefront now protects cart actions behind a real login flow, so shopper sessions feel more like a working eCommerce build than a static demo.
        </p>
      </div>

      <div class="flex flex-wrap gap-3 md:justify-end">
        <NuxtLink to="/register" class="btn-primary">Create an Account</NuxtLink>
        <NuxtLink to="/login" class="btn-secondary">Log In</NuxtLink>
      </div>
    </div>
  </section>
</template>
