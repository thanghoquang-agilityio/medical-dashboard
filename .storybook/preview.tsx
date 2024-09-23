import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';
import type { Preview } from '@storybook/react';
import '@/app/globals.css';

// Types
import { THEME_MODE_TYPE } from '../src/types';

interface ColorModeProps {
  colorMode: THEME_MODE_TYPE;
  children: JSX.Element;
}

function ColorMode(props: ColorModeProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(props.colorMode);
  }, [props.colorMode]);

  return props.children;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: THEME_MODE_TYPE.LIGHT,
      values: [
        { name: THEME_MODE_TYPE.LIGHT, value: '#FFFAFA' },
        { name: THEME_MODE_TYPE.DARK, value: '#1B1C31' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const backgroundMode =
        context.globals.colorMode === THEME_MODE_TYPE.DARK
          ? THEME_MODE_TYPE.DARK
          : THEME_MODE_TYPE.LIGHT;
      context.parameters.backgrounds.default = backgroundMode;

      return (
        <NextUIProvider>
          <ColorMode colorMode={context.globals.colorMode}>
            <ThemeProvider
              attribute="class"
              defaultTheme={context.globals.colorMode}
            >
              <Story />
            </ThemeProvider>
          </ColorMode>
        </NextUIProvider>
      );
    },
  ],
};

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    defaultValue: THEME_MODE_TYPE.LIGHT,
    toolbar: {
      items: [
        { title: 'Light', value: THEME_MODE_TYPE.LIGHT },
        { title: 'Dark', value: THEME_MODE_TYPE.DARK },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
