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

    expect(box).toContainReactComponent('div', {style: {}});
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

  it('tokenizes style props', () => {
    const box = mountWithApp(<Box color="text">{children}</Box>);

    expect(box).toContainReactComponent('div', {
      style: {
        color: 'var(--p-color-text)',
      },
    });
  });

  it('tokenizes responsive style props', () => {
    const box = mountWithApp(
      <Box sx={{color: {md: 'text', lg: 'text-brand-hover'}}}>{children}</Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: {
        // @ts-expect-error Yes, Typescript, CSS Custom properties do exist.
        '--_1': 'var(--_1lg,var(--_1md))',
        '--_1lg': 'var(--_lg) var(--p-color-text-brand-hover)',
        '--_1md': 'var(--_md) var(--p-color-text)',
        color: 'var(--_1)',
      },
    });
  });
});
