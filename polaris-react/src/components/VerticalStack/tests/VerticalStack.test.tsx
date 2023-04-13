import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {VerticalStack} from '../VerticalStack';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<VerticalStack />', () => {
  it('renders children', () => {
    const verticalStack = mountWithApp(
      <VerticalStack>{children}</VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const verticalStack = mountWithApp(
      <VerticalStack>{children}</VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-vertical-stack-order': 'column',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const verticalStack = mountWithApp(
      <VerticalStack inlineAlign="center" gap="10">
        {children}
      </VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-vertical-stack-inline-align': 'center',
        '--pc-vertical-stack-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const verticalStack = mountWithApp(
      <VerticalStack gap={{xs: '2', md: '8'}}>{children}</VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-vertical-stack-gap-md': 'var(--p-space-8)',
        '--pc-vertical-stack-gap-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });
});
