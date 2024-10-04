import dayjs from 'dayjs';
import { TimeInputValue } from '@nextui-org/react';

export const getCurrentDate = (timestamp?: string) =>
  new Date(timestamp ?? new Date()).toISOString().split('T')[0];

export const convertToTimeObject = (isoString: string) => {
  if (!isoString) return undefined;

  const startTime = dayjs(isoString);

  return {
    hour: Number(startTime.format('hh')),
    minute: Number(startTime.format('mm')),
    second: Number(startTime.format('ss')),
  };
};

/**
 * Generates an ISO date string from a TimeInputValue object.
 *
 * @param inputTime - The TimeInputValue object containing the time values.
 * @param dateTime - The date string in the format "YYYY-MM-DD".
 * */
export const generateISODate = (
  inputTime: TimeInputValue,
  dateTime: string,
) => {
  const { hour = 0, minute = 0, second = 0, millisecond = 0 } = inputTime;

  // Parse the provided date string with dayjs
  const date = dayjs(dateTime);

  // Set the time using the input object
  const updatedDate = date
    .hour(hour)
    .minute(minute)
    .second(second)
    .millisecond(millisecond);

  // Return the ISO string
  return updatedDate.toISOString();
};

export const convertMinutesToTime = (totalMinutes: string) => {
  // Create a dayjs object at the start of the epoch (00:00:00)
  const start = dayjs().startOf('day');

  // Add the total minutes to the start
  const time = start.add(+totalMinutes, 'minute');

  // Format the time string
  return time.format('HH:mm:ss');
};

export const convertTimeToMinutes = (time: string) => {
  // Split the time by colon to extract hours and minutes
  const [hours, minutes] = time.split(':');

  // Convert hours and minutes to integers
  const totalHours = parseInt(hours, 10);
  const totalMinutes = parseInt(minutes, 10);

  // Calculate the total minutes
  return totalHours * 60 + totalMinutes;
};
