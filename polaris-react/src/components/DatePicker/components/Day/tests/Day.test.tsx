import type {ReactNode} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Day} from '../Day';

function MockTable({children}: {children: ReactNode}) {
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
    const day = mountWithApp(
      <MockTable>
        <Day focused day={currentDay} selected disabled={false} />
      </MockTable>,
    );
    expect(day).toContainReactComponentTimes('button', 1);
  });

  describe('tabIndex', () => {
    it('sets the tabIndex to 0 if day is today', () => {
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day focused day={currentDay} selected disabled={false} />
        </MockTable>,
      );
      expect(day).toContainReactComponent('button', {
        tabIndex: 0,
      });
    });

    it('sets the tabIndex to -1 if day is disabled', () => {
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day focused day={currentDay} selected disabled />
        </MockTable>,
      );
      expect(day).toContainReactComponent('button', {
        tabIndex: -1,
      });
    });
  });

  describe('onClick', () => {
    it('gets called if button is not disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithApp(
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
      day.find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not get called if button is disabled', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day focused day={currentDay} selected disabled onClick={spy} />
        </MockTable>,
      );
      day.find('button')!.trigger('onClick');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('gets called if button is focused', () => {
      const spy = jest.fn();
      const currentDay = new Date();
      const day = mountWithApp(
        <MockTable>
          <Day day={currentDay} selected onFocus={spy} />
        </MockTable>,
      );
      day.find('button')!.trigger('onFocus');
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
