<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
      <!-- Logo & tagline -->
      <div>
        <h3 class="text-2xl font-bold text-white mb-3">Vixel Store</h3>
        <p class="text-sm text-gray-400">
          Your trusted dropshipping partner with quality products and fast fulfillment.
        </p>
      </div>

      <!-- Links -->
      <div>
        <h4 class="font-semibold text-white mb-3">Quick Links</h4>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/products" class="hover:underline">Products</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:underline">About</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-semibold text-white mb-3">Contact</h4>
        <p class="text-sm">support@vixelstore.com</p>
        <p class="text-sm mt-2">+63 900 000 0000</p>
        <p class="text-sm mt-4 text-gray-400">
          © {{ new Date().getFullYear() }} Vixel Store. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
