import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';

import DescriptionList from '../DescriptionList';

describe('<DescriptionList />', () => {
  it('renders a dt element for an item term and a dd element for an item description', () => {
    const items = [
      {
        term: 'Term 1',
        description: 'Description 1',
      },
      {
        term: 'Term 2',
        description: 'Description 2',
      },
      {
        term: 'Term 3',
        description: 'Description 3',
      },
    ];

    const descriptionList = mountWithAppProvider(
      <DescriptionList items={items} />,
    );

    expect(
      descriptionList
        .find('dt')
        .first()
        .contains('Term 1'),
    ).toBe(true);

    expect(
      descriptionList
        .find('dd')
        .first()
        .contains('Description 1'),
    ).toBe(true);
  });
});
