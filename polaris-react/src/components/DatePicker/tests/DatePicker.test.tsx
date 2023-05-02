import React from 'react';
import {mountWithApp} from 'tests/utilities';

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
    const datePicker = mountWithApp(<DatePicker month={0} year={2018} />);

    const weekday = datePicker.find(Weekday);
    expect(weekday).toContainReactText('Su');
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
      const datePicker = mountWithApp(
        <DatePicker month={0} year={2018} weekStartsOn={1} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday).toContainReactText('Mo');
    });

    it('renders Saturday as first day of the week', () => {
      const datePicker = mountWithApp(
        <DatePicker month={0} year={2018} weekStartsOn={6} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday).toContainReactText('Sa');
    });
  });

  describe('month', () => {
    it('passes the month value to Month', () => {
      const datePicker = mountWithApp(<DatePicker month={1} year={2018} />);

      const month = datePicker.find(Month);
      expect(month).toHaveReactProps({
        month: 1,
      });
    });
  });

  describe('year', () => {
    it('passes the year value to Month', () => {
      const datePicker = mountWithApp(<DatePicker month={1} year={2016} />);

      const year = datePicker.find(Month);
      expect(year).toHaveReactProps({
        year: 2016,
      });
    });
  });

  describe('multiMonth', () => {
    it('shows a second month when true', () => {
      const datePicker = mountWithApp(
        <DatePicker month={month} year={year} multiMonth />,
      );
      expect(datePicker.findAll(Month)).toHaveLength(2);
    });

    it('shows only one month when false', () => {
      const datePicker = mountWithApp(<DatePicker month={month} year={year} />);
      expect(datePicker.findAll(Month)).toHaveLength(1);
    });
  });

  describe('onChange()', () => {
    it('is called when Day datePicker is clicked', () => {
      const spy = jest.fn();
      const datePicker = mountWithApp(
        <Month
          accessibilityLabelPrefixes={['start', 'end']}
          focusedDate={new Date()}
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
          weekStartsOn={0}
          isCurrentMonth={false}
        />,
      );
      const day = datePicker.findAll(Day);
      day[0].find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });

    it('does not submit an enclosing form', () => {
      const spy = jest.fn();
      const datePicker = mountWithApp(
        <form onSubmit={spy}>
          <DatePicker month={0} year={2018} />
        </form>,
      );

      datePicker.findAll(Day)[1]!.trigger('onClick');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('focusDate', () => {
    it('passes the focused month value to Month if day has focus', () => {
      const datePicker = mountWithApp(<DatePicker month={3} year={2018} />);
      const dateObject = new Date('2018-04-01T00:00:00');
      datePicker.findAll(Day)[0]!.find('button')!.trigger('onFocus');
      expect(datePicker).toContainReactComponent(Month, {
        focusedDate: dateObject,
      });
    });
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const datePicker = mountWithApp(
        <DatePicker id={id} month={0} year={2018} />,
      );

      expect(datePicker.find('div'))!.toHaveReactProps({
        id,
      });
    });
  });

  it('unfocuses currently focused day when selected prop is updated', () => {
    const selected = {
      start: new Date(2016, 11, 8),
      end: new Date(2016, 11, 18),
    };
    const month = 0;
    const year = 2017;

    const datePicker = mountWithApp(
      <DatePicker
        selected={selected}
        month={month}
        year={year}
        onChange={noop}
      />,
    );

    datePicker.find(Day)!.find('button')!.trigger('onClick');

    expect(datePicker.find(Day)).toHaveReactProps({
      focused: true,
    });

    datePicker.setProps({selected: new Date(2016, 11, 8)});

    expect(datePicker.find(Day)).toHaveReactProps({
      focused: false,
    });
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
