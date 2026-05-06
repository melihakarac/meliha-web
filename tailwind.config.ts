import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080a',
        surface: '#0f0f12',
        border: '#1c1c21',
        'text-hi': '#f0f0ff',
        'text-mid': '#a0a0b8',
        'text-lo': '#55556a',
        accent: {
          violet: '#7c3aed',
          cyan: '#06b6d4',
          pink: '#d946ef',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-iris': 'linear-gradient(135deg, #7c3aed 0%, #d946ef 50%, #06b6d4 100%)',
      },
    },
  },
  plugins: [],
}

export default config
