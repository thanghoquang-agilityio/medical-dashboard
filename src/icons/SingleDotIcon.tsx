import { CustomClassType } from '@/types';

export const SingleDotIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={customClass}
  >
    <path
      d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"
      fill="currentColor"
    />
  </svg>
);
