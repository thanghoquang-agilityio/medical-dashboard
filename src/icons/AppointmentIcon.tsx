import { CustomClassType } from '@/types';

export const AppointmentIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    className={customClass}
  >
    <path
      d="M13.1288 15.0697V7.96121"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.86353 15.0696V3.69598"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.59894 15.0695V10.8044"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
