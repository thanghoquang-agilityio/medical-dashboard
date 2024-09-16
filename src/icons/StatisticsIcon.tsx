import { CustomClassType } from '@/types/components';

export const StatisticsIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={customClass}
  >
    <path
      d="M7.53174 8.87746V4.77319"
      stroke="currentColor"
      stroke-width="0.923461"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.06836 8.87738V2.31055"
      stroke="currentColor"
      stroke-width="0.923461"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.60693 8.87733V6.41476"
      stroke="currentColor"
      stroke-width="0.923461"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
