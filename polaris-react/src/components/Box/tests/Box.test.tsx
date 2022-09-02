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
    const box = mountWithApp(<Box marginLeft="2">{children}</Box>);

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-margin-left': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const box = mountWithApp(
      <Box margin="1" marginLeft="2">
        {children}
      </Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-margin-bottom': 'var(--p-space-1)',
        '--pc-box-margin-left': 'var(--p-space-2)',
        '--pc-box-margin-right': 'var(--p-space-1)',
        '--pc-box-margin-top': 'var(--p-space-1)',
      } as React.CSSProperties,
    });
  });
});
