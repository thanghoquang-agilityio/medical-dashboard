import dayjs from 'dayjs';
import { TimeInputValue } from '@nextui-org/react';

/**
 * Formats a numeric string into a `hh:mm` time format.
 *
 * This function removes all non-numeric characters from the input and formats
 * it as a time string with hours (`hh`) and minutes (`mm`). If the input has
 * fewer than 3 numeric digits, it returns the cleaned input without the colon.
 *
 * @param {string} input - The user input string containing numeric and non-numeric characters.
 * @returns {string} - A string formatted as `hh:mm` if the input has at least 3 digits; otherwise, the cleaned input.
 *
 * @example
 * Formats the input into a time string:
 * const formatted = onChangeFormatTime("1130");  // Returns "11:30"
 *
 * @example
 * Returns the input as-is when fewer than 3 numeric characters are present:
 * const formatted = onChangeFormatTime("23");  // Returns "23"
 *
 * @example
 * Cleans input and returns an empty string if no numeric characters are present:
 * const formatted = onChangeFormatTime("abc");  // Returns ""
 */
export const onChangeFormatTime = (input: string) => {
  const value = input.replace(/\D/g, ''); // Remove non-numeric characters

  let formattedTime = value;

  if (value.length >= 3) {
    // Insert ":" after first two digits (for hours)
    formattedTime = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
  }
  return formattedTime;
};

export const onBlurFormatTime = (input: string) => {
  const [hours, minutes] = input.split(':').map(Number);

  const formattedHours = Math.min(Math.max(hours, 0), 23)
    .toString()
    .padStart(2, '0'); // Ensure hours are between 00 and 23
  const formattedMinutes = Math.min(Math.max(minutes || 0, 0), 59)
    .toString()
    .padStart(2, '0'); // Ensure minutes are between 00 and 59

  return `${formattedHours}:${formattedMinutes}`;
};

/**
 * Converts time from HH:mm:ss.SSS format to HH:mm.
 *
 * @param time - The time string in HH:mm:ss.SSS format.
 * @returns The formatted time string in HH:mm format.
 *
 * @example
 * const result = convertToHHmm("01:00:00.000"); // Returns "01:00"
 */
export const convertToHHmm = (time: string | undefined): string | undefined => {
  // Split the time string at the colon ":" and return the first two parts (HH and mm)
  if (!time) return undefined;
  return time.split(':').slice(0, 2).join(':');
};

/**
 * Converts a timestamp from ISO format with milliseconds (Z) to without milliseconds.
 *
 * @example
 * const result = removeMilliseconds("2024-09-12T02:00:00.000Z"); // Returns "2024-09-12T02:00:00"
 */
export const removeMilliseconds = (
  time: string | undefined,
): string | undefined => {
  if (!time) return undefined;
  return time.replace(/\.\d{3}Z$/, ''); // Remove the milliseconds and 'Z'
};

/**
 * Converts a time string from HH:mm format to HH:mm:ss.SSS.
 *
 * @param time - The time string in HH:mm format.
 * @returns The formatted time string in HH:mm:ss.SSS format.
 *
 * @example
 * const result = convertToFullTime("12:30"); // Returns "12:30:00.000"
 */
export const convertToFullTime = (time: string): string => {
  // Add ":00.000" to the time string to represent seconds and milliseconds
  return `${time}:00.000`;
};

/**
 * Extracts the hours and minutes from an ISO timestamp.
 *
 * @param timestamp - The ISO timestamp string (e.g., 2024-09-26T06:46:42.610Z).
 * @returns The time in HH:mm format.
 *
 * @example
 * const result = getHoursAndMinutes("2024-09-26T06:46:42.610Z"); // Returns "06:46"
 */
export const getHoursAndMinutes = (timestamp: string): string => {
  // Create a Date object from the ISO timestamp
  const date = new Date(timestamp);

  // Extract hours and minutes and format as HH:mm
  const hours = date.getUTCHours().toString().padStart(2, '0'); // Get hours in UTC and pad with '0' if necessary
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Get minutes in UTC and pad with '0' if necessary

  return `${hours}:${minutes}`;
};
/**
 * Returns the current time in hh:mm format using built-in formatting functions.
 *
 * @returns {string} - The current time as a string in hh:mm format.
 */
export const getCurrentTime = (timeStamp?: string) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timeStamp ?? new Date()));

export const getCurrentDate = (timestamp?: string) =>
  new Date(timestamp ?? new Date()).toISOString().split('T')[0];

export const convertToTimeObject = (isoString: string) => {
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
  const { hour, minute, second, millisecond } = inputTime;

  // Parse the provided date string
  const date = new Date(dateTime);

  // Set the time using the input object
  date.setUTCHours(hour);
  date.setUTCMinutes(minute);
  date.setUTCSeconds(second);
  date.setUTCMilliseconds(millisecond);

  // Return the ISO string
  return date.toISOString();
};
