<template>
  <section class="mt-20 relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 rounded-2xl overflow-hidden">
    <div class="max-w-4xl mx-auto text-center relative z-10 px-6">
      <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
        Don’t Miss Out on Exclusive Deals 🚀
      </h2>
      <p class="text-lg text-indigo-100 mb-8">
        Join our community and be the first to know about discounts, new arrivals, and special offers.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/signup"
          class="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Sign Up Free
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-indigo-900 transition"
        >
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Background Shapes -->
    <div class="absolute inset-0 opacity-20">
      <div class="w-80 h-80 bg-white rounded-full blur-3xl absolute -top-20 left-10"></div>
      <div class="w-96 h-96 bg-yellow-300 rounded-full blur-3xl absolute bottom-0 right-0"></div>
    </div>
  </section>
</template>
