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
      <VerticalStack inlineAlign="center" gap="1000">
        {children}
      </VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-vertical-stack-inline-align': 'center',
        '--pc-vertical-stack-gap-xs': 'var(--p-space-1000)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const verticalStack = mountWithApp(
      <VerticalStack gap={{xs: '200', md: '800'}}>{children}</VerticalStack>,
    );

    expect(verticalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-vertical-stack-gap-md': 'var(--p-space-800)',
        '--pc-vertical-stack-gap-xs': 'var(--p-space-200)',
      }) as React.CSSProperties,
    });
  });
});
