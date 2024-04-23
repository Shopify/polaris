import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  Frame,
  Icon,
  TopBar,
  Text,
  ThemeProvider,
  InlineStack,
} from '@shopify/polaris';
import {HeartIcon, NotificationIcon} from '@shopify/polaris-icons';

export default {
  component: ThemeProvider,
} as Meta<typeof ThemeProvider>;

export const Default = {
  render() {
    const [isHeartMenuOpen, setIsHeartMenuOpen] = useState(true);

    const toggleIsHeartMenuOpen = useCallback(
      () => setIsHeartMenuOpen((isHeartMenuOpen) => !isHeartMenuOpen),
      [],
    );

    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] =
      useState(false);

    const toggleIsNotificationsMenuOpen = useCallback(
      () =>
        setIsNotificationsMenuOpen(
          (isNotificationsMenuOpen) => !isNotificationsMenuOpen,
        ),
      [],
    );

    const heartMenu = (
      <ThemeProvider theme="light">
        <TopBar.Menu
          activatorContent={
            <ThemeProvider theme="dark-experimental">
              <span>
                <Icon source={HeartIcon} />
                <Text as="span" visuallyHidden>
                  Light theme popover button
                </Text>
              </span>
            </ThemeProvider>
          }
          open={isHeartMenuOpen}
          onOpen={toggleIsHeartMenuOpen}
          onClose={toggleIsHeartMenuOpen}
          actions={[
            {
              items: [{content: 'Light theme popover'}],
            },
          ]}
        />
      </ThemeProvider>
    );

    const notificationsMenu = (
      <ThemeProvider theme="dark-experimental">
        <TopBar.Menu
          activatorContent={
            <span>
              <Icon source={NotificationIcon} />
              <Text as="span" visuallyHidden>
                Dark theme popover button
              </Text>
            </span>
          }
          open={isNotificationsMenuOpen}
          onOpen={toggleIsNotificationsMenuOpen}
          onClose={toggleIsNotificationsMenuOpen}
          actions={[
            {
              items: [{content: 'Dark theme popover'}],
            },
          ]}
        />
      </ThemeProvider>
    );

    return (
      <Frame
        topBar={
          <TopBar
            secondaryMenu={
              <InlineStack>
                {heartMenu}
                {notificationsMenu}
              </InlineStack>
            }
          />
        }
      />
    );
  },
};
