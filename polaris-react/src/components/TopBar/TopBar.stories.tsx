import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ActionList, Frame, Icon, TopBar, Text, Avatar} from '@shopify/polaris';
import {
  ArrowLeftMinor,
  QuestionMarkMajor,
  EditMinor,
  TickSmallMinor,
  SearchMinor,
} from '@shopify/polaris-icons';

export default {
  component: TopBar,
} as ComponentMeta<typeof TopBar>;

export function Default() {
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
      actions={[
        {
          items: [
            {
              active: true,
              content: 'Jaded Pixel',
              prefix: <Avatar size="small" name="Jaded Pixel" />,
              suffix: <Icon source={TickSmallMinor} />,
              truncate: true,
            },
            {
              content:
                'Jaded Pixel 2.0 Jaded Pixel 2.0 Jaded Pixel 2.0 Jaded Pixel Pixel 2.0',
              prefix: <Avatar size="small" name="Jaded Pixel 2.0" />,
              truncate: true,
            },
            {
              content: 'View all 3 stores',
              prefix: <Icon source={SearchMinor} />,
            },
          ],
        },
        {
          items: [{content: 'Community forums'}],
        },
        {
          items: [{content: 'Help Center'}],
        },
        {
          items: [{content: 'Keyboard shortcuts'}],
        },
        {
          title: 'Dharma Johnson',
          items: [{content: 'Manage account'}, {content: 'Log out'}],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="JP"
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
