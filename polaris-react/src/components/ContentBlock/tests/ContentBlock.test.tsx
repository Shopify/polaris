import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ContentBlock} from '../ContentBlock';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<ContentBlock />', () => {
  it('renders children', () => {
    const contentBlock = mountWithApp(
      <ContentBlock width="md">{children}</ContentBlock>,
    );

    expect(contentBlock).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties', () => {
    const contentBlock = mountWithApp(
      <ContentBlock width="lg">{children}</ContentBlock>,
    );

    expect(contentBlock).toContainReactComponent('div', {
      className: expect.stringContaining('lg'),
    });
  });
});
