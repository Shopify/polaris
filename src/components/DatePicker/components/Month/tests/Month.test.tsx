import * as React from 'react';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider} from 'test-utilities';
import {Weekday} from '../..';
import Month from '../Month';
import Day from '../../Day';

describe('<Month />', () => {
  describe('title', () => {
    it('passes the abbreviated value to the title prop of Weekday', () => {
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
    it('passes the numeric value to the label prop of Weekday', () => {
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

  describe('with allowRange prop to true', () => {
    it('range can be created even if start and end have different references', () => {
      const hoverDate = new Date('05 Jan 2018 00:00:00 GMT');
      const month = mountWithAppProvider(
        <Month
          month={0}
          year={2018}
          weekStartsOn={Weekdays.Monday}
          allowRange
          hoverDate={hoverDate}
          selected={{
            start: new Date('01 Jan 2018 00:00:00 GMT'),
            end: new Date('01 Jan 2018 00:00:00 GMT'),
          }}
        />,
      );

      expect(month.find(Day).get(2).props.inHoveringRange).toBeTruthy();
      expect(month.find(Day).get(10).props.inHoveringRange).toBeFalsy();
    });
  });
});
