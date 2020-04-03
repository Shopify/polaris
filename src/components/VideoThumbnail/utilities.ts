const MINUTE = 60;
const HOUR = MINUTE * 60;

export function secondsToTimestamp(numSeconds: number) {
  const {hours, minutes, seconds} = secondsToTimeComponents(numSeconds);
  const hasHours = numSeconds > HOUR;
  const hoursText = hasHours ? `${hours}:` : '';
  const minutesText = `${hasHours ? ensureTwoDigits(minutes) : minutes}:`;
  const secondsText = `${ensureTwoDigits(seconds)}`;

  return `${hoursText}${minutesText}${secondsText}`;
}

export function secondsToDurationKey(numSeconds: number) {
  const {hours, minutes, seconds} = secondsToTimeComponents(numSeconds);
  let durationKey = 'Polaris.VideoThumbnail.playButtonA11yLabel.duration';

  if (hours) {
    durationKey += `.hours.${hours > 1 ? 'plural' : 'singular'}`;

    if (seconds) {
      if (minutes > 1) {
        durationKey += `${
          seconds > 1 ? '.minutesAndSeconds' : '.minutesAndSecond'
        }`;
      } else if (minutes === 1) {
        durationKey += `${
          seconds > 1 ? '.minuteAndSeconds' : '.minuteAndSecond'
        }`;
      } else {
        durationKey += `${seconds > 1 ? '.andSeconds' : '.andSecond'}`;
      }
    } else if (minutes) {
      durationKey += `${minutes > 1 ? '.andMinutes' : '.andMinute'}`;
    } else {
      durationKey += '.only';
    }
  } else if (minutes) {
    durationKey += `.minutes.${minutes > 1 ? 'plural' : 'singular'}`;

    if (seconds) {
      durationKey += `${seconds > 1 ? '.andSeconds' : '.andSecond'}`;
    } else {
      durationKey += '.only';
    }
  } else if (seconds) {
    durationKey += seconds > 1 ? '.seconds.plural' : '.seconds.singular';
  }

  return durationKey;
}

export function secondsToTimeComponents(
  seconds: number,
): {hours: number; minutes: number; seconds: number} {
  return {
    hours: Math.floor(seconds / HOUR),
    minutes: Math.floor((seconds % HOUR) / MINUTE),
    seconds: seconds % MINUTE,
  };
}

function ensureTwoDigits(num: number): string {
  return num > 9 ? String(num) : `0${num}`;
}
