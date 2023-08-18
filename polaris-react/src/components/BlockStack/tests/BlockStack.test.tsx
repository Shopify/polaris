import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {BlockStack} from '../BlockStack';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<BlockStack />', () => {
  it('renders children', () => {
    const blockStack = mountWithApp(<BlockStack>{children}</BlockStack>);

    expect(blockStack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const blockStack = mountWithApp(<BlockStack>{children}</BlockStack>);

    expect(blockStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-block-stack-order': 'column',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const blockStack = mountWithApp(
      <BlockStack inlineAlign="center" gap="10">
        {children}
      </BlockStack>,
    );

    expect(blockStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-block-stack-inline-align': 'center',
        '--pc-block-stack-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const blockStack = mountWithApp(
      <BlockStack gap={{xs: '2', md: '8'}}>{children}</BlockStack>,
    );

    expect(blockStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-block-stack-gap-md': 'var(--p-space-8)',
        '--pc-block-stack-gap-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });
});
