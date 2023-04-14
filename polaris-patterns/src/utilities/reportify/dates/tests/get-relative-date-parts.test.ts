import {getRelativeDateParts} from '../get-relative-date-parts';
import {TimeUnit} from '../types';

describe('getRelativeDateParts()', () => {
  it('returns null when string is invalid', () => {
    const relativeDateParts = getRelativeDateParts('foo');

    expect(relativeDateParts).toBeNull();
  });

  it('parses relative day string', () => {
    const relativeDateParts = getRelativeDateParts('-1d');

    expect(relativeDateParts).toStrictEqual({
      quantity: 1,
      unit: TimeUnit.Day,
    });
  });

  it('parses relative week string', () => {
    const relativeDateParts = getRelativeDateParts('-2w');

    expect(relativeDateParts).toStrictEqual({
      quantity: 2,
      unit: TimeUnit.Week,
    });
  });

  it('parses relative month string', () => {
    const relativeDateParts = getRelativeDateParts('-3m');

    expect(relativeDateParts).toStrictEqual({
      quantity: 3,
      unit: TimeUnit.Month,
    });
  });

  it('parses relative quarter string', () => {
    const relativeDateParts = getRelativeDateParts('-4q');

    expect(relativeDateParts).toStrictEqual({
      quantity: 4,
      unit: TimeUnit.Quarter,
    });
  });

  it('parses relative year string', () => {
    const relativeDateParts = getRelativeDateParts('-5y');

    expect(relativeDateParts).toStrictEqual({
      quantity: 5,
      unit: TimeUnit.Year,
    });
  });

  it('parses relative 0 day string without -', () => {
    const relativeDateParts = getRelativeDateParts('0d');

    expect(relativeDateParts).toStrictEqual({
      quantity: 0,
      unit: TimeUnit.Day,
    });
  });

  it('parses relative 0 week string without -', () => {
    const relativeDateParts = getRelativeDateParts('0w');

    expect(relativeDateParts).toStrictEqual({
      quantity: 0,
      unit: TimeUnit.Week,
    });
  });

  it('parses relative 0 month string without -', () => {
    const relativeDateParts = getRelativeDateParts('0m');

    expect(relativeDateParts).toStrictEqual({
      quantity: 0,
      unit: TimeUnit.Month,
    });
  });

  it('parses relative 0 quarter string without -', () => {
    const relativeDateParts = getRelativeDateParts('0q');

    expect(relativeDateParts).toStrictEqual({
      quantity: 0,
      unit: TimeUnit.Quarter,
    });
  });

  it('parses relative 0 year string without -', () => {
    const relativeDateParts = getRelativeDateParts('0y');

    expect(relativeDateParts).toStrictEqual({
      quantity: 0,
      unit: TimeUnit.Year,
    });
  });
});
