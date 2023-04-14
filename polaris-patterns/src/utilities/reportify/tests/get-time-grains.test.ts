import {getTimeGrains} from '../get-time-grains';

const hour = {alias: 'Hour', field: 'hour'};
const day = {
  alias: 'Day',
  field: 'day',
};
const week = {
  alias: 'Week',
  field: 'week',
};
const month = {
  alias: 'Month',
  field: 'month',
};
const hourOfDay = {
  alias: 'Hour of day',
  field: 'hour_of_day',
};
const dayOfWeek = {
  alias: 'Day of week',
  field: 'day_of_week',
};
const quarter = {
  alias: 'Quarter',
  field: 'quarter',
};

describe('get-time-grains', () => {
  it('returns an array of time grains', () => {
    expect(getTimeGrains({since: new Date(), until: new Date()})).toStrictEqual(
      [hour],
    );

    expect(
      getTimeGrains({
        since: new Date('2019-12-01'),
        until: new Date('2020-01-01'),
      }),
    ).toStrictEqual([hour, day, week, month, hourOfDay, dayOfWeek]);

    expect(
      getTimeGrains({
        since: new Date('2019-10-01'),
        until: new Date('2020-01-01'),
      }),
    ).toStrictEqual([hour, day, week, month, quarter, hourOfDay, dayOfWeek]);
  });
});
