// Components
export type CustomClassType = {
  customClass?: string;
};

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Status
export enum STATUS_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

// Theme mode
export enum THEME_MODE_TYPE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const STATUS_TYPE_RESPONSE = {
  0: STATUS_TYPE.SUCCESS,
  1: STATUS_TYPE.WARNING,
  2: STATUS_TYPE.ERROR,
} as const;

// Option
export interface Option {
  key: string;
  label: string;
}
