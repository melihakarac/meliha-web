import type { Config } from 'tailwindcss'

/**
 * Design tokens — kept narrow and intentional.
 * - Spacing: 4px base via Tailwind defaults; section rhythm uses py-24 / py-32.
 * - Type: explicit display sizes use clamp() so headings scale fluidly.
 * - Radii: two-step scale — `lg` (cards/buttons) and `full` (pills).
 * - Color: text-lo lightened to pass WCAG AA on the bg surface (~4.6:1).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080a',          // page background
        surface: '#0f0f12',     // raised surfaces (cards, alt sections)
        border: '#22222a',      // hairline borders — bumped from #1c1c21 for visibility
        'text-hi': '#f0f0ff',   // primary copy / headings
        'text-mid': '#b4b4c8',  // secondary copy — bumped from #a0a0b8 for AA
        'text-lo': '#7d7d96',   // tertiary copy / labels — bumped from #55556a for AA
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
      // Display sizes — fluid, used on hero name and section H2s
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        'display-xl': ['clamp(4rem, 11vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      // Section vertical rhythm — used consistently in every section
      spacing: {
        'section-y': '6rem',     // 96px — mobile section padding
        'section-y-lg': '8rem',  // 128px — desktop section padding
      },
      borderRadius: {
        // Two-step radius scale: lg = cards/buttons, full = pills
        'card': '0.75rem',  // 12px — used on project cards + stat tiles
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
