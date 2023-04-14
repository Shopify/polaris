import {getPreviousYear} from '../get-previous-year';

describe('getPreviousYear()', () => {
  it('returns the previous year in UTC timezone', () => {
    const period = {
      since: '2018-05-28',
      until: '2018-05-28',
    };
    const expected = {
      since: new Date('2017-05-28T00:00:00.000+00:00'),
      until: new Date('2017-05-28T23:59:59.999+00:00'),
    };

    expect(getPreviousYear(period, 'UTC')).toStrictEqual(expected);
  });

  it('returns the previous year in non-UTC timezone', () => {
    const period = {
      since: '2018-05-28',
      until: '2018-05-28',
    };
    const expected = {
      since: new Date('2017-05-28T00:00:00.000+08:00'),
      until: new Date('2017-05-28T23:59:59.999+08:00'),
    };

    expect(getPreviousYear(period, 'Australia/Perth')).toStrictEqual(expected);
  });

  it('returns the previous year on a leap year', () => {
    const period = {
      since: '2016-05-28',
      until: '2016-05-28',
    };
    const expected = {
      since: new Date('2015-05-28T00:00:00.000+00:00'),
      until: new Date('2015-05-28T23:59:59.999+00:00'),
    };

    expect(getPreviousYear(period, 'UTC')).toStrictEqual(expected);
  });

  it('returns the previous year, the year after a leap year', () => {
    const period = {
      since: '2017-05-28',
      until: '2017-05-28',
    };
    const expected = {
      since: new Date('2016-05-28T00:00:00.000+00:00'),
      until: new Date('2016-05-28T23:59:59.999+00:00'),
    };

    expect(getPreviousYear(period, 'UTC')).toStrictEqual(expected);
  });

  it('returns the previous year on a leap year on February 29', () => {
    const period = {
      since: '2016-02-29',
      until: '2016-02-29',
    };
    const expected = {
      since: new Date('2015-02-28T00:00:00.000+00:00'),
      until: new Date('2015-02-28T23:59:59.999+00:00'),
    };

    expect(getPreviousYear(period, 'UTC')).toStrictEqual(expected);
  });

  it('returns the previous year when one period straddles a DST boundary', () => {
    const period = {
      since: '2018-03-26',
      until: '2018-03-26',
    };
    const expected = {
      since: new Date('2017-03-26T00:00:00.000+01:00'),
      until: new Date('2017-03-26T23:59:59.999+02:00'),
    };

    expect(getPreviousYear(period, 'Europe/Stockholm')).toStrictEqual(expected);
  });

  it('returns the previous year when current year is not in DST but previous year is', () => {
    const period = {
      since: '2013-03-30',
      until: '2013-03-30',
    };
    const expected = {
      since: new Date('2012-03-30T00:00:00.000+02:00'),
      until: new Date('2012-03-30T23:59:59.999+02:00'),
    };

    expect(getPreviousYear(period, 'Europe/Stockholm')).toStrictEqual(expected);
  });
});
