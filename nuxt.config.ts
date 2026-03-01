// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-01',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxt/test-utils/module', 'floating-vue/nuxt', '@nuxt/eslint'],
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
        {
          property: 'og:title',
          content: 'Dragon Cave Calendar',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `${process.env.ORIGIN}${process.env.BASE_URL}/`,
        },
        {
          property: 'og:description',
          content:
            'See future variants and sprite changes in a single place with times local to you.',
        },
        {
          property: 'theme-color',
          content: '#483d8b',
        },
      ],
    },
  },
  css: ['~/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
    ],
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  nitro: {
    preset: 'static',
  },
});
