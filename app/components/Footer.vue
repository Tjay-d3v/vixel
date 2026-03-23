<template>
  <footer class="mt-20 border-t border-white/60 bg-white/55 backdrop-blur">
    <div class="mx-auto w-full max-w-[1200px] px-4 py-14">
      <section class="banner-panel overflow-hidden px-8 py-10 md:px-10">
        <div class="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.26em] text-orange-200">Campaign Studio</p>
            <h2 class="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Keep the storefront feeling alive with rotating sales, event drops, and hero banners.
            </h2>
            <p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              Vixel is now framed like a promotion-first store: flash offers, creator events, limited bundles, and stronger calls to action.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink to="/products" class="btn-primary">See Live Offers</NuxtLink>
              <NuxtLink to="/contact" class="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
                Book a Launch Theme
              </NuxtLink>
            </div>
          </div>

          <div class="grid gap-3 text-sm">
            <div class="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Weekend Event</p>
              <p class="mt-2 text-lg font-bold">Buy 2 bundles, unlock bonus promo tiles.</p>
            </div>
            <div class="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Live Banner Slots</p>
              <p class="mt-2 text-lg font-bold">Hero sale ribbon, launch countdown, and featured creator card.</p>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-10 grid gap-10 md:grid-cols-[1.2fr,0.8fr,0.8fr]">
        <div>
          <h3 class="text-2xl font-black tracking-tight text-slate-950">Vixel Store</h3>
          <p class="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            A warmer, louder storefront direction built to showcase products, seasonal promos, and event-style campaigns without losing clarity.
          </p>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Explore</h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li><NuxtLink to="/products" class="text-slate-700 transition hover:text-slate-950">Product festival</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-slate-700 transition hover:text-slate-950">Brand story</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-slate-700 transition hover:text-slate-950">Ad bookings</NuxtLink></li>
            <li><NuxtLink to="/cart" class="text-slate-700 transition hover:text-slate-950">Cart and bundles</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</h4>
          <p class="mt-4 text-sm text-slate-700">support@myporfolio.com</p>
          <p class="mt-2 text-sm text-slate-700">
            Email:
            <a href="mailto:lozadatimothyjohn@gmail.com" class="text-slate-900 underline-offset-2 hover:underline">
              lozadatimothyjohn@gmail.com
            </a>
          </p>
          <p class="mt-2 text-sm text-slate-700">+63 966 6641 499</p>
          <p class="mt-5 text-xs tracking-[0.22em] text-slate-500">
            &copy; {{ new Date().getFullYear() }} Vixel Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
