import {parseRelativeDate} from '../parse-relative-date';
import {TimeUnit} from '../types';

describe('parseRelativeDate()', () => {
  it('subtracts 1 day', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 1;
    const unit = TimeUnit.Day;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-12-31T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 2 weeks', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 2;
    const unit = TimeUnit.Week;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-12-18T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 3 months', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 3;
    const unit = TimeUnit.Month;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-10-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 4 quarters', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 4;
    const unit = TimeUnit.Quarter;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 5 years', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 5;
    const unit = TimeUnit.Year;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2013-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 0 days', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 0;
    const unit = TimeUnit.Day;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2018-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 0 weeks', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 0;
    const unit = TimeUnit.Week;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2018-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 0 months', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 0;
    const unit = TimeUnit.Month;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2018-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 0 quarters', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 0;
    const unit = TimeUnit.Quarter;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2018-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 0 years', () => {
    const startDate = new Date('2018-01-01T00:00:00+00:00');
    const quantity = 0;
    const unit = TimeUnit.Year;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2018-01-01T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('ensures end of previous month if current month-to-date is longer in February', () => {
    const startDate = new Date('2017-03-31T00:00:00+00:00');
    const quantity = 1;
    const unit = TimeUnit.Month;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-02-28T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('ensures end of previous month if current month-to-date is longer in February on a leap year', () => {
    const startDate = new Date('2016-03-31T00:00:00+00:00');
    const quantity = 1;
    const unit = TimeUnit.Month;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2016-02-29T00:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('returns start of previous day if previous day is spring forward DST boundary', () => {
    const startDate = new Date('2018-03-26T00:00:00+02:00');
    const quantity = 1;
    const unit = TimeUnit.Day;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'Europe/Stockholm',
    );
    const expectedDate = new Date('2018-03-25T00:00:00+01:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });

  it('subtracts 2 quarters from June 28', () => {
    const startDate = new Date('2018-06-28T12:00:00+00:00');
    const quantity = 2;
    const unit = TimeUnit.Quarter;
    const parsedRelativeDate = parseRelativeDate(
      startDate,
      {quantity, unit},
      'UTC',
    );
    const expectedDate = new Date('2017-12-28T12:00:00+00:00');

    expect(parsedRelativeDate).toStrictEqual(expectedDate);
  });
});
