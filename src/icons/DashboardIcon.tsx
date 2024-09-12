import { CustomClassType } from '@/types/components';

export const DashboardIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    className={customClass}
  >
    <path
      d="M7.44204 2.27356H2.46606V7.24953H7.44204V2.27356Z"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.2616 2.27356H10.2856V7.24953H15.2616V2.27356Z"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.2616 10.0928H10.2856V15.0688H15.2616V10.0928Z"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.44204 10.0928H2.46606V15.0688H7.44204V10.0928Z"
      stroke="currentColor"
      strokeWidth="1.59942"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
