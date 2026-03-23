<template>
  <div class="relative min-h-screen overflow-x-clip">
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div class="absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-orange-300/25 blur-3xl"></div>
      <div class="absolute right-[-7rem] top-40 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl"></div>
    </div>

    <div class="min-h-screen flex flex-col">
      <Navbar />

      <main class="mx-auto w-full max-w-[1200px] flex-grow px-4 pb-20 pt-44 md:pt-48">
        <slot />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
// Optional: dynamic meta can be added here for SEO
</script>
