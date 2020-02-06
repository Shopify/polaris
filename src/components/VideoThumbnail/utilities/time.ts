const MINUTE = 60;
const HOUR = MINUTE * 60;

interface TimeProps {
  timeLabel: string | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
}
export function secondsToFormatPretty(numSeconds: number): TimeProps | null {
  if (isNaN(numSeconds) || numSeconds < 0) {
    return null;
  }

  const {hours, minutes, seconds} = secondsToTimeComponents(numSeconds);

  return {
    timeLabel: `${numSeconds > HOUR ? `${hours}:` : ''}${
      numSeconds > HOUR ? `${ensureTwoDigits(minutes)}` : `${minutes}`
    }:${ensureTwoDigits(seconds)}`,
    hours: numSeconds > HOUR ? hours : null,
    minutes,
    seconds,
  };
}

function ensureTwoDigits(num: number): string {
  return num > 9 ? String(num) : `0${num}`;
}

function secondsToTimeComponents(
  seconds: number,
): {hours: number; minutes: number; seconds: number} {
  return {
    hours: Math.floor(seconds / HOUR),
    minutes: Math.floor((seconds % HOUR) / MINUTE),
    seconds: seconds % MINUTE,
  };
}
