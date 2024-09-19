import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
/**
 * @param value string - Date time string to format
 * @returns string - Formatted date time
 */
export const formatDateTime = (value: string) => {
  return dayjs(value).format('MMM D, YYYY h:mm A');
};

/**
 * @param value string - Date string to format
 * @returns string - Formatted date
 */
export const formatNewDate = (value: string) => {
  return dayjs(value).format('MMM D, YYYY');
};

/**
 * @param start string - Start time string to format
 * @param duration string - Duration time string to format
 * @returns string - Formatted date
 */
export const formatTimeAppointment = ({
  start,
  duration,
}: {
  start: string;
  duration: string;
}) => {
  const startTime = dayjs(start);
  const [hours, minutes, _] = duration.split(':').map(Number);
  const endTime = startTime.add(hours, 'hour').add(minutes, 'minute');

  return `${startTime.format('h:mm A')} to ${endTime.format('h:mm A')}`;
};

/**
 * Formats the input date string into an abbreviated day of the week and the day of the month.
 *
 * @param input - The input date string in ISO 8601 format ('2024-09-11T06:30:00.000Z').
 * @returns An object containing:
 *   - dayOfWeek: Wed.
 *   - dayOfMonth: 11.
 */
export const formatStartTime = (input: string) => {
  const date = dayjs(input);
  dayjs.extend(advancedFormat);

  // Get the abbreviated day of the week
  const dayOfWeek = date.format('ddd');

  // Get the day of the month
  const dayOfMonth = date.format('DD');

  return { dayOfWeek, dayOfMonth };
};
