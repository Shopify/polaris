import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {TextContainer} from 'components';

import {Section} from '../Section';

describe('<Section />', () => {
  const children = (
    <TextContainer>
      <p>Content</p>
    </TextContainer>
  );
  const section = mountWithAppProvider(<Section>{children}</Section>);
  it('renders its children', () => {
    expect(section.contains(children)).toBe(true);
  });

  it('renders a div', () => {
    expect(section.find('div').exists()).toBe(true);
  });
});
