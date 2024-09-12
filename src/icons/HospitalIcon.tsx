import { CustomClassType } from '@/types/components';

export const HospitalIcon = ({
  customClass = 'w-full h-full',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    className={customClass}
  >
    <g clipPath="url(#clip0_1_17966)">
      <path
        d="M11.7072 3.11911H13.1289C13.5059 3.11911 13.8676 3.2689 14.1342 3.53552C14.4008 3.80214 14.5506 4.16376 14.5506 4.54082V14.4928C14.5506 14.8698 14.4008 15.2314 14.1342 15.4981C13.8676 15.7647 13.5059 15.9145 13.1289 15.9145H4.59865C4.22159 15.9145 3.85997 15.7647 3.59335 15.4981C3.32673 15.2314 3.17694 14.8698 3.17694 14.4928V4.54082C3.17694 4.16376 3.32673 3.80214 3.59335 3.53552C3.85997 3.2689 4.22159 3.11911 4.59865 3.11911H6.02035"
        stroke="currentColor"
        strokeWidth="1.59942"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.997 1.69724H6.73185C6.33926 1.69724 6.021 2.01549 6.021 2.40809V3.8298C6.021 4.22239 6.33926 4.54065 6.73185 4.54065H10.997C11.3896 4.54065 11.7078 4.22239 11.7078 3.8298V2.40809C11.7078 2.01549 11.3896 1.69724 10.997 1.69724Z"
        stroke="currentColor"
        strokeWidth="1.59942"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_17966">
        <rect
          width="17.0605"
          height="17.0605"
          fill="currentColor"
          transform="translate(0.333496 0.275665)"
        />
      </clipPath>
    </defs>
  </svg>
);
