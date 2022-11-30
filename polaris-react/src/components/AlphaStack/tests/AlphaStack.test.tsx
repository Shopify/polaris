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
      style: expect.objectContaining({
        '--pc-stack-align': 'start',
        '--pc-stack-gap-xs': 'var(--p-space-4)',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const stack = mountWithApp(
      <AlphaStack align="center" gap="10">
        {children}
      </AlphaStack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-align': 'center',
        '--pc-stack-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const stack = mountWithApp(
      <AlphaStack gap={{xs: '2', md: '8'}}>{children}</AlphaStack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-gap-md': 'var(--p-space-8)',
        '--pc-stack-gap-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });
});
