import React, {useState} from 'react';
import {
  ButtonGroup,
  Box,
  Button,
  AlphaHoverCard,
  Icon,
  Link,
  Text,
  BlockStack,
  InlineStack,
  Card,
} from '@shopify/polaris';
import type {PositionedOverlayProps} from '@shopify/polaris';
import {LocationIcon, OrderIcon} from '@shopify/polaris-icons';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function HoverCardWithChildActivator() {
  const [active, setActive] = useState(false);
  const [position, setPosition] =
    useState<PositionedOverlayProps['preferredPosition']>('below');

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
              <Icon tone="subdued" source={LocationIcon} />
              <Text tone="subdued" as="p">
                Albequerque, NM, USA
              </Text>
            </InlineStack>
            <InlineStack wrap={false} gap="100" align="start">
              <Box>
                <Icon tone="subdued" source={OrderIcon} />
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

  const positionControlBar = (
    <BlockStack gap="100" align="start" inlineAlign="center">
      <Text as="p" tone="subdued">
        Use the buttons below to change the hover card position
      </Text>
      <ButtonGroup variant="segmented">
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
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        height: '300px',
        width: '100%',
      }}
    >
      <InlineStack align="center" blockAlign="center">
        <BlockStack gap="500">
          {positionControlBar}

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingSm">
                Customer
              </Text>

              <AlphaHoverCard
                active={active}
                preferredPosition={position}
                preferredAlignment="center"
                content={customerHoverCardContent}
                toggleActive={setActive}
              >
                {activator}
              </AlphaHoverCard>
            </BlockStack>
          </Card>
          <Box minHeight="100px" />
        </BlockStack>
      </InlineStack>
    </div>
  );
}

export default withPolarisExample(HoverCardWithChildActivator);
