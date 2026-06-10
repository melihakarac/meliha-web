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
        border: '#22222a',      // bumped from #1c1c21 for visibility
        'text-hi': '#f0f0ff',
        'text-mid': '#b4b4c8',  // bumped from #a0a0b8 for AA
        'text-lo': '#7d7d96',   // bumped from #55556a for AA
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
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        'display-xl': ['clamp(2.75rem, 12vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section-y': '6rem',
        'section-y-lg': '8rem',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backgroundImage: {
        'gradient-iris': 'linear-gradient(135deg, #7c3aed 0%, #d946ef 50%, #06b6d4 100%)',
      },
    },
  },
  plugins: [],
}

export default config
