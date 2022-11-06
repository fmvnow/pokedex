// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Pokedex',
      script: [{
        src: 'https://kit.fontawesome.com/5ad68aa6c9.js',
      }]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
})
