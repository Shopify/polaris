import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {Subsection} from '../Subsection';

describe('<Card.Subsection />', () => {
  it('can have any valid react element for children', () => {
    const childrenMarkup = <p>Some content</p>;

    const section = mountWithApp(<Subsection>{childrenMarkup}</Subsection>);

    expect(section).toContainReactText('Some content');
    expect(section).toContainReactComponent('p');
  });
});
