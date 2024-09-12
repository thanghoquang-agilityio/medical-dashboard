import { CustomClassType } from '@/types/components';

export const ChemistIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    className={customClass}
  >
    <g clipPath="url(#clip0_1_17961)">
      <path
        d="M10.3507 11.0566V3.05237C10.3507 2.58105 10.1635 2.12903 9.83022 1.79575C9.49694 1.46247 9.04492 1.27524 8.5736 1.27524C8.10227 1.27524 7.65025 1.46247 7.31697 1.79575C6.9837 2.12903 6.79646 2.58105 6.79646 3.05237V11.0566C6.22584 11.4378 5.79297 11.9925 5.56176 12.6387C5.33056 13.2848 5.31328 13.9882 5.51249 14.6449C5.7117 15.3016 6.11682 15.8769 6.66804 16.2857C7.21925 16.6945 7.88733 16.9152 8.5736 16.9152C9.25986 16.9152 9.92794 16.6945 10.4792 16.2857C11.0304 15.8769 11.4355 15.3016 11.6347 14.6449C11.8339 13.9882 11.8166 13.2848 11.5854 12.6387C11.3542 11.9925 10.9213 11.4378 10.3507 11.0566Z"
        stroke="currentColor"
        strokeWidth="1.59942"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_17961">
        <rect
          width="17.0605"
          height="17.0605"
          fill="currentColor"
          transform="translate(0.399292 0.564117)"
        />
      </clipPath>
    </defs>
  </svg>
);
