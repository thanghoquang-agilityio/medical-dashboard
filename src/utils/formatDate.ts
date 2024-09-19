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

/**
 * @param createdAt string - Created time string to format
 * @returns string - Time ago
 */
export const formatTimeAgo = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const differenceInSeconds: number = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  const minutes: number = Math.floor(differenceInSeconds / 60);
  const hours: number = Math.floor(differenceInSeconds / 3600);
  const days: number = Math.floor(differenceInSeconds / 86400);

  switch (true) {
    case days > 0:
      return days === 1 ? '1 day ago' : `${days} days ago`;
    case hours > 0:
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    case minutes > 0:
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    default:
      return 'just now';
  }
};
