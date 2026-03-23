<template>
  <div class="space-y-16">
    <section class="banner-panel overflow-hidden px-8 py-12 md:px-12 md:py-16">
      <div class="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <span class="promo-chip border-white/20 bg-white/10 text-white">Ad booking</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Banner planning</span>
            <span class="promo-chip border-white/20 bg-white/10 text-white">Promo concepting</span>
          </div>
          <p class="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">Contact</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Want a storefront that feels louder, warmer, and more fun to shop?
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Reach out if you want product banners, event blocks, launch-week layouts, or more ad-style energy across the storefront.
          </p>
        </div>

        <div class="grid gap-4">
          <article class="rounded-[28px] border border-white/10 bg-white/10 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Current promo focus</p>
            <p class="mt-3 text-2xl font-black">Weekend launch banners + creator event blocks</p>
          </article>
          <div class="grid gap-4 sm:grid-cols-2">
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Offer type</p>
              <p class="mt-2 text-lg font-bold">Sales, product drops, limited bundles</p>
            </article>
            <article class="rounded-[24px] border border-white/10 bg-white/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-orange-200">Response time</p>
              <p class="mt-2 text-lg font-bold">Usually within one business day</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
      <form class="surface-card space-y-5 p-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Tell us what you want to promote</p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">Plan the next banner push</h2>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <input type="text" placeholder="Your Name" class="input-field" />
          <input type="email" placeholder="Your Email" class="input-field" />
        </div>

        <input type="text" placeholder="Campaign goal or event name" class="input-field" />
        <textarea rows="7" placeholder="Describe the sale, event, or products you want to spotlight." class="input-field"></textarea>

        <div class="flex flex-wrap gap-3">
          <button type="submit" class="btn-primary">Send Message</button>
          <NuxtLink to="/products" class="btn-secondary">See Product Banners</NuxtLink>
        </div>
      </form>

      <div class="space-y-6">
        <article class="surface-card p-7">
          <h2 class="text-xl font-black text-slate-950">Promo services</h2>
          <dl class="mt-5 space-y-4 text-sm text-slate-600">
            <div>
              <dt class="font-semibold text-slate-900">Hero banners</dt>
              <dd class="mt-1">Campaign intros, sale headlines, creator picks, and seasonal launches.</dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-900">Event blocks</dt>
              <dd class="mt-1">Livestream callouts, weekend drops, limited bundles, and timed offers.</dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-900">Store refresh</dt>
              <dd class="mt-1">Warmer visuals, more ad energy, and stronger commercial pacing across the site.</dd>
            </div>
          </dl>
        </article>

        <article class="surface-card p-7">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">Quick contact</p>
          <h2 class="mt-3 text-2xl font-black text-slate-950">support@vixelstore.com</h2>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            Reach out if you want to turn product sections into a more active campaign experience.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
