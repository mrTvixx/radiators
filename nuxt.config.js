require('dotenv').config();

module.exports = {
  plugins: [
    { ssr: false, src: '~plugins/icon' },
    { ssr: false, src: '~plugins/fragment' },
    { ssr: false, src: '~plugins/lodash' },
    { ssr: false, src: '~plugins/slider' },
],
  build: {
    extractCSS: true,
  },
  buildModules: [
    '@nuxtjs/dotenv',
  ]
}