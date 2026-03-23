export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  ssr: true,
  runtimeConfig: {
    // Server-only keys (never exposed to client)
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',

    // Public keys (safe to expose)
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    },
  },
})
