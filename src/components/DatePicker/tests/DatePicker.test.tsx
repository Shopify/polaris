import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {Day, Month, Weekday} from '../components';
import {DatePicker} from '../DatePicker';

describe('<DatePicker />', () => {
  const selected = {
    start: new Date(2016, 11, 8),
    end: new Date(2016, 11, 18),
  };
  const hoverDate = selected.end;
  const month = 0;
  const year = 2017;
  const defaultProps = {month, year};

  it('renders Sunday as first day of the week by default', () => {
    const datePicker = mountWithAppProvider(
      <DatePicker month={0} year={2018} />,
    );

    const weekday = datePicker.find(Weekday);
    expect(weekday.first().text()).toStrictEqual('Su');
  });

  describe('accessibility label', () => {
    it('passes dayAccessibilityLabelPrefix to Month', () => {
      const accessibilityLabel = 'accessibilityLabel';
      const datePicker = mountWithApp(
        <DatePicker
          {...defaultProps}
          dayAccessibilityLabelPrefix={accessibilityLabel}
        />,
      );

      expect(datePicker).toContainReactComponent(Month, {
        accessibilityLabelPrefixes: ['accessibilityLabel', 'End of range'],
      });
    });

    it('passes default accessibility labels to Month components when allowRange is true', () => {
      const datePicker = mountWithApp(
        <DatePicker {...defaultProps} allowRange />,
      );

      expect(datePicker).toContainReactComponent(Month, {
        accessibilityLabelPrefixes: ['Start of range', 'End of range'],
      });
    });
  });

  describe('when weekStartsOn is passed', () => {
    it('renders Monday as first day of the week', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={1} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday.first().text()).toStrictEqual('Mo');
    });

    it('renders Saturday as first day of the week', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={6} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday.first().text()).toStrictEqual('Sa');
    });
  });

  describe('month', () => {
    it('passes the month value to Month', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={1} year={2018} />,
      );

      const month = datePicker.find(Month);
      expect(month.prop('month')).toStrictEqual(1);
    });
  });

  describe('year', () => {
    it('passes the year value to Month', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={1} year={2016} />,
      );

      const year = datePicker.find(Month);
      expect(year.prop('year')).toStrictEqual(2016);
    });
  });

  describe('multiMonth', () => {
    it('shows a second month when true', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={month} year={year} multiMonth />,
      );
      expect(datePicker.find(Month)).toHaveLength(2);
    });

    it('shows only one month when false', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={month} year={year} />,
      );
      expect(datePicker.find(Month)).toHaveLength(1);
    });
  });

  describe('onChange()', () => {
    it('is called when Day datePicker is clicked', () => {
      const spy = jest.fn();
      const datePicker = mountWithAppProvider(
        <Month
          accessibilityLabelPrefixes={['start', 'end']}
          focusedDate={new Date()}
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
          weekStartsOn={0}
        />,
      );
      const day = datePicker.find(Day);
      day.first().find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('does not submit an enclosing form', () => {
      const spy = jest.fn();
      const datePicker = mountWithAppProvider(
        <form onSubmit={spy}>
          <DatePicker month={0} year={2018} />
        </form>,
      );

      const day = datePicker.find(Day);
      day.first().simulate('click');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('focusDate', () => {
    it('passes the focused month value to Month if day has focus', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={3} year={2018} />,
      );
      const dateObject = new Date('2018-04-01T00:00:00');
      datePicker.find(Day).first().find('button').simulate('focus');
      expect(datePicker.find(Month).prop('focusedDate')).toStrictEqual(
        dateObject,
      );
    });
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const datePicker = mountWithAppProvider(
        <DatePicker id={id} month={0} year={2018} />,
      );

      expect(datePicker.childAt(0).prop('id')).toBe(id);
    });
  });

  it('unfocuses currently focused day when selected prop is updated', () => {
    const selected = {
      start: new Date(2016, 11, 8),
      end: new Date(2016, 11, 18),
    };
    const month = 0;
    const year = 2017;

    const datePicker = mountWithAppProvider(
      <DatePicker
        selected={selected}
        month={month}
        year={year}
        onChange={noop}
      />,
    );

    datePicker.find(Day).find('button').first().simulate('click');

    expect(datePicker.find(Day).first().prop('focused')).toBe(true);

    datePicker.setProps({selected: new Date(2016, 11, 8)}).update();

    expect(datePicker.find(Day).first().prop('focused')).toBe(false);
  });

  it('passes isLastSelectedDay to Day when there is a range', () => {
    const selected = {
      start: new Date(2016, 11, 8),
      end: new Date(2016, 11, 18),
    };
    const month = 11;
    const year = 2016;

    const datePicker = mountWithApp(
      <DatePicker
        allowRange
        selected={selected}
        month={month}
        year={year}
        onChange={noop}
      />,
    );

    expect(datePicker).toContainReactComponent(Day, {isLastSelectedDay: true});
  });
});

function noop() {}
