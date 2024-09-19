import { CustomClassType } from '@/types';

export const LinkedInIcon = ({
  customClass = 'w-12 h-12',
}: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 48 48"
    className={customClass}
  >
    <g clipPath="url(#clip0_200_159)">
      <rect width="48" height="48" rx="8" fill="#FAFAFA" />
      <mask
        id="mask0_200_159"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="13"
        y="13"
        width="22"
        height="22"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5 13.5H34.5V34.4991H13.5V13.5Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_200_159)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.0124 29.846C31.0143 30.0776 30.9397 30.1442 30.7143 30.1389C30.074 30.1267 29.4336 30.117 28.7943 30.1425C28.4733 30.1556 28.3767 30.0723 28.3811 29.7382C28.4005 28.2988 28.3881 26.8585 28.3907 25.4184C28.3907 25.0237 28.3645 24.6325 28.2197 24.2605C27.9741 23.6325 27.5504 23.2072 26.848 23.1457C26.1006 23.0799 25.5577 23.4202 25.1911 24.051C24.9508 24.4641 24.8955 24.9254 24.8964 25.3972C24.8999 26.8524 24.8885 28.3066 24.9051 29.7609C24.9095 30.0741 24.8138 30.1521 24.5139 30.1416C23.8744 30.1196 23.2341 30.125 22.5939 30.1399C22.3483 30.146 22.2737 30.0723 22.2737 29.8232C22.2817 26.827 22.2807 23.8307 22.2755 20.8346C22.2755 20.6197 22.3194 20.5231 22.5614 20.5285C23.2447 20.5433 23.9288 20.5433 24.6121 20.5285C24.8489 20.5241 24.9112 20.6099 24.9015 20.8311C24.8866 21.1898 24.898 21.5493 24.898 22.0019C25.9112 20.7494 27.1312 20.3381 28.5803 20.6302C29.9837 20.9134 30.9493 22.1766 30.9896 23.8685C31.037 25.8595 31.002 27.8532 31.0124 29.846ZM19.2197 19.4136C18.3697 19.4117 17.7048 18.7381 17.7067 17.8821C17.7083 17.0365 18.3935 16.3472 19.2284 16.3488C20.0644 16.3515 20.7433 17.0435 20.7406 17.8899C20.7388 18.7478 20.0723 19.4152 19.2197 19.4136ZM20.1601 30.1423C19.5215 30.1169 18.8804 30.1265 18.241 30.1388C18.0119 30.1433 17.9085 30.1011 17.9093 29.8345C17.9182 26.84 17.9172 23.8465 17.9102 20.8519C17.9093 20.6117 17.9673 20.5212 18.2233 20.5283C18.8769 20.5449 19.532 20.5494 20.1847 20.5265C20.4854 20.516 20.5407 20.6274 20.539 20.8993C20.5276 22.3816 20.5337 23.8639 20.5337 25.3471C20.5337 26.8146 20.525 28.2829 20.5399 29.7511C20.5434 30.0494 20.4749 30.1547 20.1601 30.1423ZM34.4552 17.0524C34.3956 16.576 34.3877 16.0857 34.1245 15.6595C33.2729 14.2781 32.0975 13.4912 30.4126 13.5001C26.1499 13.522 21.8871 13.5001 17.6242 13.515C16.984 13.5167 16.3253 13.5377 15.7437 13.8815C14.3245 14.7218 13.4912 15.8963 13.5001 17.6181C13.5202 21.895 13.5001 26.1717 13.514 30.4494C13.5166 31.052 13.5255 31.6826 13.8412 32.2256C14.5867 33.5098 15.5692 34.4632 17.183 34.457C17.2295 34.457 17.2655 34.4789 17.3041 34.4991H30.746C30.8205 34.4324 30.9117 34.4657 30.9959 34.4552C31.4791 34.3947 31.9783 34.3921 32.4071 34.1149C33.6062 33.3395 34.4877 32.3633 34.4606 30.8204C34.4606 30.7932 34.4798 30.7688 34.5 30.746V17.3041C34.4403 17.2278 34.4657 17.1374 34.4552 17.0524Z"
          fill="#0B66C2"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_200_159">
        <rect width="48" height="48" rx="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
