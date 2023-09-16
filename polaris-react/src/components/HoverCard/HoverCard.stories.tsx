import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {PositionedOverlayProps} from '@shopify/polaris';
import {
  ActionList,
  ButtonGroup,
  Avatar,
  Box,
  Button,
  LegacyCard,
  FormLayout,
  HoverCard,
  ResourceList,
  Select,
  Listbox,
  TextField,
  Icon,
  Link,
  AutoSelection,
  Scrollable,
  EmptySearchResult,
  Text,
  VerticalStack,
  HorizontalStack,
  Card,
} from '@shopify/polaris';
import {SearchMinor, LocationsMinor, OrdersMinor} from '@shopify/polaris-icons';

import {useFeatures} from '../../utilities/features';

export default {
  component: HoverCard,
} as ComponentMeta<typeof HoverCard>;

export function Default() {
  const [active, setActive] = useState(false);
  const [position, setPosition] =
    useState<PositionedOverlayProps['preferredPosition']>('right');

  const toggleHoverCardActive = useCallback((popover, isClosing) => {
    const currentHoverCard = isClosing ? null : popover;
    setActive(currentHoverCard);
  }, []);

  const handleChangePosition =
    (position: PositionedOverlayProps['preferredPosition']) => () => {
      setPosition(position);
    };

  const activator = (
    <Link removeUnderline url="#">
      Saul Goodman
    </Link>
  );

  return (
    <div style={{height: '600px', width: '600px'}}>
      <HorizontalStack align="center" blockAlign="center">
        <VerticalStack gap="5">
          <Box minHeight="200px" />
          <VerticalStack>
            <Text as="p" color="subdued">
              Use the buttons below to change the hover card position
            </Text>
            <ButtonGroup segmented fullWidth>
              <Button onClick={handleChangePosition('left')}>Left</Button>
              <Button onClick={handleChangePosition('right')}>Right</Button>
              <Button onClick={handleChangePosition('above')}>Above</Button>
              <Button onClick={handleChangePosition('below')}>Below</Button>
            </ButtonGroup>
          </VerticalStack>
          <Card>
            <VerticalStack gap="3" inlineAlign="center">
              <Text as="h2" variant="headingSm">
                Customer
              </Text>
              <HoverCard
                toggleActive={setActive}
                active={active}
                activator={activator}
                activatorWrapper="div"
                preferredPosition={position}
                // preferredAlignment="left"
              >
                <Box padding="4">
                  <VerticalStack gap="4">
                    <VerticalStack gap="0">
                      <Text as="span" variant="headingSm">
                        <Link removeUnderline>Saul Goodman</Link>
                      </Text>
                      <Text as="span" variant="bodyMd">
                        <Link url="mailto:help@bettercallsaul.com">
                          help@bettercallsaul.com
                        </Link>
                      </Text>
                      <Text as="p" variant="bodyMd">
                        +1 505-842-5662
                      </Text>
                    </VerticalStack>
                    <Box width="100%">
                      <VerticalStack gap="1">
                        <HorizontalStack wrap={false} gap="1" align="start">
                          <Icon color="subdued" source={LocationsMinor} />
                          <Text color="subdued" as="p">
                            Albequerque, NM, USA
                          </Text>
                        </HorizontalStack>
                        <HorizontalStack wrap={false} gap="1" align="start">
                          <Box>
                            <Icon color="subdued" source={OrdersMinor} />
                          </Box>
                          <Text color="subdued" as="p">
                            8 Orders
                          </Text>
                        </HorizontalStack>
                      </VerticalStack>
                    </Box>
                  </VerticalStack>
                </Box>
              </HoverCard>
            </VerticalStack>
          </Card>
        </VerticalStack>
      </HorizontalStack>
    </div>
  );
}

const StopPropagation = ({children}: React.PropsWithChildren<any>) => {
  const stopEventPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={stopEventPropagation} onTouchStart={stopEventPropagation}>
      {children}
    </div>
  );
};
