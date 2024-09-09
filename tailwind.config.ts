import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      screens: {},
      container: {
        padding: {},
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '4px',
          medium: '8px',
          large: '18px',
        },
        borderWidth: {
          small: '1px',
          medium: '1.5px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {},
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};
export default config;
