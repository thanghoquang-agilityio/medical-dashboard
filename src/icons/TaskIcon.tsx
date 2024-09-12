import { CustomClassType } from '@/types/components';

export const TaskIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={customClass}
  >
    <path
      d="M21.6599 10.44L20.6799 14.62C19.8399 18.23 18.1799 19.69 15.0599 19.39C14.5599 19.35 14.0199 19.26 13.4399 19.12L11.7599 18.72C7.58994 17.73 6.29994 15.67 7.27994 11.49L8.25994 7.3C8.45994 6.45 8.69994 5.71 8.99994 5.1C10.1699 2.68 12.1599 2.03 15.4999 2.82L17.1699 3.21C21.3599 4.19 22.6399 6.26 21.6599 10.44Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.0601 19.39C14.4401 19.81 13.6601 20.16 12.7101 20.47L11.1301 20.99C7.1601 22.27 5.0701 21.2 3.7801 17.23L2.5001 13.28C1.2201 9.31 2.2801 7.21 6.2501 5.93L7.8301 5.41C8.2401 5.28 8.6301 5.17 9.0001 5.1C8.7001 5.71 8.4601 6.45 8.2601 7.3L7.2801 11.49C6.3001 15.67 7.5901 17.73 11.7601 18.72L13.4401 19.12C14.0201 19.26 14.5601 19.35 15.0601 19.39Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6399 8.53L17.4899 9.76"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6599 12.4L14.5599 13.14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
