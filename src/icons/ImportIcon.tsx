import { CustomClassType } from '@/types';
import React from 'react';

export const ImportIcon = ({ customClass }: CustomClassType) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={customClass}
    >
      <path
        d="M8.41984 10.4933C8.29318 10.4933 8.16651 10.4467 8.06651 10.3467L6.35984 8.64C6.16651 8.44666 6.16651 8.12666 6.35984 7.93333C6.55318 7.74 6.87318 7.74 7.06651 7.93333L8.41984 9.28666L9.77318 7.93333C9.96651 7.74 10.2865 7.74 10.4798 7.93333C10.6732 8.12666 10.6732 8.44666 10.4798 8.64L8.77318 10.3467C8.67318 10.4467 8.54651 10.4933 8.41984 10.4933Z"
        fill="currentColor"
      />
      <path
        d="M8.41992 10.4467C8.14659 10.4467 7.91992 10.22 7.91992 9.94666V3.16666C7.91992 2.89332 8.14659 2.66666 8.41992 2.66666C8.69326 2.66666 8.91992 2.89332 8.91992 3.16666V9.94666C8.91992 10.22 8.69326 10.4467 8.41992 10.4467Z"
        fill="currentColor"
      />
      <path
        d="M8.49984 14.4533C5.0665 14.4533 2.6665 12.0533 2.6665 8.62C2.6665 8.34666 2.89317 8.12 3.1665 8.12C3.43984 8.12 3.6665 8.34666 3.6665 8.62C3.6665 11.4667 5.65317 13.4533 8.49984 13.4533C11.3465 13.4533 13.3332 11.4667 13.3332 8.62C13.3332 8.34666 13.5598 8.12 13.8332 8.12C14.1065 8.12 14.3332 8.34666 14.3332 8.62C14.3332 12.0533 11.9332 14.4533 8.49984 14.4533Z"
        fill="currentColor"
      />
    </svg>
  );
};
