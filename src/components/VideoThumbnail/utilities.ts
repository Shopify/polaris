const MINUTE = 60;
const HOUR = MINUTE * 60;

interface TimeProps {
  timeLabel: string | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
}

export function secondsToFormatPretty(numSeconds?: number): TimeProps | null {
  if (!numSeconds || isNaN(numSeconds) || numSeconds < 0) {
    return null;
  }

  const {hours, minutes, seconds} = secondsToTimeComponents(numSeconds);
  const hasHours = numSeconds > HOUR;
  const hoursText = hasHours ? `${hours}:` : '';
  const minutesText = `${hasHours ? ensureTwoDigits(minutes) : minutes}:`;
  const secondsText = `${ensureTwoDigits(seconds)}`;

  return {
    seconds,
    minutes,
    hours: hasHours ? hours : null,
    timeLabel: `${hoursText}${minutesText}${secondsText}`,
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
