<template>
  <div class="space-y-24">
    <!-- Hero Section -->
    <section class="text-center py-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Explore Our <span class="text-indigo-600">Products</span>
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Handpicked items from trusted suppliers.  
        Find the products you love at prices you’ll enjoy.
      </p>
    </section>

    <!-- Product Grid -->
    <section class="container mx-auto px-4 md:px-0">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="h-56 w-full object-cover"
          />
          <div class="p-4 flex flex-col flex-1">
            <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-indigo-600 font-bold mb-4">${{ product.price }}</p>
            <button
              class="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center py-20">
      <h2 class="text-3xl font-bold mb-4">Can’t Decide?</h2>
      <p class="text-gray-600 mb-6">Start with our best sellers and enjoy quick shipping.</p>
      <NuxtLink
        to="/cart"
        class="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        View Cart
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const products = [
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
];
</script>
