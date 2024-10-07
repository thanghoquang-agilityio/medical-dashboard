import { useRef } from 'react';

/**
 * useDebounce
 * @param {Function} callback - The function to be debounced
 * @param {number} delay - Delay in milliseconds (default: 500)
 */
export const useDebounce = (
  callback: (params: string) => void,
  delay = 500,
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounceFunction = (params: string) => {
    // Clear the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(() => {
      callback(params);
    }, delay);
  };

  return debounceFunction;
};
