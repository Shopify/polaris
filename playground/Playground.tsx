import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  TopBar,
  AppProvider,
  Navigation,
  Page,
  Frame,
  Icon,
} from '@shopify/polaris';

const shopSwitcherProps = {
  searchPlaceholder: 'Search stores',
  noResultsLabel: 'No shops found.',
  activeIndex: 1,
  shops: [
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name:
        "Little Victories Europe Division over the rainbow where only Tobi can see it and maybe Jakob but that's it okay maybe Anthony.",
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name:
        "Little Victories Europe Division over the rainbow where only Tobi can see it and maybe Jakob but that's it okay maybe Anthony.",
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name:
        "Little Victories Europe Division over the rainbow where only Tobi can see it and maybe Jakob but that's it okay maybe Anthony.",
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name:
        "Little Victories Europe Division over the rainbow where only Tobi can see it and maybe Jakob but that's it okay maybe Anthony.",
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
    {
      url: 'https://little-victories.myshopify.io',
      name: 'Little Victories CA',
    },
  ],
};

export default class Playground extends React.Component<never, never> {
  render() {
    const searchField = (
      <TopBar.SearchField onChange={noop} value="" placeholder="Search" />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'item content'}],
          },
        ]}
        message={{
          title: 'Polaris',
          description: 'description',
          action: {onClick: noop, content: 'action content'},
          link: {to: '/', content: 'Link content'},
        }}
        name="Jakob Stecher"
        initials="DR"
        open={false}
        onToggle={noop}
      />
    );

    const supportMenu = (
      <TopBar.Menu
        actions={[
          {
            items: [{content: 'item content'}],
          },
        ]}
        activatorContent={<Icon source="help" />}
        open={false}
        onOpen={noop}
        onClose={noop}
      />
    );

    const shopSwitcher = shopSwitcherProps.shops.length > 1 && (
      <TopBar.ShopSwitcher {...shopSwitcherProps} />
    );

    const topBar = (
      <TopBar
        showNavigationToggle
        searchField={searchField}
        userMenu={userMenu}
        secondaryMenu={userMenu}
        shopSwitcher={shopSwitcher}
      />
    );

    const mobileUserMenu = (
      <Navigation.UserMenu
        actions={[
          {
            id: '0',
            items: [{content: 'item content'}],
          },
        ]}
        avatarInitials="KV"
        name="Koen Vendrik"
        detail="Store name"
        activatorAccessibilityLabel="Show user menu"
      />
    );

    const mobileShopSwitcher = (
      <Navigation.ShopSwitcher
        {...shopSwitcherProps}
        activatorAccessibilityLabel="Show shop switcher"
      />
    );

    const navigation = (
      <Navigation
        location="/"
        userMenu={mobileUserMenu}
        shopSwitcher={mobileShopSwitcher}
      >
        <Navigation.Section
          items={[
            {
              url: '/',
              label: 'Products',
              icon: 'view',
              disabled: false,
            },
          ]}
        />
      </Navigation>
    );

    return (
      <AppProvider
        theme={{
          logo: {
            topBarSource: './shopify-logo.png',
          },
        }}
      >
        <Frame
          topBar={topBar}
          navigation={navigation}
          showMobileNavigation={false}
        >
          <Page title="Playground" />
        </Frame>
      </AppProvider>
    );
  }
}
