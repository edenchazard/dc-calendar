// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
    esbuild: {
      options: {
        target: 'esnext',
        drop: process.env.NODE_ENV === 'production' ? ['console'] : [],
      },
    },
  },
});
