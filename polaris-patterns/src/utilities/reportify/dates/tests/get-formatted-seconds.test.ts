import {getFormattedSeconds} from '../get-formatted-seconds';

describe('getFormattedSeconds', () => {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  it('formats values < 1 minute', () => {
    expect(getFormattedSeconds(15)).toBe('00:00:15');
  });

  it('formats values < 1 hour', () => {
    expect(getFormattedSeconds(minute * 15)).toBe('00:15:00');
  });

  it('formats values < 1 day', () => {
    expect(getFormattedSeconds(hour * 23)).toBe('23:00:00');
  });

  it('formats values > 1 day', () => {
    expect(getFormattedSeconds(day * 2)).toBe('48:00:00');
  });

  it('formats values requiring mixed units', () => {
    expect(getFormattedSeconds(day * 10 + hour * 10 + minute * 10 + 10)).toBe(
      '250:10:10',
    );
  });
});
