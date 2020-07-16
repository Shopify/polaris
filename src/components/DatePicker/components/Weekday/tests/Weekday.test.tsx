import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Weekday} from '../Weekday';

describe('<Weekday />', () => {
  const mockProps = {
    title: 'Su',
    current: false,
    label: 0,
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
