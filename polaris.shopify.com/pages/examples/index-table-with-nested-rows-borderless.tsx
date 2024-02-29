import {
  LegacyCard,
  Text,
  useIndexResourceState,
  IndexTable,
  useBreakpoints,
} from '@shopify/polaris';
import type {IndexTableRowProps, IndexTableProps} from '@shopify/polaris';
import React, {Fragment} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

export function WithNestedRowsBorderless() {
  interface Product {
    id: string;
    quantity: number;
    price: string;
    size: string;
    color: string;
    image?: string;
    disabled?: boolean;
  }

  interface ProductRow extends Product {
    position: number;
  }

  interface ProductGroup {
    id: string;
    position: number;
    products: ProductRow[];
  }

  interface Groups {
    [key: string]: ProductGroup;
  }

  const rows: Product[] = [
    {
      id: '3411',
      quantity: 11,
      price: '$2,400',
      size: 'Small',
      color: 'Orange',
    },
    {
      id: '2562',
      quantity: 30,
      price: '$975',
      size: 'Medium',
      color: 'Orange',
    },
    {
      id: '4102',
      quantity: 27,
      price: '$2885',
      size: 'Large',
      color: 'Orange',
    },
    {
      id: '2564',
      quantity: 19,
      price: '$1,209',
      size: 'Small',
      color: 'Red',
      disabled: true,
    },
    {
      id: '2563',
      quantity: 22,
      price: '$1,400',
      size: 'Small',
      color: 'Green',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'column-header--size'},
    {
      hidden: false,
      id: 'column-header--price',
      title: 'Price',
    },
    {
      alignment: 'end',
      id: 'column-header--quantity',
      title: 'Available',
    },
  ];

  const groupRowsByGroupKey = (
    groupKey: keyof Product,
    resolveId: (groupVal: string) => string,
  ) => {
    let position = -1;
    const groups: Groups = rows.reduce((groups: Groups, product: Product) => {
      const groupVal: string = product[groupKey] as string;
      if (!groups[groupVal]) {
        position += 1;

        groups[groupVal] = {
          position,
          products: [],
          id: resolveId(groupVal),
        };
      }
      groups[groupVal].products.push({
        ...product,
        position: position + 1,
      });

      position += 1;
      return groups;
    }, {});

    return groups;
  };

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows as unknown as {[key: string]: unknown}[], {
      resourceFilter: ({disabled}) => !disabled,
    });

  const groupedProducts = groupRowsByGroupKey(
    'color',
    (color) => `color--${color.toLowerCase()}`,
  );

  const rowMarkup = Object.keys(groupedProducts).map((color, index) => {
    const {products, position, id: productId} = groupedProducts[color];
    let selected: IndexTableRowProps['selected'] = false;

    const someProductsSelected = products.some(({id}) =>
      selectedResources.includes(id),
    );

    const allProductsSelected = products.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allProductsSelected) {
      selected = true;
    } else if (someProductsSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const rowRange: IndexTableRowProps['selectionRange'] = [
      selectableRows.findIndex((row) => row.id === products[0].id),
      selectableRows.findIndex(
        (row) => row.id === products[products.length - 1].id,
      ),
    ];

    const disabled = products.every(({disabled}) => disabled);

    return (
      <Fragment key={productId}>
        <IndexTable.Row
          rowType="data"
          selectionRange={rowRange}
          id={`Parent-${index}`}
          position={position}
          selected={selected}
          disabled={disabled}
          accessibilityLabel={`Select all products which have color ${color}`}
        >
          <IndexTable.Cell scope="col" id={productId}>
            <Text as="span" fontWeight="semibold">
              {color}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell />
          <IndexTable.Cell />
        </IndexTable.Row>
        {products.map(
          ({id, size, quantity, price, position, disabled}, rowIndex) => (
            <IndexTable.Row
              rowType="child"
              key={rowIndex}
              id={id}
              position={position}
              selected={selectedResources.includes(id)}
              disabled={disabled}
              borderless
            >
              <IndexTable.Cell
                scope="row"
                headers={`${columnHeadings[0].id} ${productId}`}
              >
                <Text variant="bodyMd" as="span">
                  {size}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="span" numeric>
                  {price}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text as="span" alignment="end" numeric>
                  {quantity}
                </Text>
              </IndexTable.Cell>
            </IndexTable.Row>
          ),
        )}
      </Fragment>
    );
  });

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
        onSelectionChange={handleSelectionChange}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        resourceName={resourceName}
        itemCount={rows.length}
        headings={columnHeadings as IndexTableProps['headings']}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default withPolarisExample(WithNestedRowsBorderless);
