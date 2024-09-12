import { CustomClassType } from '@/types/components';

export const SearchIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    className={customClass}
  >
    <g clipPath="url(#clip0_1_18701)">
      <path
        d="M9.58341 17.5C13.9557 17.5 17.5001 13.9556 17.5001 9.58335C17.5001 5.2111 13.9557 1.66669 9.58341 1.66669C5.21116 1.66669 1.66675 5.2111 1.66675 9.58335C1.66675 13.9556 5.21116 17.5 9.58341 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3334 18.3334L16.6667 16.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_18701">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
