import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ContentBlock} from '../ContentBlock';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<ContentBlock />', () => {
  it('renders children', () => {
    const stack = mountWithApp(
      <ContentBlock width="xs">{children}</ContentBlock>,
    );

    expect(stack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties', () => {
    const stack = mountWithApp(
      <ContentBlock width="sm">{children}</ContentBlock>,
    );

    expect(stack).toContainReactComponent('div', {
      style: {
        '--pc-content-block-width': 'var(--p-breakpoints-sm)',
      } as React.CSSProperties,
    });
  });
});
