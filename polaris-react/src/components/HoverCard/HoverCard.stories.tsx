import React, {useCallback, useState, useRef} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {PositionedOverlayProps} from '@shopify/polaris';
import {
  useIndexResourceState,
  ButtonGroup,
  Box,
  Button,
  HoverCard,
  useHoverCardActivatorWrapperProps,
  Badge,
  IndexTable,
  Icon,
  Link,
  Text,
  BlockStack,
  InlineStack,
  Card,
} from '@shopify/polaris';
import {LocationsMinor, OrdersMinor} from '@shopify/polaris-icons';

export default {
  component: HoverCard,
} as ComponentMeta<typeof HoverCard>;

export function Default() {
  const [active, setActive] = useState(false);
  const [position, setPosition] =
    useState<PositionedOverlayProps['preferredPosition']>('right');

  const handleChangePosition =
    (position: PositionedOverlayProps['preferredPosition']) => () => {
      setPosition(position);
    };

  const activator = (
    <Link removeUnderline url="#">
      Saul Goodman
    </Link>
  );

  const customerHoverCardContent = (
    <Box padding="400">
      <BlockStack gap="400">
        <BlockStack gap="0">
          <Text as="span" variant="headingSm">
            <Link removeUnderline>Saul Goodman</Link>
          </Text>
          <Text as="span" variant="bodyMd">
            <Link url="mailto:help@bettercallsaul.com">
              help@bettercallsaul.com
            </Link>
          </Text>
          <Text as="p" variant="bodyMd">
            <Link url="tel:+1505-842-5662">+1 505-842-5662</Link>
          </Text>
        </BlockStack>
        <Box width="100%">
          <BlockStack gap="100">
            <InlineStack wrap={false} gap="100" align="start">
              <Icon tone="subdued" source={LocationsMinor} />
              <Text tone="subdued" as="p">
                Albequerque, NM, USA
              </Text>
            </InlineStack>
            <InlineStack wrap={false} gap="100" align="start">
              <Box>
                <Icon tone="subdued" source={OrdersMinor} />
              </Box>
              <Text tone="subdued" as="p">
                8 Orders
              </Text>
            </InlineStack>
          </BlockStack>
        </Box>
      </BlockStack>
    </Box>
  );

  return (
    <div style={{margin: '0 auto', height: '600px', width: '960px'}}>
      <InlineStack align="center" blockAlign="center">
        <BlockStack gap="500">
          <Box minHeight="200px" />
          <BlockStack>
            <Text as="p" tone="subdued">
              Use the buttons below to change the hover card position
            </Text>
            <ButtonGroup variant="segmented" fullWidth>
              <Button
                pressed={position === 'left'}
                onClick={handleChangePosition('left')}
              >
                Left
              </Button>
              <Button
                pressed={position === 'right'}
                onClick={handleChangePosition('right')}
              >
                Right
              </Button>
              <Button
                pressed={position === 'above'}
                onClick={handleChangePosition('above')}
              >
                Above
              </Button>
              <Button
                pressed={position === 'below'}
                onClick={handleChangePosition('below')}
              >
                Below
              </Button>
            </ButtonGroup>
          </BlockStack>
          <Card>
            <BlockStack gap="300" inlineAlign="center">
              <Text as="h2" variant="headingSm">
                Customer
              </Text>
              <HoverCard
                active={active}
                preferredPosition={position}
                content={customerHoverCardContent}
                toggleActive={setActive}
              >
                {activator}
              </HoverCard>
            </BlockStack>
          </Card>
        </BlockStack>
      </InlineStack>
    </div>
  );
}

export function InTable() {
  interface CustomerDetailPreview {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    orders: number;
  }

  const orders = [
    {
      id: '1020',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1020
        </Text>
      ),
      date: 'Jul 20 at 4:34pm',
      customer: {
        id: '4102',
        email: 'yo@superduperkid.co',
        phone: '+19171111111',
        name: 'Colm Dillane',
        location: 'New York, NY, USA',
        orders: 27,
      },
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1019
        </Text>
      ),
      date: 'Jul 20 at 3:46pm',
      customer: {
        id: '2564',
        name: 'Al Chemist',
        email: 'foodvillain@idontwantthat.com',
        phone: '+12122222222',
        location: 'Los Angeles, CA, USA',
        orders: 19,
      },
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1018
        </Text>
      ),
      date: 'Jul 20 at 3.44pm',
      customer: {
        id: '2563',
        name: 'Larry June',
        email: 'yeehee@unclelarry.com',
        phone: '+1415NUMBERS',
        location: 'San Francisco, CA, USA',
        orders: 22,
      },
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const [activeHoverCard, setActiveHoverCard] = useState<{
    customer: CustomerDetailPreview | null;
  }>({
    customer: null,
  });

  const {
    className,
    activatorElement,
    handleMouseEnterActivator,
    handleMouseLeaveActivator,
  } = useHoverCardActivatorWrapperProps({snapToParent: true, hoverDelay: 100});

  const handleMouseEnterCustomer = useCallback(
    (customer: CustomerDetailPreview) =>
      (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveHoverCard({customer});
        handleMouseEnterActivator?.(event);
      },
    [handleMouseEnterActivator],
  );

  let customerHoverCardContent: React.ReactNode = null;

  if (activeHoverCard.customer) {
    const {name, phone, email, location, orders} = activeHoverCard?.customer;

    customerHoverCardContent = (
      <Box padding="400">
        <BlockStack gap="400">
          <BlockStack gap="0">
            <Text as="span" variant="headingSm">
              <Link removeUnderline>{name}</Link>
            </Text>
            <Text as="span" variant="bodyMd">
              <Link url={`mailto:${email}`}>{email}</Link>
            </Text>
            <Text as="p" variant="bodyMd">
              <Link url={`tel:${phone}`}>{phone}</Link>
            </Text>
          </BlockStack>
          <Box width="100%">
            <BlockStack gap="100">
              <InlineStack wrap={false} gap="100" align="start">
                <Box>
                  <Icon tone="subdued" source={LocationsMinor} />
                </Box>
                <Text tone="subdued" as="p">
                  {location}
                </Text>
              </InlineStack>
              <InlineStack wrap={false} gap="100" align="start">
                <Box>
                  <Icon tone="subdued" source={OrdersMinor} />
                </Box>
                <Text tone="subdued" as="p">
                  {`${orders} Orders`}
                </Text>
              </InlineStack>
            </BlockStack>
          </Box>
        </BlockStack>
      </Box>
    );
  }

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => {
      const linkMarkup = (
        <div
          className={className}
          onMouseEnter={handleMouseEnterCustomer(customer)}
          onMouseLeave={handleMouseLeaveActivator}
          style={{minHeight: '100%', padding: 'var(--p-space-150)'}}
        >
          <Link removeUnderline url="#">
            {customer.name}
          </Link>
        </div>
      );

      return (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {order}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{date}</IndexTable.Cell>
          <IndexTable.Cell flush>{linkMarkup}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="end" numeric>
              {total}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
          <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
        </IndexTable.Row>
      );
    },
  );

  return (
    <Card padding="0">
      <HoverCard
        snapToParent
        hoverDelay={100}
        activator={activatorElement}
        activatorWrapper="div"
        preferredPosition="right"
        content={customerHoverCardContent}
      />
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Order'},
          {title: 'Date'},
          {title: 'Customer'},
          {title: 'Total', alignment: 'end'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
