import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider, trigger} from 'test-utilities';
import Button from '../../Button';
import {Day, Month, Weekday} from '../components';
import DatePicker from '../DatePicker';

describe('<DatePicker />', () => {
  const selected = {
    start: new Date(2016, 11, 8),
    end: new Date(2016, 11, 18),
  };
  const hoverDate = selected.end;
  const month = 0;
  const year = 2017;

  it('renders Sunday as first day of the week by default', () => {
    const datePicker = mountWithAppProvider(
      <DatePicker month={0} year={2018} />,
    );

    const weekday = datePicker.find(Weekday);
    expect(weekday.first().text()).toEqual('Sun');
  });

  describe('when weekStartsOn is passed', () => {
    it('renders Monday as first day of the week', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={Weekdays.Monday} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday.first().text()).toEqual('Mon');
    });

    it('renders Saturday as first day of the week', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={Weekdays.Saturday} />,
      );

      const weekday = datePicker.find(Weekday);
      expect(weekday.first().text()).toEqual('Sat');
    });
  });

  describe('month', () => {
    it('passes the correct value to Month', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={1} year={2018} />,
      );

      const month = datePicker.find(Month);

      expect(month.prop('month')).toEqual(1);
      expect(month.prop('year')).toEqual(2018);
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
          focusedDate={new Date()}
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
          weekStartsOn={Weekdays.Sunday}
        />,
      );
      const day = datePicker.find(Day);
      day.first().simulate('click');
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
    it('passes the correct value to Month if day has focus', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={3} year={2018} />,
      );
      const dateObject = new Date('2018-04-01T00:00:00');
      datePicker
        .find(Day)
        .first()
        .simulate('focus');
      expect(datePicker.find(Month).prop('focusedDate')).toEqual(dateObject);
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

  describe('onMonthChange', () => {
    it('calls onMonthChange with next month arguments when next month button is clicked', () => {
      const spy = jest.fn();
      const datePicker = mountWithAppProvider(
        <DatePicker month={11} year={2018} onMonthChange={spy} />,
      );

      const nextMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowRight'});

      trigger(nextMonthButton, 'onClick');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(0, 2019);
    });

    it('calls onMonthChange with previous month arguments when previous month button is clicked', () => {
      const spy = jest.fn();
      const datePicker = mountWithAppProvider(
        <DatePicker month={0} year={2018} onMonthChange={spy} />,
      );

      const previousMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowLeft'});

      trigger(previousMonthButton, 'onClick');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(11, 2017);
    });
  });

  describe('locale', () => {
    it('passes locale to Month component', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker locale="ja" month={0} year={2018} />,
      );

      expect(datePicker.find(Month).prop('locale')).toEqual('ja');
    });

    it('passes locale to both Month components if multiMonth is true', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker locale="ja" month={0} year={2018} multiMonth />,
      );

      const monthsWithExpectedLocale = datePicker
        .find(Month)
        .filter({locale: 'ja'});

      expect(monthsWithExpectedLocale).toHaveLength(2);
    });

    it('button accessibility labels default to en locale if no locale is set', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker month={10} year={2018} />,
      );

      const nextMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowRight'});

      const previousMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowLeft'});

      expect(nextMonthButton.prop('accessibilityLabel')).toEqual(
        'December 2018',
      );
      expect(previousMonthButton.prop('accessibilityLabel')).toEqual(
        'October 2018',
      );
    });

    it('button accessibility labels are formatted to specified locale', () => {
      const datePicker = mountWithAppProvider(
        <DatePicker locale="ja" month={10} year={2018} />,
      );

      const nextMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowRight'});

      const previousMonthButton = datePicker
        .find(Button)
        .filter({icon: 'arrowLeft'});

      expect(nextMonthButton.prop('accessibilityLabel')).toEqual('2018年12月');

      expect(previousMonthButton.prop('accessibilityLabel')).toEqual(
        '2018年10月',
      );
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

    datePicker
      .find(Day)
      .first()
      .simulate('click');

    expect(
      datePicker
        .find(Day)
        .first()
        .prop('focused'),
    ).toBe(true);

    datePicker.setProps({selected: new Date(2016, 11, 8)}).update();

    expect(
      datePicker
        .find(Day)
        .first()
        .prop('focused'),
    ).toBe(false);
  });
});
