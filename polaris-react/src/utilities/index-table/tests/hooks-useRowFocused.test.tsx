import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {IndexTable, IndexTableProps} from '../../../components/IndexTable';
import {useRowFocused} from '../hooks';

function Component() {
  const focused = useRowFocused();
  const content = focused ? 'In' : 'Out';

  return <td>{content}</td>;
}

const defaultIndexTableProps: IndexTableProps = {
  itemCount: 1,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
  headings: [{title: 'Heading one'}, {title: 'Heading two'}],
};

describe('useRowFocused', () => {
  describe('when selected', () => {
    it('returns true when the Row is focused', () => {
      const component = mountWithApp(
        <IndexTable {...defaultIndexTableProps}>
          <IndexTable.Row id="id" selected position={1}>
            <Component />
          </IndexTable.Row>
        </IndexTable>,
      );

      component.findAll('tr')[1]!.trigger('onFocus');

      expect(component).toContainReactText('In');
    });

    it('returns false when the Row is not focused', () => {
      const component = mountWithApp(
        <IndexTable {...defaultIndexTableProps}>
          <IndexTable.Row id="id" selected position={1}>
            <Component />
          </IndexTable.Row>
        </IndexTable>,
      );

      component.findAll('tr')[1]!.trigger('onBlur');

      expect(component).toContainReactText('Out');
    });
  });

  describe('when unselected', () => {
    it('returns true when the Row is focused', () => {
      const component = mountWithApp(
        <IndexTable {...defaultIndexTableProps}>
          <IndexTable.Row id="id" position={1}>
            <Component />
          </IndexTable.Row>
        </IndexTable>,
      );

      component.findAll('tr')[1]!.trigger('onFocus');

      expect(component).toContainReactText('In');
    });

    it('returns false when the Row is not focused', () => {
      const component = mountWithApp(
        <IndexTable {...defaultIndexTableProps}>
          <IndexTable.Row id="id" position={1}>
            <Component />
          </IndexTable.Row>
        </IndexTable>,
      );

      component.findAll('tr')[1]!.trigger('onBlur');

      expect(component).toContainReactText('Out');
    });
  });
});
