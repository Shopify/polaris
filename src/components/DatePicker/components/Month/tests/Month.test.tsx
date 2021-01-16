import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {Weekday} from '../../Weekday';
import {Day} from '../../Day';
import {Month} from '../Month';

describe('<Month />', () => {
  const defaultProps = {
    month: 0,
    year: 2018,
    weekStartsOn: 1,
    accessibilityLabelPrefixes: ['Start', 'End'] as [string, string],
  };

  describe('title', () => {
    it('passes the label and abbreviated value to Weekday', () => {
      const month = mountWithAppProvider(
        <Month {...defaultProps} month={0} year={2018} weekStartsOn={1} />,
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
        {...defaultProps}
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
        <Month {...defaultProps} month={1} year={2016} weekStartsOn={1} />,
      );
      expect(month.find(Weekday).first().prop('current')).toBe(false);
    });
  });

  describe('with allowRange prop to true', () => {
    it('range can be created even if start and end have different references', () => {
      const hoverDate = new Date('05 Jan 2018 00:00:00 GMT');
      const month = mountWithAppProvider(
        <Month
          {...defaultProps}
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

  describe('Day', () => {
    it('passes weekday to day', () => {
      const month = mountWithApp(<Month {...defaultProps} />);

      expect(month).toContainReactComponent(Day, {weekday: expect.any(String)});
    });

    describe('selectedAccessibilityLabelPrefix', () => {
      it('passes the first accessibility label prefix to day when allowRange & isFirstSelectedDay are true', () => {
        const selected = {
          start: new Date('01 Jan 2018 00:00:00'),
          end: new Date('01 Jan 2018 00:00:00'),
        };
        const accessibilityLabelPrefixes = ['Custom start', 'Custom end'] as [
          string,
          string,
        ];
        const month = mountWithApp(
          <Month
            {...defaultProps}
            allowRange
            accessibilityLabelPrefixes={accessibilityLabelPrefixes}
            selected={selected}
          />,
        );

        expect(month).toContainReactComponentTimes(Day, 1, {
          isFirstSelectedDay: true,
          selectedAccessibilityLabelPrefix: accessibilityLabelPrefixes[0],
        });
      });

      it('passes the first accessibility label prefix to day when allowRange  is not true & first accessibility label prefix is defined', () => {
        const accessibilityLabelPrefixes = ['Custom start', 'Custom end'] as [
          string,
          string,
        ];
        const month = mountWithApp(
          <Month
            {...defaultProps}
            allowRange={false}
            accessibilityLabelPrefixes={accessibilityLabelPrefixes}
          />,
        );

        expect(month).toContainReactComponentTimes(Day, 31, {
          selectedAccessibilityLabelPrefix: accessibilityLabelPrefixes[0],
        });
      });

      it('passes the last accessibility label prefix to day when allowRange & isLastSelectedDay are true', () => {
        const selected = {
          start: new Date('01 Jan 2018 00:00:00'),
          end: new Date('02 Jan 2018 00:00:00'),
        };
        const accessibilityLabelPrefixes = ['Custom start', 'Custom end'] as [
          string,
          string,
        ];
        const month = mountWithApp(
          <Month
            {...defaultProps}
            allowRange
            accessibilityLabelPrefixes={accessibilityLabelPrefixes}
            selected={selected}
          />,
        );

        expect(month).toContainReactComponentTimes(Day, 1, {
          isLastSelectedDay: true,
          selectedAccessibilityLabelPrefix: accessibilityLabelPrefixes[1],
        });
      });
    });
  });
});
