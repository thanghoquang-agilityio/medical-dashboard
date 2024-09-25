import { CustomClassType } from '@/types';

export const XmarkIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    className={customClass}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
    />
  </svg>
);
