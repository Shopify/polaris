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
});
