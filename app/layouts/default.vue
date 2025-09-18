<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <Navbar />

    <main class="container mx-auto px-4 pt-28 pb-16 flex-grow">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Optional: dynamic meta can be added here for SEO
</script>
