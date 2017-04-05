import * as React from 'react';
import {shallow} from 'enzyme';
import MonthComponent from '../Month';
import Day from '../Day';

describe('<DatePicker />', () => {
  const selected = {
    start: new Date(2016, 11, 8),
    end: new Date(2016, 11, 18),
  };
  const hoverDate = selected.end;
  const month = 0;
  const year = 2017;

  describe('onChange()', () => {
    it('is called on click on Day component', () => {
      const spy = jest.fn();
      const component = shallow(
        <MonthComponent
          selected={selected}
          hoverDate={hoverDate}
          month={month}
          year={year}
          onChange={spy}
        />,
      );
      const day = component.find(Day);
      day.first().simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
