// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'CaDesign',
    }
  },
  modules: ['nuxt-swiper'],
  css: ['assets/style.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import']
        }
      }
    }
  },
  devtools: { enabled: false }
})