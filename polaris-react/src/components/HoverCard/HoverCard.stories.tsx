import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
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
  Card,
} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';

import {useFeatures} from '../../utilities/features';

export default {
  component: HoverCard,
} as ComponentMeta<typeof HoverCard>;

export function Default() {
  const [active, setActive] = useState(false);

  const toggleHoverCardActive = useCallback((popover, isClosing) => {
    const currentHoverCard = isClosing ? null : popover;
    setActive(currentHoverCard);
  }, []);

  const activator = (
    <Link removeUnderline url="#">
      Colm Dillane
    </Link>
  );

  return (
    <div style={{height: '650px'}}>
      <Card>
        <Box minHeight="600px" />
        <VerticalStack align="center">
          <Box minHeight="400px">
            <VerticalStack gap="3">
              <Text as="h2" variant="headingSm">
                Customer
              </Text>
              <HoverCard
                toggleActive={setActive}
                active
                activator={activator}
                activatorWrapper="div"
                preferredPosition="right"
              >
                <Box padding="4">
                  <VerticalStack gap="0">
                    <Text as="span" variant="headingSm">
                      <Link removeUnderline>Colm Dillane</Link>
                    </Text>
                    <Text as="p">+1 800-KID-SUPR</Text>
                    <Link url="mailto:colm@kid.super">colm@kid.super</Link>
                  </VerticalStack>
                </Box>
              </HoverCard>
            </VerticalStack>
          </Box>
        </VerticalStack>
        <Box minHeight="800px" />
      </Card>
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
