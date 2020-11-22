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