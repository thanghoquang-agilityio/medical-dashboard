/**
 * Formats a given number using compact notation (e.g., "1.2K", "1M") and appends a unit with proper pluralization.
 *
 * @param {number} number - The number to format. Will be shortened using compact notation.
 * @param {string} [unit=''] - The unit to append after the formatted number. Will be pluralized if the number is greater than 1.
 *
 * @returns {string} - A string that combines the formatted number and the unit (with correct pluralization).
 *
 * @example
 * // Returns "1.2K items"
 * formatNumberWithUnit(1200, 'item');
 *
 * @example
 * // Returns "1 watch"
 * formatNumberWithUnit(1, 'watch');
 *
 * @example
 * // Returns "1.5M users"
 * formatNumberWithUnit(1500000, 'user');
 */
export const formatNumberWithUnit = (number: number, unit: string = '') => {
  return `${new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    roundingMode: 'floor',
  }).format(
    number,
  )} ${Math.abs(number) > 1 && unit ? `${unit}s` : `${unit}`}`.replace(
    '.',
    ',',
  );
};
