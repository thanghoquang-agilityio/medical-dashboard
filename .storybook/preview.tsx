import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';
import type { Preview } from '@storybook/react';
import '@/app/globals.css';

interface ColorModeProps {
  colorMode: 'light' | 'dark';
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
      default: 'light',
      values: [
        { name: 'light', value: '#FFFAFA' },
        { name: 'dark', value: '#1B1C31' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const backgroundMode =
        context.globals.colorMode === 'dark' ? 'dark' : 'light';
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
    defaultValue: 'light',
    toolbar: {
      items: [
        { title: 'Light', value: 'light' },
        { title: 'Dark', value: 'dark' },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
