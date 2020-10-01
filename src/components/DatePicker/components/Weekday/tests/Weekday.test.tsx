import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Weekday} from '../Weekday';

describe('<Weekday />', () => {
  it('sets the text and label', () => {
    const weekday = mountWithAppProvider(
      <table>
        <thead>
          <tr>
            <Weekday title="Su" current={false} label="Sunday" />
          </tr>
        </thead>
      </table>,
    );
    expect(weekday.text()).toBe('Su');
    expect(weekday.find('th').prop('aria-label')).toBe('Sunday');
  });
});
