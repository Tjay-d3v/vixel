<template>
  <section class="banner-panel overflow-hidden px-6 py-14 md:px-12">
    <div class="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.26em] text-orange-200">Event-ready storefronts</p>
        <h2 class="mt-4 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          Turn a regular catalog into a campaign with launch banners, sales cards, and conversion-first storytelling.
        </h2>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
          The refreshed Vixel direction leans into advertising energy: bright calls to action, promo clusters, creator moments, and shoppable event sections.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink to="/signup" class="btn-primary">Create an Account</NuxtLink>
          <NuxtLink to="/products" class="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
            Explore Products
          </NuxtLink>
        </div>
      </div>

      <div class="grid gap-3 text-sm">
        <article class="rounded-[26px] border border-white/15 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Launch Week</p>
          <p class="mt-2 text-2xl font-black">35% off spotlight accessories</p>
        </article>
        <article class="rounded-[26px] border border-white/15 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Creator Event</p>
          <p class="mt-2 text-lg font-bold">Friday livestream picks with bonus bundle discounts.</p>
        </article>
        <article class="rounded-[26px] border border-white/15 bg-white/10 p-5">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Store Promo Slots</p>
          <p class="mt-2 text-lg font-bold">Hero banner, urgency strip, mini ad tower, and featured deal row.</p>
        </article>
      </div>
    </div>
  </section>
</template>
