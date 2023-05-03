/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/js/*.js',
  ],
  prefix: 'wizzardjs-',
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")
  ]
}