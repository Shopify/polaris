import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {VerticalStack} from '../VerticalStack';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<VerticalStack />', () => {
  it('renders children', () => {
    const stack = mountWithApp(<VerticalStack>{children}</VerticalStack>);

    expect(stack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const stack = mountWithApp(<VerticalStack>{children}</VerticalStack>);

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-order': 'column',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const stack = mountWithApp(
      <VerticalStack inlineAlign="center" gap="10">
        {children}
      </VerticalStack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-inline-align': 'center',
        '--pc-stack-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const stack = mountWithApp(
      <VerticalStack gap={{xs: '2', md: '8'}}>{children}</VerticalStack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-gap-md': 'var(--p-space-8)',
        '--pc-stack-gap-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });
});
