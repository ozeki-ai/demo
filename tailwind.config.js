export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}"
  ],
  theme: {
    extend: {
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}
