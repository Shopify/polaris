import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Weekday} from '../Weekday';

describe('<Weekday />', () => {
  it('sets the text and label', () => {
    const weekday = mountWithAppProvider(
      <Weekday title="Su" current={false} label="Sunday" />,
    );
    expect(weekday.text()).toBe('Su');
    expect(weekday.find('div').prop('aria-label')).toBe('Sunday');
  });
});
