import {mountWithApp} from 'tests/utilities';

import {Subsection} from '../Subsection';

describe('<LegacyCard.Subsection />', () => {
  it('can have any valid react element for children', () => {
    const childrenMarkup = <p>Some content</p>;

    const section = mountWithApp(<Subsection>{childrenMarkup}</Subsection>);

    expect(section).toContainReactText('Some content');
    expect(section).toContainReactComponent('p');
  });
});
