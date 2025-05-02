// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive'],
        bangers: ['"Bangers"', 'cursive'],
        fredoka: ['"Fredoka One"', 'sans-serif'],
        luckiest: ['"Luckiest Guy"', 'cursive'],
      },
    },
  },
  plugins: [],
}
