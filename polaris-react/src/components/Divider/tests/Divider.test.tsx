import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Divider} from '../Divider';

describe('<Divider />', () => {
  it('renders custom properties with default values', () => {
    const divider = mountWithApp(<Divider />);

    expect(divider).toContainReactComponent('hr', {
      style: {
        '--pc-divider-border-style': 'var(--p-border-divider)',
      } as React.CSSProperties,
    });
  });

  it('renders custom color when passed in', () => {
    const divider = mountWithApp(<Divider borderStyle="dark" />);

    expect(divider).toContainReactComponent('hr', {
      style: expect.objectContaining({
        '--pc-divider-border-style': 'var(--p-border-dark)',
      }) as React.CSSProperties,
    });
  });
});
