<template>
  <div class="space-y-24">
    <!-- Hero Section -->
    <section class="text-center py-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Get in <span class="text-green-600">Touch</span>
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Have questions, feedback, or need support?  
        We’re here to help you every step of the way.
      </p>
    </section>

    <!-- Contact Form -->
    <section class="container mx-auto px-4 md:px-0">
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Form -->
        <form class="bg-white p-8 rounded-2xl shadow space-y-6">
          <h2 class="text-2xl font-bold mb-4">Send us a message</h2>
          <input
            type="text"
            placeholder="Your Name"
            class="w-full border p-3 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            class="w-full border p-3 rounded"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            class="w-full border p-3 rounded"
          ></textarea>
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

        <!-- Contact Info -->
        <div class="space-y-8">
          <h2 class="text-2xl font-bold mb-4">Contact Information</h2>
          <div class="space-y-4 text-gray-700">
            <p>📍 <strong>Address:</strong> 123 Example Street, Springfield, USA</p>
            <p>📧 <strong>Email:</strong> support@vixelstore.com</p>
            <p>📞 <strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>

          <!-- Map Placeholder -->
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019504590926!2d-122.41941548468115!3d37.77492977975951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2b8!2s123%20Example%20St%2C%20San%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000000"
              width="100%"
              height="300"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
