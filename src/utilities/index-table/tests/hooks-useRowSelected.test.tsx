import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {IndexTable, IndexTableProps} from '../../../components/IndexTable';
import {useRowSelected} from '../hooks';

function Component() {
  const selected = useRowSelected();
  const content = selected ? 'Selected' : 'Unselected';

  return <td>{content}</td>;
}

const defaultIndexTableProps: IndexTableProps = {
  itemCount: 1,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
  headings: [{title: 'Heading one'}, {title: 'Heading two'}],
};

describe('useRowHovered', () => {
  it('returns true when the Row is selected', () => {
    const component = mountWithApp(
      <IndexTable {...defaultIndexTableProps}>
        <IndexTable.Row id="id" selected position={1}>
          <Component />
        </IndexTable.Row>
      </IndexTable>,
    );

    expect(component).toContainReactText('Selected');
  });

  it('returns false when the Row is not selected', () => {
    const component = mountWithApp(
      <IndexTable {...defaultIndexTableProps}>
        <IndexTable.Row id="id" selected={false} position={1}>
          <Component />
        </IndexTable.Row>
      </IndexTable>,
    );

    expect(component).toContainReactText('Unselected');
  });
});
