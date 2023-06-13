/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        animationToast: 'animationToast 500ms ease-in-out',
        animationSearch: 'animationSearch 200ms linear',
      },

      keyframes: {
        animationToast: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },

        animationSearch: {
          '0%': {
            width: '0px',
          },
          '100%': {
            width: '250px',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
