// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/test-utils/module', 'floating-vue/nuxt', '@nuxt/eslint'],
  css: ['~/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  app: {
    baseURL: process.env.BASE_URL,
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content:
            'See future variants and sprite changes in a single place with times local to you.',
        },
        {
          name: 'keywords',
          content: 'dragcave, breeds, dragons, variants, sprites',
        },
      ],
    },
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
    ],
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        drop: process.env.NODE_ENV === 'production' ? ['console'] : [],
      },
    },
  },
});