import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,ts,tsx}'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
} satisfies Config;