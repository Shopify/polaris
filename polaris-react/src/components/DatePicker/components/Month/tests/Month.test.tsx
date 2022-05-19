import React from 'react';
import {mountWithApp} from 'tests/utilities';

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
      const month = mountWithApp(
        <Month {...defaultProps} month={0} year={2018} weekStartsOn={1} />,
      );
      expect(month.findAll(Weekday)[0]).toHaveReactProps({
        title: 'Mo',
        label: 'Monday',
      });
    });
  });

  describe('current', () => {
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    it('passes true to Weekday if month year and weekStartsOn are today', () => {
      const month = mountWithApp(
        <Month
          {...defaultProps}
          month={currentMonth}
          year={currentYear}
          weekStartsOn={currentDay}
        />,
      );
      expect(month.findAll(Weekday)[0]).toHaveReactProps({
        current: true,
      });
    });

    it('passes false to Weekday if month year and weekStartsOn are not today', () => {
      const month = mountWithApp(
        <Month {...defaultProps} month={1} year={2016} weekStartsOn={1} />,
      );
      expect(month.findAll(Weekday)[0]).toHaveReactProps({
        current: false,
      });
    });
  });

  describe('with allowRange prop to true', () => {
    it('range can be created even if start and end have different references', () => {
      const hoverDate = new Date('05 Jan 2018 00:00:00 GMT');
      const month = mountWithApp(
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
      const days = month.findAll(Day);
      expect(days[1]).toHaveReactProps({inHoveringRange: true});
      expect(days[9]).toHaveReactProps({inHoveringRange: false});
    });
  });

  describe('Day', () => {
    it('passes weekday to day', () => {
      const month = mountWithApp(<Month {...defaultProps} />);

      expect(month).toContainReactComponent(Day, {weekday: expect.any(String)});
    });

    describe('disableSpecificDates', () => {
      it('is disabled if is one of disableSpecificDates', () => {
        const date = new Date('01 Jan 2018 00:00:00');
        const month = mountWithApp(
          <Month {...defaultProps} disableSpecificDates={[date]} />,
        );

        expect(month).toContainReactComponent(Day, {day: date, disabled: true});
      });

      it('is not disabled if is not one of disableSpecificDates', () => {
        const disabledDate = new Date('01 Jan 2018 00:00:00');
        const availableDate = new Date('02 Jan 2018 00:00:00');

        const month = mountWithApp(
          <Month {...defaultProps} disableSpecificDates={[disabledDate]} />,
        );

        expect(month).toContainReactComponent(Day, {
          day: availableDate,
          disabled: false,
        });
      });
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

      it('passes the first accessibility label prefix to day when allowRange is not true & first accessibility label prefix is defined', () => {
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
