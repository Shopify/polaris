import {
  LegacyCard,
  Text,
  useIndexResourceState,
  IndexTable,
} from '@shopify/polaris';
import type {IndexTableRowProps, IndexTableProps} from '@shopify/polaris';
import React, {Fragment} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

export function WithSubHeadersExample() {
  interface Customer {
    id: string;
    url: string;
    name: string;
    location: string;
    orders: number;
    amountSpent: string;
    lastOrderDate: string;
    disabled?: boolean;
  }

  interface CustomerRow extends Customer {
    position: number;
  }

  interface CustomerGroup {
    id: string;
    position: number;
    customers: CustomerRow[];
  }

  interface Groups {
    [key: string]: CustomerGroup;
  }

  const rows = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 11,
      amountSpent: '$2,400',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2562',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$975',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '4102',
      url: '#',
      name: 'Colm Dillane',
      location: 'New York, USA',
      orders: 27,
      amountSpent: '$2885',
      lastOrderDate: 'May 31, 2023',
    },
    {
      id: '2564',
      url: '#',
      name: 'Al Chemist',
      location: 'New York, USA',
      orders: 19,
      amountSpent: '$1,209',
      lastOrderDate: 'April 4, 2023',
      disabled: true,
    },
    {
      id: '2563',
      url: '#',
      name: 'Larry June',
      location: 'San Francisco, USA',
      orders: 22,
      amountSpent: '$1,400',
      lastOrderDate: 'March 19, 2023',
    },
  ];

  const columnHeadings = [
    {title: 'Name', id: 'name'},
    {title: 'Location', id: 'location'},
    {
      alignment: 'end',
      id: 'order-count',
      title: 'Order count',
    },
    {
      alignment: 'end',
      hidden: false,
      id: 'amount-spent',
      title: 'Amount spent',
    },
  ];

  const groupRowsByLastOrderDate = () => {
    let position = -1;
    const groups: Groups = (rows as Customer[]).reduce(
      (groups: Groups, customer: Customer) => {
        const {lastOrderDate} = customer;
        if (!groups[lastOrderDate]) {
          position += 1;

          groups[lastOrderDate] = {
            position,
            customers: [],
            id: `order-${lastOrderDate.split(' ').join('-')}`,
          };
        }

        groups[lastOrderDate].customers.push({
          ...customer,
          position: position + 1,
        });

        position += 1;
        return groups;
      },
      {},
    );

    return groups;
  };

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(rows, {resourceFilter: ({disabled}) => !disabled});

  const orders = groupRowsByLastOrderDate();

  const rowMarkup = Object.keys(orders).map((orderDate, index) => {
    const {customers, position, id: subheaderId} = orders[orderDate];
    let selected: IndexTableRowProps['selected'] = false;

    const someCustomersSelected = customers.some(({id}) =>
      selectedResources.includes(id),
    );

    const allCustomersSelected = customers.every(({id}) =>
      selectedResources.includes(id),
    );

    if (allCustomersSelected) {
      selected = true;
    } else if (someCustomersSelected) {
      selected = 'indeterminate';
    }

    const selectableRows = rows.filter(({disabled}) => !disabled);
    const childRowRange: IndexTableRowProps['subHeaderRange'] = [
      selectableRows.findIndex((row) => row.id === customers[0].id),
      selectableRows.findIndex(
        (row) => row.id === customers[customers.length - 1].id,
      ),
    ];

    return (
      <Fragment key={subheaderId}>
        <IndexTable.Row
          subHeaderRange={childRowRange}
          id={subheaderId}
          position={position}
          selected={selected}
          disabled={index === 1}
        >
          <IndexTable.Cell
            colSpan={4}
            scope="colgroup"
            as="th"
            id={subheaderId}
          >
            {orderDate}
          </IndexTable.Cell>
        </IndexTable.Row>
        {customers.map(
          (
            {id, name, location, orders, amountSpent, position, disabled},
            rowIndex,
          ) => {
            return (
              <IndexTable.Row
                key={rowIndex}
                id={id}
                position={position}
                selected={selectedResources.includes(id)}
                disabled={disabled}
              >
                <IndexTable.Cell
                  headers={`${subheaderId} ${columnHeadings[0].id}`}
                >
                  <Text variant="bodyMd" fontWeight="semibold" as="span">
                    {name}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell
                  headers={`${subheaderId} ${columnHeadings[1].id}`}
                >
                  {location}
                </IndexTable.Cell>
                <IndexTable.Cell
                  headers={`${subheaderId} ${columnHeadings[2].id}`}
                >
                  <Text as="span" alignment="end" numeric>
                    {orders}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell
                  headers={`${subheaderId} ${columnHeadings[3].id}`}
                >
                  <Text as="span" alignment="end" numeric>
                    {amountSpent}
                  </Text>
                </IndexTable.Cell>
              </IndexTable.Row>
            );
          },
        )}
      </Fragment>
    );
  });

  return (
    <LegacyCard>
      <IndexTable
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

export default withPolarisExample(WithSubHeadersExample);
