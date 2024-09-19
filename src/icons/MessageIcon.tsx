import { CustomClassType } from '@/types';

export const MessageIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    className={customClass}
  >
    <g clipPath="url(#clip0_1_17978)">
      <path
        d="M3.1772 3.30327H14.5509C15.3328 3.30327 15.9726 3.94304 15.9726 4.72498V13.2552C15.9726 14.0372 15.3328 14.6769 14.5509 14.6769H3.1772C2.39526 14.6769 1.75549 14.0372 1.75549 13.2552V4.72498C1.75549 3.94304 2.39526 3.30327 3.1772 3.30327Z"
        stroke="currentColor"
        strokeWidth="1.59942"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9726 4.72495L8.86403 9.70093L1.75549 4.72495"
        stroke="currentColor"
        strokeWidth="1.59942"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_17978">
        <rect
          width="17.0605"
          height="17.0605"
          fill="currentColor"
          transform="translate(0.333313 0.459717)"
        />
      </clipPath>
    </defs>
  </svg>
);
