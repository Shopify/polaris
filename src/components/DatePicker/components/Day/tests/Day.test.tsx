import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {Day} from '../Day';

function MockTable({children}: {children: React.ReactNode}) {
  return (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  );
}

describe('<Day />', () => {
  it('renders a button', () => {
    const currentDay = new Date(2017, 1, 1, 0, 0);
    const day = mountWithAppProvider(
      <MockTable>
        <Day focused day={currentDay} selected disabled={false} />
      </MockTable>,
    );
    expect(day.find('button')).toHaveLength(1);
  });

  describe('tabIndex', () => {
    it('sets the tabIndex to 0 if day is today', () => {
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <MockTable>
          <Day focused day={currentDay} selected disabled={false} />
        </MockTable>,
      );
      expect(day.find('button').prop('tabIndex')).toBe(0);
    });

    it('sets the tabIndex to -1 if day is disabled', () => {
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <MockTable>
          <Day focused day={currentDay} selected disabled />
        </MockTable>,
      );
      expect(day.find('button').prop('tabIndex')).toBe(-1);
    });
  });

  describe('onClick', () => {
    it('gets called if button is not disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <MockTable>
          <Day
            focused
            day={currentDay}
            selected
            disabled={false}
            onClick={spy}
          />
        </MockTable>,
      );
      day.find('button').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not get called if button is disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <MockTable>
          <Day focused day={currentDay} selected disabled onClick={spy} />
        </MockTable>,
      );
      day.find('button').simulate('click');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('gets called if button is focused', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithAppProvider(
        <MockTable>
          <Day day={currentDay} selected onFocus={spy} />
        </MockTable>,
      );
      day.find('button').simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('aria-label', () => {
    it('includes weekeday', () => {
      const weekday = 'Monday';
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day day={currentDay} weekday={weekday} />
        </MockTable>,
      );

      const ariaLabel = day.find('button')?.prop('aria-label');
      expect(ariaLabel).toContain(weekday);
    });

    it('includes selectedAccessibilityLabelPrefix when provided', () => {
      const selectedAccessibilityLabelPrefix = 'Start';
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day
            selected
            day={currentDay}
            selectedAccessibilityLabelPrefix={selectedAccessibilityLabelPrefix}
          />
        </MockTable>,
      );

      const ariaLabel = day.find('button')?.prop('aria-label');
      expect(ariaLabel).toContain(selectedAccessibilityLabelPrefix);
    });
  });
});
