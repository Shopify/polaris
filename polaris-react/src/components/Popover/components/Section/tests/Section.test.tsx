import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Section} from '../Section';

describe('<Section />', () => {
  const children = <p>Content</p>;

  it('renders its children', () => {
    const section = mountWithApp(<Section>{children}</Section>);

    expect(section).toContainReactHtml('<p>Content</p>');
  });

  it('renders a div', () => {
    const section = mountWithApp(<Section>{children}</Section>);

    expect(section).toContainReactComponent('div');
  });
});
