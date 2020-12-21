import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Weekday} from '../../Weekday';
import {Day} from '../../Day';
import {Month} from '../Month';

describe('<Month />', () => {
  describe('title', () => {
    it('passes the label and abbreviated value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month month={0} year={2018} weekStartsOn={1} />,
      );
      expect(month.find(Weekday).first().prop('title')).toBe('Mo');
      expect(month.find(Weekday).first().prop('label')).toBe('Monday');
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
      expect(month.find(Weekday).first().prop('current')).toBe(true);
    });

    it('passes false to Weekday if month year and weekStartsOn are not today', () => {
      const month = mountWithAppProvider(
        <Month month={1} year={2016} weekStartsOn={1} />,
      );
      expect(month.find(Weekday).first().prop('current')).toBe(false);
    });
  });

  describe('with allowRange prop to true', () => {
    it('range can be created even if start and end have different references', () => {
      const hoverDate = new Date('05 Jan 2018 00:00:00 GMT');
      const month = mountWithAppProvider(
        <Month
          month={0}
          year={2018}
          weekStartsOn={1}
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
