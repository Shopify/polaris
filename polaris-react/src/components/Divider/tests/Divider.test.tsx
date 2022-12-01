import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Divider} from '../Divider';

describe('<Divider />', () => {
  it('renders custom properties with default values', () => {
    const divider = mountWithApp(<Divider />);

    expect(divider).toContainReactComponent('hr', {
      style: {
        '--pc-divider-color': 'var(--p-border-divider)',
        '--pc-divider-width': 'var(--p-border-width-1)',
      } as React.CSSProperties,
    });
  });

  it('renders custom color when passed in', () => {
    const divider = mountWithApp(<Divider color="dark" />);

    expect(divider).toContainReactComponent('hr', {
      style: expect.objectContaining({
        '--pc-divider-color': 'var(--p-border-dark)',
      }) as React.CSSProperties,
    });
  });

  it('renders custom width when passed in', () => {
    const divider = mountWithApp(<Divider width="5" />);

    expect(divider).toContainReactComponent('hr', {
      style: expect.objectContaining({
        '--pc-divider-width': 'var(--p-border-width-5)',
      }) as React.CSSProperties,
    });
  });
});
