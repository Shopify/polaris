import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider} from '../../../../tests/utilities';
import DatePicker from '../DatePicker';
import MonthComponent from '../components/Month/Month';
import Day from '../components/Day/Day';
import Weekday from '../components/Weekday';

describe('<DatePicker />', () => {
  const selected = {
    start: new Date(2016, 11, 8),
    end: new Date(2016, 11, 18),
  };
  const hoverDate = selected.end;
  const month = 0;
  const year = 2017;

  it('renders Sunday as first day of the week by default', () => {
    const component = mountWithAppProvider(
      <DatePicker month={0} year={2018} />,
    );

    const weekday = component.find(Weekday);
    expect(weekday.first().text()).toEqual('Su');
  });

  describe('when weekStartsOn is passed', () => {
    it('week starts on Monday', () => {
      const component = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={Weekdays.Monday} />,
      );

      const weekday = component.find(Weekday);
      expect(weekday.first().text()).toEqual('Mo');
    });

    it('week starts on Saturday', () => {
      const component = mountWithAppProvider(
        <DatePicker month={0} year={2018} weekStartsOn={Weekdays.Saturday} />,
      );

      const weekday = component.find(Weekday);
      expect(weekday.first().text()).toEqual('Sa');
    });
  });

  describe('onChange()', () => {
    it('is called on click on Day component', () => {
      const spy = jest.fn();
      const component = mountWithAppProvider(
        <MonthComponent
          focusedDate={new Date()}
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
          weekStartsOn={Weekdays.Sunday}
        />,
      );
      const day = component.find(Day);
      day.first().simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  it('does not submit an enclosing form', () => {
    const spy = jest.fn();
    const component = mountWithAppProvider(
      <form onSubmit={spy}>
        <DatePicker month={0} year={2018} />
      </form>,
    );

    const day = component.find(Day);
    day.first().simulate('click');
    expect(spy).not.toHaveBeenCalled();
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

    const component = mountWithAppProvider(
      <DatePicker
        selected={selected}
        month={month}
        year={year}
        onChange={noop}
      />,
    );

    component
      .find(Day)
      .first()
      .simulate('click');

    expect(
      component
        .find(Day)
        .first()
        .prop('focused'),
    ).toBe(true);

    component.setProps({selected: new Date(2016, 11, 8)}).update();

    expect(
      component
        .find(Day)
        .first()
        .prop('focused'),
    ).toBe(false);
  });
});
