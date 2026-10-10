export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s - Amazon Bestsellers',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
