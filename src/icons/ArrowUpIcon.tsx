import { CustomClassType } from '@/types/components';

export const ArrowUpIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 7"
    fill="none"
    className={customClass}
  >
    <path
      d="M11.375 5.3125L7 9.6875L2.625 5.3125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
