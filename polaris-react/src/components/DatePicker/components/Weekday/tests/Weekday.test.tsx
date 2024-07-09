import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Weekday} from '../Weekday';

describe('<Weekday />', () => {
  it('sets the text and label', () => {
    const weekday = mountWithApp(
      <table>
        <thead>
          <tr>
            <Weekday title="Su" current={false} label="Sunday" />
          </tr>
        </thead>
      </table>,
    );
    expect(weekday).toContainReactText('Su');
    expect(weekday.find('th'))!.toHaveReactProps({
      'aria-label': 'Sunday',
    });
  });
});
