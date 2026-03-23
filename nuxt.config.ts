export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    },
  },
})
