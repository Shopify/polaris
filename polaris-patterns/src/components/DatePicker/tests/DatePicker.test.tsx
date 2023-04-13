import React from 'react';
import {I18n, Weekday} from '@shopify/react-i18n';
import type {CustomRoot} from 'tests/utilities';
import {mountWithApp} from 'tests/utilities';

import {DatePicker} from '..';

describe('<DatePicker />', () => {
  let weekStartDay: jest.SpyInstance;

  beforeEach(() => {
    weekStartDay = jest.spyOn(I18n.prototype, 'weekStartDay');
  });

  afterEach(() => {
    weekStartDay.mockReset();
  });

  afterAll(() => {
    weekStartDay.mockRestore();
  });

  describe("Shop's country is Canada", () => {
    it("renders the weekStartDay based on the shop's country", () => {
      weekStartDay.mockImplementation(() => Weekday.Sunday);

      const datepicker = mountWithApp(<DatePicker month={0} year={2018} />);

      expect(getWeekdayHeadings(datepicker)).toStrictEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]);
    });
  });

  describe("Shop's country is France", () => {
    it("renders the weekStartDay based on the shop's country", () => {
      weekStartDay.mockImplementation(() => Weekday.Monday);
      const datepicker = mountWithApp(<DatePicker month={0} year={2018} />);

      expect(getWeekdayHeadings(datepicker)).toStrictEqual([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]);
    });
  });
});

function getWeekdayHeadings(datepicker: CustomRoot<any, any>) {
  return datepicker
    .findAll('th')
    .map((heading: any) => heading.prop('aria-label'));
}
