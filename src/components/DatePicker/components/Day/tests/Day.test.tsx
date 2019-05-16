import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Day from '../Day';

describe('<Day />', () => {
  it('renders a button', () => {
    const currentDay = new Date(2017, 1, 1, 0, 0);
    const day = mountWithAppProvider(
      <Day focused day={currentDay} selected disabled={false} />,
    );
    expect(day.find('button')).toHaveLength(1);
  });

  describe('tabIndex', () => {
    it('sets the tabIndex to 0 if day is today', () => {
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <Day focused day={currentDay} selected disabled={false} />,
      );
      expect(day.find('button').prop('tabIndex')).toBe(0);
    });

    it('sets the tabIndex to -1 if day is disabled', () => {
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <Day focused day={currentDay} selected disabled />,
      );
      expect(day.find('button').prop('tabIndex')).toBe(-1);
    });
  });

  describe('onClick', () => {
    it('gets called if button is not disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <Day
          focused
          day={currentDay}
          selected
          disabled={false}
          onClick={spy}
        />,
      );
      day.simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not get called if button is disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <Day focused day={currentDay} selected disabled onClick={spy} />,
      );
      day.simulate('click');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('gets called if button is focused', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <Day day={currentDay} selected onFocus={spy} />,
      );
      day.simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
