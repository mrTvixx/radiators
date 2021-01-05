require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    { ssr: false, src: '~plugins/icon' },
    { ssr: false, src: '~plugins/fragment' },
    { ssr: false, src: '~plugins/lodash' },
    { ssr: false, src: '~plugins/slider' },
    { ssr: false, src: '~plugins/pagination' },
    { ssr: false, src: '~plugins/jsonld' },
    { ssr: false, src: '~plugins/modals' },
    { ssr: false, src: '~plugins/telInput' },
    { ssr: false, src: '~plugins/tooltip' },
    { src: '~plugins/ga.js', mode: 'client' },
  ],
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '69462898',
        webvisor: true,
        clickmap:true,
        useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
      }
    ],
  ],
  buildModules: [
    '@nuxtjs/google-analytics'
  ],
  build: {
    extractCSS: true,
  },
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: 'favicon.ico',
    },
  ],
}