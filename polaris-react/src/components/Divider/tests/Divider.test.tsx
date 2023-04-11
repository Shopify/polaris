import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Divider} from '../Divider';

describe('<Divider />', () => {
  it('renders custom properties with default values', () => {
    const divider = mountWithApp(<Divider />);

    expect(divider).toContainReactComponent('hr', {
      style: {
        borderBlockStart:
          'var(--p-border-width-1) solid var(--p-color-border-subdued)',
      } as React.CSSProperties,
    });
  });

  it('renders custom style when passed in', () => {
    const divider = mountWithApp(<Divider borderColor="border" />);

    expect(divider).toContainReactComponent('hr', {
      style: expect.objectContaining({
        borderBlockStart: 'var(--p-border-width-1) solid var(--p-color-border)',
      }) as React.CSSProperties,
    });
  });
});
