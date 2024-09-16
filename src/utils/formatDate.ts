import dayjs from 'dayjs';

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
