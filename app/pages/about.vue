<template>
  <div class="space-y-20">
    <section class="banner-panel overflow-hidden px-8 py-12 md:px-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">About Vixel</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            We design storefronts that feel like live campaigns, not static product shelves.
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            The updated Vixel direction is all about energy: bigger banners, stronger offers, and more fun ways to showcase products, drops, and events without losing trust.
          </p>
        </div>

        <div class="grid gap-4">
          <article class="rounded-[28px] border border-white/10 bg-white/10 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Store signal</p>
            <p class="mt-3 text-2xl font-black">Promos, events, launches, and bundles all visible at once.</p>
          </article>
          <div class="grid gap-4 sm:grid-cols-2">
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Tone</p>
              <p class="mt-2 text-lg font-bold">Fun, warm, and commercially sharp.</p>
            </article>
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Focus</p>
              <p class="mt-2 text-lg font-bold">Products that deserve more stage presence.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-10 md:grid-cols-2 md:items-center">
      <img
        src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80"
        alt="Team working on ecommerce operations"
        class="h-full min-h-80 w-full rounded-[30px] border border-white/60 object-cover shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]"
      />
      <div class="space-y-5">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Brand direction</p>
        <h2 class="section-title">Advertising energy, structured like a premium storefront</h2>
        <p class="text-base leading-relaxed text-slate-600">
          Vixel started from a cleaner ecommerce baseline, but the redesign pushes further by making the interface feel active. Every section can now act like a sales surface, a featured event slot, or a campaign panel.
        </p>
        <p class="text-base leading-relaxed text-slate-600">
          The result is a store that feels more alive: warm gradients, sale ribbons, spotlight cards, and more reasons for visitors to keep browsing.
        </p>
      </div>
    </section>

    <section>
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">What sets this version apart</h2>
        <p class="section-subtitle mx-auto">
          The goal is not just visual noise. It is a better rhythm between attention, storytelling, and product discovery.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">Campaign Layout</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">Hero areas that sell first</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Instead of quiet intros, pages now lead with offers, event notes, and spotlight products.
          </p>
        </article>
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-rose-500">Banner System</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">Sales and launches stay visible</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Banners, promo chips, and event cards make it easy to signal what matters right now.
          </p>
        </article>
        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-amber-500">Warmer UI</p>
          <h3 class="mt-3 text-xl font-black text-slate-950">More fun without losing clarity</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            The palette and typography feel more commercial while keeping the content readable and organized.
          </p>
        </article>
      </div>
    </section>

    <section class="surface-card px-8 py-12 text-center md:px-12">
      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Next stop</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950">Explore the product festival</h2>
      <p class="mx-auto mt-4 max-w-2xl text-slate-600">
        Browse the new promotional layout in action through filters, featured drops, and event-style product presentation.
      </p>
      <NuxtLink to="/products" class="btn-primary mt-7">Browse Products</NuxtLink>
    </section>
  </div>
</template>
