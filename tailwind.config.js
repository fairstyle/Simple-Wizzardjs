/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/js/*.js',
    './assets/js/componentes/*.js',
    './assets/js/utils/*.js',
  ],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")
  ]
}