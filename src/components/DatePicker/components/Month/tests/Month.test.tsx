import * as React from 'react';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider} from 'test-utilities';
import {Weekday} from '../..';
import Month from '../Month';

describe('<Month />', () => {
  describe('title', () => {
    it('passes the correct value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month month={0} year={2018} weekStartsOn={Weekdays.Monday} />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('title'),
      ).toBe('Mo');
    });
  });

  describe('label', () => {
    it('passes the correct value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month month={0} year={2018} weekStartsOn={Weekdays.Monday} />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('label'),
      ).toBe(1);
    });
  });

  describe('current', () => {
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const month = mountWithAppProvider(
      <Month
        month={currentMonth}
        year={currentYear}
        weekStartsOn={currentDay}
      />,
    );

    it('passes true to Weekday if month year and weekStartsOn are today', () => {
      expect(
        month
          .find(Weekday)
          .first()
          .prop('current'),
      ).toBe(true);
    });

    it('passes false to Weekday if month year and weekStartsOn are not today', () => {
      const month = mountWithAppProvider(
        <Month month={1} year={2016} weekStartsOn={Weekdays.Monday} />,
      );
      expect(
        month
          .find(Weekday)
          .first()
          .prop('current'),
      ).toBe(false);
    });
  });
});
