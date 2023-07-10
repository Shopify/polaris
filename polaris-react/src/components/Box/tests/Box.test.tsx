import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Box} from '..';

const text = 'This is a box';
const children = <p>{text}</p>;

describe('Box', () => {
  it('renders children', () => {
    const box = mountWithApp(<Box>{children}</Box>);

    expect(box).toContainReactComponent('p', {children: text});
  });

  it('does not render custom properties by default', () => {
    const box = mountWithApp(<Box>{children}</Box>);

    expect(box).toContainReactComponent('div', {style: undefined});
  });

  it('only renders the custom property that matches the property passed in', () => {
    const box = mountWithApp(<Box paddingInlineStart="2">{children}</Box>);

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const box = mountWithApp(
      <Box padding="1" paddingInlineStart="2">
        {children}
      </Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-padding-block-end-xs': 'var(--p-space-1)',
        '--pc-box-padding-block-start-xs': 'var(--p-space-1)',
        '--pc-box-padding-inline-end-xs': 'var(--p-space-1)',
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });

  it('accepts padding based on breakpoints', () => {
    const box = mountWithApp(
      <Box padding={{xs: '2', md: '8'}}>{children}</Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-box-padding-block-end-md': 'var(--p-space-8)',
        '--pc-box-padding-block-end-xs': 'var(--p-space-2)',
        '--pc-box-padding-block-start-md': 'var(--p-space-8)',
        '--pc-box-padding-block-start-xs': 'var(--p-space-2)',
        '--pc-box-padding-inline-end-md': 'var(--p-space-8)',
        '--pc-box-padding-inline-end-xs': 'var(--p-space-2)',
        '--pc-box-padding-inline-start-md': 'var(--p-space-8)',
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });

  it('renders the aria attributes that matches the aria attributes passed in', () => {
    const box = mountWithApp(
      <Box aria-required aria-describedby="test">
        {children}
      </Box>,
    );

    expect(box).toContainReactComponent('div', {
      'aria-required': true,
      'aria-describedby': 'test',
    });
  });
});
