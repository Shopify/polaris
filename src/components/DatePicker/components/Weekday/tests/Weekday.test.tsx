import * as React from 'react';
import {Weekdays} from '@shopify/javascript-utilities/dates';
import {mountWithAppProvider} from 'tests/utilities';
import Weekday from '../Weekday';

describe('<Weekday />', () => {
  const mockProps = {
    title: 'Su',
    current: false,
    label: Weekdays.Sunday,
  };

  it('uses the title as content', () => {
    const weekday = mountWithAppProvider(<Weekday {...mockProps} title="Su" />);
    expect(weekday.text()).toBe('Su');
  });

  it('uses the label to create the aria-label', () => {
    const weekday = mountWithAppProvider(<Weekday {...mockProps} />);
    expect(weekday.find('div').prop('aria-label')).toBe('Sunday');
  });
});
