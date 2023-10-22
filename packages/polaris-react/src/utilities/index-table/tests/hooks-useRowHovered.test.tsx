import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {IndexTable} from '../../../components/IndexTable';
// eslint-disable-next-line @shopify/strict-component-boundaries
import type {IndexTableProps} from '../../../components/IndexTable';
import {useRowHovered} from '../hooks';

function Component() {
  const hovered = useRowHovered();
  const content = hovered ? 'In' : 'Out';

  return <td>{content}</td>;
}

const defaultIndexTableProps: IndexTableProps = {
  itemCount: 1,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
  headings: [{title: 'Heading one'}, {title: 'Heading two'}],
};

describe('useRowHovered', () => {
  it('returns true when the Row is hovered', () => {
    const component = mountWithApp(
      <IndexTable {...defaultIndexTableProps}>
        <IndexTable.Row id="id" selected position={1}>
          <Component />
        </IndexTable.Row>
      </IndexTable>,
    );

    component.findAll('tr')[1]!.trigger('onMouseEnter');

    expect(component).toContainReactText('In');
  });

  it('returns false when the Row is not hovered', () => {
    const component = mountWithApp(
      <IndexTable {...defaultIndexTableProps}>
        <IndexTable.Row id="id" selected position={1}>
          <Component />
        </IndexTable.Row>
      </IndexTable>,
    );

    component.findAll('tr')[1]!.trigger('onMouseLeave');

    expect(component).toContainReactText('Out');
  });
});
