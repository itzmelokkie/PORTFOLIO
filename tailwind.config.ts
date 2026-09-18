import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        'dark-surface': '#0B0B0F',
        'elevated-surface': '#111118',
        'primary-purple': '#8B78C8',
        'light-purple': '#C4B8F2',
        'primary-text': '#F4F2F7',
        'secondary-text': '#96939F',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config