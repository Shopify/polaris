import {mountWithApp} from 'tests/utilities';

import {DescriptionList} from '../DescriptionList';

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

    const descriptionList = mountWithApp(<DescriptionList items={items} />);

    expect(descriptionList.find('dt')).toContainReactText('Term 1');

    expect(descriptionList.find('dd')).toContainReactText('Description 1');
  });
});
