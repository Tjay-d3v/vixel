<template>
  <section class="space-y-28">
    <!-- Hero -->
    <div class="relative rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-32 px-6 shadow-2xl overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
      <div class="relative max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Shop Smarter. Ship Faster.
        </h1>
        <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Premium products powered by <span class="font-semibold">CJ Dropshipping</span> — delivered straight to your customers.
        </p>
        <NuxtLink
          to="/products"
          class="inline-block bg-white text-blue-700 font-semibold px-10 py-4 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-105"
        >
          🚀 Browse Products
        </NuxtLink>
      </div>
    </div>

    <!-- Features -->
    <section class="mt-24">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
        Why Choose <span class="text-blue-600">Vixel Store?</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div class="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition text-center">
          <div class="text-5xl mb-4">🚀</div>
          <h3 class="font-semibold text-xl mb-3">Fast Shipping</h3>
          <p class="text-gray-600">
            Optimized logistics powered by CJ to deliver products quicker to your customers, globally.
          </p>
        </div>
        <div class="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition text-center">
          <div class="text-5xl mb-4">⭐</div>
          <h3 class="font-semibold text-xl mb-3">Curated Products</h3>
          <p class="text-gray-600">
            Only the best-selling, high-quality items — helping you maximize sales while minimizing risks.
          </p>
        </div>
        <div class="p-8 bg-white rounded-2xl shadow hover:shadow-xl transition text-center">
          <div class="text-5xl mb-4">💬</div>
          <h3 class="font-semibold text-xl mb-3">24/7 Support</h3>
          <p class="text-gray-600">
            From setup to fulfillment, our team ensures you’re never left in the dark.
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="mt-28">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-14">Featured Products</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col overflow-hidden"
        >
          <img :src="product.image" :alt="product.name" class="h-56 w-full object-cover" />
          <div class="p-4 flex flex-col flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-indigo-600 font-bold mb-4">${{ product.price }}</p>
            <NuxtLink
              :to="`/products/${product.id}`"
              class="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition text-center"
            >
              View Product
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-28 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl py-20 text-center text-white shadow-2xl">
      <h3 class="text-3xl md:text-4xl font-bold mb-6">
        Ready to scale your dropshipping business?
      </h3>
      <p class="text-blue-100 mb-10 max-w-xl mx-auto">
        Join hundreds of entrepreneurs already succeeding with Vixel Store + CJ Dropshipping.
      </p>
      <NuxtLink
        to="/signup"
        class="inline-block bg-white text-blue-700 font-semibold px-10 py-4 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-105"
      >
        ✨ Get Started Today
      </NuxtLink>
    </section>
  </section>
</template>

<script setup>
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1580894732444-8ecded36c1f0",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
  },
  {
    id: 3,
    name: "Minimal Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1600185365483-26d7fa5a2c1e",
  },
  {
    id: 4,
    name: "Sunglasses",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
  },
]
</script>
