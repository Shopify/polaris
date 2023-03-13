import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AlphaStack} from '../AlphaStack';
import {Divider} from '../../Divider';

const text = 'This is a stack';
const children = [<p key="1">{text}</p>, <p key="2">{text}</p>];

describe('<AlphaStack />', () => {
  it('renders children', () => {
    const stack = mountWithApp(<AlphaStack>{children}</AlphaStack>);

    expect(stack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const stack = mountWithApp(<AlphaStack>{children}</AlphaStack>);

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-order': 'column',
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

  it('renders n-1 dividers', () => {
    const stack = mountWithApp(<AlphaStack withDivider>{children}</AlphaStack>);

    expect(stack).toContainReactComponentTimes(Divider, children.length - 1);
  });

  it('renders dividers with given style', () => {
    const stack = mountWithApp(
      <AlphaStack withDivider="dark">{children}</AlphaStack>,
    );

    expect(stack).toContainReactComponentTimes(Divider, children.length - 1, {
      borderStyle: 'dark',
    });
  });
});
