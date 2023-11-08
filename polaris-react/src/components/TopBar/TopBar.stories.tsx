import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ActionList, Frame, Icon, TopBar, Text, Avatar} from '@shopify/polaris';
import {ArrowLeftIcon, QuestionMarkIcon} from '@shopify/polaris-icons';

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
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
    width: 86,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    url: '#',
    accessibilityLabel: 'Shopify',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={
        userActions
          ? userActions
          : [
              {
                items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
              },
              {
                items: [{content: 'Community forums'}],
              },
            ]
      }
      name={name ? name : 'Xquenda Andreev'}
      detail={detail && detail}
      initials={initials ? initials : 'JD'}
      customActivator={customActivator}
      customWidth="300px"
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
          <Icon source={QuestionMarkIcon} />
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
      items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];
  return (
    <TopBarWrapper
      userActions={userActions}
      name="Xquenda Andreev"
      initials="XA"
    />
  );
}

export function WithCustomActivator() {
  const userActions: UserMenuProps['actions'] = [
    {
      items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const customActivator = (
    <>
      <Avatar size="sm" initials="XA" name="Xquenda Andreev" />
      <span style={{marginLeft: '0.5rem'}}>
        <Text as="p" alignment="start" fontWeight="medium" truncate>
          Xquenda Andreev
        </Text>
        <Text as="p" variant="bodySm" alignment="start" truncate>
          Hem Canada
        </Text>
      </span>
    </>
  );

  return (
    <TopBarWrapper
      userActions={userActions}
      name="Xquenda Andreev"
      detail="Hem Canada"
      customActivator={customActivator}
    />
  );
}

export function WithMessage() {
  const userActions: UserMenuProps['actions'] = [
    {
      items: [{content: 'Back to Shopify', icon: ArrowLeftIcon}],
    },
    {
      items: [{content: 'Community forums'}],
    },
  ];

  return (
    <TopBarWrapper
      userActions={userActions}
      name="Xquenda Andreev"
      detail="Hem Canada"
      initials="XA"
      message={{
        title: 'Message title',
        description: 'Message description',
        link: {to: 'https://www.shopify.com', content: 'Link content'},
        action: {content: 'Action content', onClick: () => {}},
      }}
    />
  );
}
