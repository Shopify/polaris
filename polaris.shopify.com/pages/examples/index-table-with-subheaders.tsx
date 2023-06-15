import {
  IndexTable,
  LegacyCard,
  Text,
  HorizontalStack,
  Button,
} from '@shopify/polaris';
import {ChevronUpMinor} from '@shopify/polaris-icons';
import React, {Fragment} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithSubHeadersExample() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2562',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
    {
      id: '2563',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
    {
      id: '2564',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <Fragment key={id}>
        <IndexTable.Row
          header
          id={id}
          position={index}
          selected={index === 3 ? 'indeterminate' : index === 0}
          disabled={index === 1}
        >
          <IndexTable.Cell colSpan={3} header>
            May 31st 2023
          </IndexTable.Cell>
          <IndexTable.Cell>
            <HorizontalStack align="end">
              <Button
                icon={ChevronUpMinor}
                accessibilityLabel="Expand subheader"
                plain
              />
            </HorizontalStack>
          </IndexTable.Cell>
        </IndexTable.Row>
        {new Array(2).fill('').map((_, rowIndex) => (
          <IndexTable.Row
            key={rowIndex}
            id={`${id}${rowIndex}`}
            position={index}
            selected={index === 0 || (index === 3 && rowIndex === 0)}
            disabled={index === 1}
          >
            <IndexTable.Cell>
              <Text fontWeight="bold" as="span">
                {name}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{location}</IndexTable.Cell>
            <IndexTable.Cell>
              <Text as="span" alignment="end" numeric>
                {orders}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Text as="span" alignment="end" numeric>
                {amountSpent}
              </Text>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </Fragment>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        headings={[
          {title: 'Name'},
          {title: 'Location'},
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
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default withPolarisExample(WithSubHeadersExample);
