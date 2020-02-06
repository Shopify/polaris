import {secondsToFormatPretty} from './time';

describe('VideoThummbnail utilities', () => {
  describe('secondsToFormatPretty', () => {
    it('accurately converts to the time format and trims leading 0s', () => {
      expect(secondsToFormatPretty(5)).toStrictEqual({
        hours: null,
        minutes: 0,
        seconds: 5,
        timeLabel: '0:05',
      });
      expect(secondsToFormatPretty(25)).toStrictEqual({
        hours: null,
        minutes: 0,
        seconds: 25,
        timeLabel: '0:25',
      });
      expect(secondsToFormatPretty(4 * 60 + 5)).toStrictEqual({
        hours: null,
        minutes: 4,
        seconds: 5,
        timeLabel: '4:05',
      });
      expect(secondsToFormatPretty(14 * 60 + 5)).toStrictEqual({
        hours: null,
        minutes: 14,
        seconds: 5,
        timeLabel: '14:05',
      });
      expect(secondsToFormatPretty(3600 * 2 + 14 * 60 + 5)).toStrictEqual({
        hours: 2,
        minutes: 14,
        seconds: 5,
        timeLabel: '2:14:05',
      });
      expect(secondsToFormatPretty(3600 * 12 + 14 * 60 + 5)).toStrictEqual({
        hours: 12,
        minutes: 14,
        seconds: 5,
        timeLabel: '12:14:05',
      });
    });

    it('returns an empty string when seconds is NaN or negative', () => {
      expect(secondsToFormatPretty(NaN)).toBeNull();
      expect(secondsToFormatPretty(-1)).toBeNull();
    });
  });
});
