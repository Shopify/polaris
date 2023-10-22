import {
  ensureTwoDigits,
  secondsToTimeComponents,
  secondsToTimestamp,
  secondsToDurationTranslationKey,
} from '../duration';

describe('<VideoThumbnail /> utilities', () => {
  describe('ensureTwoDigits', () => {
    it('stringifies the number when greater than 9', () => {
      expect(ensureTwoDigits(12)).toBe('12');
    });

    it('stringifies the number with a leading zero when less than 9', () => {
      expect(ensureTwoDigits(8)).toBe('08');
    });
  });

  describe('secondsToTimeComponents', () => {
    it('sets hours and minutes to zero when numSeconds is < 60 seconds', () => {
      const actualTimeComponents = secondsToTimeComponents(45);
      const expectedTimeComponents = {hours: 0, minutes: 0, seconds: 45};

      expect(actualTimeComponents).toStrictEqual(expectedTimeComponents);
    });

    it('sets hours to zero when numSeconds is > 60 seconds and < 60 minutes', () => {
      const actualTimeComponents = secondsToTimeComponents(145);
      const expectedTimeComponents = {hours: 0, minutes: 2, seconds: 25};

      expect(actualTimeComponents).toStrictEqual(expectedTimeComponents);
    });

    it('sets hours and minutes values when numSeconds is > 60 minutes', () => {
      const actualTimeComponents = secondsToTimeComponents(3745);
      const expectedTimeComponents = {hours: 1, minutes: 2, seconds: 25};

      expect(actualTimeComponents).toStrictEqual(expectedTimeComponents);
    });
  });

  describe('secondsToTimestamp', () => {
    describe('when numSeconds is > 60 minutes', () => {
      it('includes hours in the timestamp', () => {
        expect(secondsToTimestamp(4745)).toBe('1:19:05');
      });

      it('adds a leading zero to minutes when less than 10', () => {
        expect(secondsToTimestamp(3745)).toBe('1:02:25');
      });
    });

    describe('when numSeconds is > 60 seconds and < 60 minutes', () => {
      it('does not include hours in the timestamp', () => {
        expect(secondsToTimestamp(745)).toBe('12:25');
      });

      it('does not add a leading zero to minutes when less than 10', () => {
        expect(secondsToTimestamp(145)).toBe('2:25');
      });
    });
  });

  describe('secondsToDurationTranslationKey', () => {
    describe('when numSeconds is > 60 minutes', () => {
      it('sets the ".hours.other" translation keys when hours is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(7745);
        const expectedKey = '.hours.other';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".hours.one" translation keys when hours equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(3745);
        const expectedKey = '.hours.one';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".minutesAndSeconds" translation key when minutes and seconds are both greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(3745);
        const expectedKey = '.minutesAndSeconds';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".minutesAndSecond" translation key when minutes is greater than 1 and seconds are equal to 1', () => {
        const actualKey = secondsToDurationTranslationKey(3721);
        const expectedKey = '.minutesAndSecond';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".minuteAndSeconds" translation key when minutes equals 1 and seconds is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(3680);
        const expectedKey = '.minuteAndSeconds';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".minuteAndSecond" translation key when minutes and seconds are both equal to 1', () => {
        const actualKey = secondsToDurationTranslationKey(3661);
        const expectedKey = '.minuteAndSecond';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andMinutes" translation key when there are zero seconds and minutes is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(3720);
        const expectedKey = '.andMinutes';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andMinute" translation key when there are zero seconds and minutes equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(3660);
        const expectedKey = '.andMinute';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andSeconds" translation key when there are zero minutes and seconds is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(3608);
        const expectedKey = '.andSeconds';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andSecond" translation key when there are zero minutes and seconds equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(3601);
        const expectedKey = '.andSecond';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".only" translation key when there are zero minutes and seconds', () => {
        const actualKey = secondsToDurationTranslationKey(3600);
        const expectedKey = '.only';

        expect(actualKey).toContain(expectedKey);
      });
    });

    describe('when numSeconds is > 60 seconds and < 60 minutes', () => {
      it('sets the ".minutes.other" translation key when minutes is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(145);
        const expectedKey = '.minutes.other';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".minutes.one" translation key when minutes equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(80);
        const expectedKey = '.minutes.one';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andSeconds" translation key when seconds is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(145);
        const expectedKey = '.andSeconds';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".andSecond" translation key when seconds equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(61);
        const expectedKey = '.andSecond';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".only" translation key when there are zero seconds', () => {
        const actualKey = secondsToDurationTranslationKey(120);
        const expectedKey = '.only';

        expect(actualKey).toContain(expectedKey);
      });
    });

    describe('when numSeconds is < 60 seconds', () => {
      it('sets the ".seconds.other" translation key when seconds is greater than 1', () => {
        const actualKey = secondsToDurationTranslationKey(45);
        const expectedKey = '.seconds.other';

        expect(actualKey).toContain(expectedKey);
      });

      it('sets the ".seconds.one" translation key when seconds equals 1', () => {
        const actualKey = secondsToDurationTranslationKey(1);
        const expectedKey = '.seconds.one';

        expect(actualKey).toContain(expectedKey);
      });
    });
  });
});
