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
  se23,
}: {
  userActions?: UserMenuProps['actions'];
  name?: UserMenuProps['name'];
  detail?: UserMenuProps['detail'];
  initials?: UserMenuProps['initials'];
  customActivator?: UserMenuProps['customActivator'];
  message?: UserMenuProps['message'];
  se23?: boolean;
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
    width: se23 ? 92 : 96,
    topBarSource: se23
      ? 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-monotone-white-7edf88561b256e005e9b9d003c283c39dcbd74ec844dfc9a3912edeec39b4d7e.svg'
      : 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
    url: '#',
    accessibilityLabel: 'Hem Canada',
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

export function Default(_, context) {
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
      name="Xquenda Andreev"
      initials="XA"
      se23={context.globals.polarisSummerEditions2023}
    />
  );
}

export function WithCustomActivator(_, context) {
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
      <Avatar size="small" initials="XA" name="Xquenda Andreev" />
      <span style={{marginLeft: '0.5rem'}}>
        <Text as="p" alignment="start" fontWeight="medium" truncate>
          Xquenda Andreev
        </Text>
        <Text
          as="p"
          variant="bodySm"
          alignment="start"
          color={
            context.globals.polarisSummerEditions2023 ? undefined : 'subdued'
          }
          truncate
        >
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
      se23={context.globals.polarisSummerEditions2023}
    />
  );
}

export function WithMessage(_, context) {
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
      name="Xquenda Andreev"
      detail="Hem Canada"
      initials="XA"
      message={{
        title: 'Message title',
        description: 'Message description',
        link: {to: 'https://www.shopify.com', content: 'Link content'},
        action: {content: 'Action content', onClick: () => {}},
      }}
      se23={context.globals.polarisSummerEditions2023}
    />
  );
}
