import {getDateFormatOptions} from '../get-date-format-options';

describe('getDateFormatOptions', () => {
  it('returns proper format options for second', () => {
    expect(getDateFormatOptions('second')).toStrictEqual({
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  });

  it('returns proper format options for hour', () => {
    expect(getDateFormatOptions('hour')).toStrictEqual({
      month: 'short',
      day: '2-digit',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  it('returns proper format options for day', () => {
    expect(getDateFormatOptions('day')).toStrictEqual({
      month: 'short',
      day: 'numeric',
    });
  });

  it('returns proper format options for week', () => {
    expect(getDateFormatOptions('week')).toStrictEqual({
      month: 'short',
      day: '2-digit',
    });
  });

  it('returns proper format options for month', () => {
    expect(getDateFormatOptions('month')).toStrictEqual({
      year: 'numeric',
      month: 'short',
    });
  });

  it('returns proper format options for year', () => {
    expect(getDateFormatOptions('year')).toStrictEqual({
      year: 'numeric',
    });
  });
});
