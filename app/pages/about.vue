<template>
  <div class="space-y-24">
    <!-- Hero Section -->
    <section class="text-center py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        About <span class="text-blue-600">Vixel Store</span>
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        We’re on a mission to make online shopping simple, affordable, and reliable. 
        Partnering with trusted dropshipping suppliers like CJ Dropshipping, 
        we bring the best products right to your doorstep.
      </p>
    </section>

    <!-- Our Story -->
    <section class="container mx-auto px-4 md:px-0">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62"
          alt="Our Story"
          class="rounded-2xl shadow-lg"
        />
        <div>
          <h2 class="text-3xl font-bold mb-4">Our Story</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Vixel Store started with a simple idea: to give everyone access to 
            high-quality products without the hassle of long shipping times or high costs.
          </p>
          <p class="text-gray-600 leading-relaxed">
            By leveraging global suppliers and modern e-commerce technology, 
            we make it easy for customers to find products they’ll love 
            at prices they’ll appreciate.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Why Choose Us</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="text-xl font-semibold mb-2">Fast & Reliable Shipping</h3>
            <p class="text-gray-600">We work with CJ Dropshipping to ensure your orders are delivered quickly and safely.</p>
          </div>
          <div class="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-xl font-semibold mb-2">Secure Payments</h3>
            <p class="text-gray-600">Shop with confidence knowing your information is always protected.</p>
          </div>
          <div class="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-xl font-semibold mb-2">Dedicated Support</h3>
            <p class="text-gray-600">Our customer service team is here to help you 24/7 with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center py-20">
      <h2 class="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
      <p class="text-gray-600 mb-6">Discover amazing products and enjoy a smooth shopping experience.</p>
      <NuxtLink
        to="/products"
        class="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Browse Products
      </NuxtLink>
    </section>
  </div>
</template>
