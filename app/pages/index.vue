<template>
  <section class="space-y-24">
    <section class="banner-panel overflow-hidden px-8 py-10 md:px-12 md:py-14">
      <div class="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <span class="promo-chip border-white/20 bg-white/10 text-white">Flash season</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Launch banners live</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Creator event weekend</span>
          </div>

          <p class="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-orange-200">
            Modern commerce, louder presentation
          </p>
          <h1 class="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Make every product feel like a headline with banners, promos, and event-driven storytelling.
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Vixel Store is now framed like a living campaign: spotlight offers, rotating events, stronger conversion moments, and a warmer storefront energy from top to bottom.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/products" class="btn-primary">Browse Hot Drops</NuxtLink>
            <NuxtLink to="/about" class="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
              See the Story
            </NuxtLink>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Bundles</p>
              <p class="mt-2 text-2xl font-black">18</p>
            </div>
            <div class="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Sale blocks</p>
              <p class="mt-2 text-2xl font-black">09</p>
            </div>
            <div class="rounded-[24px] border border-white/10 bg-white/10 p-4">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Event slots</p>
              <p class="mt-2 text-2xl font-black">04</p>
            </div>
          </div>
        </div>

        <div class="grid gap-4">
          <article class="rounded-[30px] border border-white/15 bg-white/10 p-5">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
              alt="Featured product campaign"
              class="h-64 w-full rounded-[24px] object-cover"
            />
            <div class="mt-4 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Hero campaign</p>
                <p class="mt-2 text-xl font-black">Weekend drop ready</p>
              </div>
              <span class="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">35% off focus</span>
            </div>
          </article>

          <div class="grid gap-4 sm:grid-cols-2">
            <article class="rounded-[26px] border border-white/15 bg-white/10 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Live event</p>
              <p class="mt-3 text-xl font-black">Creator picks on Friday</p>
            </article>
            <article class="rounded-[26px] border border-white/15 bg-white/10 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Spotlight</p>
              <p class="mt-3 text-xl font-black">Bundle the best sellers</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-5 md:grid-cols-3">
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Launch Week Banner</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">Up to 35% off creator tech picks</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">Run the store like a campaign, not a catalog. Lead with urgency and visual hooks.</p>
      </article>
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">Live Event Block</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">Saturday sale stream with accessory bundles</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">Show upcoming events directly in the layout so every visit feels current.</p>
      </article>
      <article class="surface-card p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">Storefront Hook</p>
        <h2 class="mt-3 text-2xl font-black text-slate-950">Bolder promos, softer UX, faster buying moments</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">The site now leans into ad-style messaging while keeping the shopping path readable.</p>
      </article>
    </section>

    <section>
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">Why the new Vixel vibe converts better</h2>
        <p class="section-subtitle mx-auto">
          Cleaner structure still matters, but campaign energy does more work when you need products, launches, and events to feel active.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">01</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">Hero banners that sell</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Product pages feel more alive when each collection is introduced like a feature, not a list.
          </p>
        </article>
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">02</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">Events that stay visible</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Launch weeks, creator streams, and seasonal sales now have room to stay in front of the shopper.
          </p>
        </article>
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">03</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">Promos without clutter</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            The palette and spacing push harder visually while keeping the browsing flow easy to understand.
          </p>
        </article>
      </div>
    </section>

    <section>
      <div class="mb-10 flex items-end justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Featured ad picks</p>
          <h2 class="section-title mt-3">Products with banner energy built in</h2>
          <p class="section-subtitle">Use these as hero products, event leads, or bundle anchors.</p>
        </div>
        <NuxtLink to="/products" class="btn-secondary hidden sm:inline-flex">View all campaigns</NuxtLink>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="product in featuredProducts"
          :key="product.id"
          class="surface-card group overflow-hidden"
        >
          <div class="relative">
            <img :src="product.image" :alt="product.name" class="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
            <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-800">
              Event pick
            </span>
          </div>
          <div class="p-5">
            <h3 class="text-lg font-black text-slate-950">{{ product.name }}</h3>
            <p class="mt-2 text-sm text-slate-500">{{ product.tagline }}</p>
            <div class="mt-5 flex items-center justify-between">
              <p class="text-xl font-black text-rose-500">${{ product.price }}</p>
              <NuxtLink
                :to="`/products/${product.id}`"
                class="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-orange-50"
              >
                View deal
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <CalltoAction />
  </section>
</template>

<script setup>
const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: '39.99',
    tagline: 'Compact audio that works well in launch bundles and creator picks.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded36c1f0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '59.99',
    tagline: 'A strong hero product for lifestyle banners and weekend promos.',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Minimal Backpack',
    price: '49.99',
    tagline: 'Clean silhouette, premium feel, and bundle-friendly positioning.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7fa5a2c1e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: 'Sunglasses',
    price: '19.99',
    tagline: 'Small price point, strong add-on potential, easy event feature.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
  },
]
</script>
