import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AlphaStack} from '../AlphaStack';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<AlphaStack />', () => {
  it('renders children', () => {
    const stack = mountWithApp(<AlphaStack>{children}</AlphaStack>);

    expect(stack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const stack = mountWithApp(<AlphaStack>{children}</AlphaStack>);

    expect(stack).toContainReactComponent('div', {
      style: {
        '--pc-stack-align': 'start',
        '--pc-stack-spacing': 'var(--p-space-4)',
      } as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const stack = mountWithApp(
      <AlphaStack align="center" spacing="10">
        {children}
      </AlphaStack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: {
        '--pc-stack-align': 'center',
        '--pc-stack-spacing': 'var(--p-space-10)',
      } as React.CSSProperties,
    });
  });
});
