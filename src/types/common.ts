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

// Option
export interface Option {
  key: string;
  label: string;
}

// FetchData
export interface FetchDataProps {
  searchParams?: URLSearchParams;
  options?: RequestInit;
}
