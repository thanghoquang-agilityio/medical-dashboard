import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';
import {
  backgroundImage,
  borderWidth,
  colors,
  container,
  fontSize,
  radius,
  screens,
} from './src/themes';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      backgroundImage,
      colors,
      container,
      fontSize,
      screens,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius,
        borderWidth,
      },
      themes: {
        light: {
          colors: {
            background: {
              100: colors['black-violet'].light,
              200: colors['purple-shiny'].light,
              300: colors.purple,
            },
            foreground: colors.neutral.light,
            primary: {
              100: colors.white,
              200: colors.stone.light,
              300: colors.gray.light,
            },
            secondary: {
              100: colors.sky,
              200: colors.blue,
              300: colors.emerald,
            },
            success: colors.green,
            warning: colors.yellow,
            danger: {
              100: colors.red,
              200: colors.orange,
            },
          },
        },
        dark: {
          colors: {
            background: {
              100: colors['black-violet'].dark,
              200: colors['purple-shiny'].dark,
              300: colors.purple,
            },
            foreground: colors.neutral.dark,
            primary: {
              100: colors.black,
              200: colors.stone.dark,
              300: colors.gray.dark,
            },
            secondary: {
              100: colors.sky,
              200: colors.blue,
              300: colors.emerald,
            },
            success: colors.green,
            warning: colors.yellow,
            danger: {
              100: colors.red,
              200: colors.orange,
            },
          },
        },
      },
    }),
  ],
};
export default config;
