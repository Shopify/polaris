import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import Subsection from '../Subsection';

describe('<Card.Subsection />', () => {
  it('can have any valid react element for children', () => {
    const childrenMarkup = <p>Some content</p>;

    const section = mountWithAppProvider(
      <Subsection>{childrenMarkup}</Subsection>,
    );

    expect(section.text()).toContain('Some content');
    expect(section.find('p').exists()).toBeTruthy();
  });
});
