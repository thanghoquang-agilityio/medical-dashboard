'use client';

import { extendVariants, User } from '@nextui-org/react';

export const Profile = extendVariants(User, {
  variants: {
    type: {
      default: {
        base: 'bg-transparent',
        wrapper: 'font-plus-jakarta-sans',
        name: 'text-lg font-semibold text-primary-100',
        description: 'text-sm text-primary-200',
      },
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
