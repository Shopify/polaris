import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ActionList, Frame, Icon, TopBar, Text, Avatar} from '@shopify/polaris';
import {ArrowLeftMinor, QuestionMarkMajor} from '@shopify/polaris-icons';

import type {UserMenuProps} from '../../../build/ts/latest/src/components/TopBar';

export default {
  component: TopBar,
} as ComponentMeta<typeof TopBar>;

function TopBarWrapper({
  userActions,
  name,
  detail,
  initials,
  customActivator,
  message,
}: {
  userActions?: UserMenuProps['actions'];
  name?: UserMenuProps['name'];
  detail?: UserMenuProps['detail'];
  initials?: UserMenuProps['initials'];
  customActivator?: UserMenuProps['customActivator'];
  message?: UserMenuProps['message'];
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log('toggle navigation visibility');
  }, []);

  const logo = {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    url: '#',
    accessibilityLabel: 'Jaded Pixel',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={
        userActions
          ? userActions
          : [
              {
                items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
              },
              {
                items: [{content: 'Community forums'}],
              },
            ]
      }
      name={name ? name : 'Dharma'}
      detail={detail && detail}
      initials={initials ? initials : 'JD'}
      customActivator={customActivator}
      message={message}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionMarkMajor} />
          <Text as="span" visuallyHidden>
            Secondary menu
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{content: 'Community forums'}],
        },
      ]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div style={{height: '250px'}}>
      <Frame topBar={topBarMarkup} logo={logo} />
    </div>
  );
}

export function Default() {
  const userActions: UserMenuProps['actions'] = [
    {
      items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];
  return <TopBarWrapper userActions={userActions} name="Dharma" initials="D" />;
}

export function WithCustomActivator() {
  const userActions: UserMenuProps['actions'] = [
    {
      items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const customActivator = (
    <>
      <Avatar size="small" initials="D" name="Dharma" />
      <span style={{marginLeft: '0.5rem'}}>
        <Text as="p" alignment="start" fontWeight="medium" truncate>
          Dharma
        </Text>
        <Text
          as="p"
          variant="bodySm"
          alignment="start"
          color="subdued"
          truncate
        >
          Jaded Pixel
        </Text>
      </span>
    </>
  );

  return (
    <TopBarWrapper
      userActions={userActions}
      name="Dharma"
      detail="Jaded Pixel"
      customActivator={customActivator}
    />
  );
}

export function withMessage() {
  const userActions: UserMenuProps['actions'] = [
    {
      items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];

  return (
    <TopBarWrapper
      userActions={userActions}
      name="Dharma"
      detail="Jaded Pixel"
      initials="JD"
      message={{
        title: 'Message title',
        description: 'Message description',
        link: {to: 'https://www.shopify.com', content: 'Link content'},
        action: {content: 'Action content', onClick: () => {}},
      }}
    />
  );
}
