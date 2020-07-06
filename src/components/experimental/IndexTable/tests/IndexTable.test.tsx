import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {EmptySearchResult} from '../../../EmptySearchResult';
import {Spinner} from '../../../Spinner';
import {IndexTable} from '../IndexTable';
import {IndexProvider} from '../../IndexProvider';

const mockTableItems = [
  {
    id: 'item-1',
    title: 'Item 1',
  },
  {
    id: 'item-2',
    title: 'Item 2',
  },
];

const mockTableHeadings = [{title: 'Title'}];

function Component({id, title}: {id: string; title: string}) {
  return (
    <tr key={id}>
      <td>{title}</td>
    </tr>
  );
}

const mockRenderRow = (item: any) => {
  return <Component {...item} key={item.id} />;
};

describe('<IndexTable>', () => {
  it('renders an <EmptySearchResult /> if no items are passed', () => {
    const index = mountWithAppProvider(
      <IndexProvider itemCount={0} selectedItemsCount={0}>
        <IndexTable headings={mockTableHeadings} />
      </IndexProvider>,
    );

    expect(index.find(EmptySearchResult)).toHaveLength(1);
  });

  it('renders a row for each item using renderItem', () => {
    const index = mountWithAppProvider(
      <IndexProvider itemCount={mockTableItems.length} selectedItemsCount={0}>
        <IndexTable headings={mockTableHeadings}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>
      </IndexProvider>,
    );

    expect(index.find(Component)).toHaveLength(2);
  });

  it('renders a spinner if loading is passed', () => {
    const index = mountWithAppProvider(
      <IndexProvider
        itemCount={mockTableItems.length}
        selectedItemsCount={0}
        loading
      >
        <IndexTable headings={mockTableHeadings}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>
      </IndexProvider>,
    );

    expect(index.find(Spinner)).toHaveLength(1);
  });
});
