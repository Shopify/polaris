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
  noResultsMessage: 'No shops found.',
  activeIndex: 2,
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
      url:
        'https://little-victories-little-victories-little-victories-little-victories.myshopify.io',
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
  ],
};

export default class Playground extends React.Component<never, any> {
  state = {
    userMenuOpen: false,
    mobileUserMenuOpen: false,
  };

  render() {
    const {userMenuOpen, mobileUserMenuOpen} = this.state;

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
        open={userMenuOpen}
        onToggle={() => this.setState({userMenuOpen: !userMenuOpen})}
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
        secondaryMenu={supportMenu}
        shopSwitcher={shopSwitcher}
        onNavigationToggle={() =>
          this.setState({mobileUserMenuOpen: !mobileUserMenuOpen})
        }
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
            width: 124,
            shopSwitcherSource: './shopify-logo.png',
            topBarSource:
              'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
            contextualSaveBarSource:
              'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
          },
        }}
      >
        <Frame
          topBar={topBar}
          navigation={navigation}
          showMobileNavigation={mobileUserMenuOpen}
          onNavigationDismiss={() => this.setState({mobileUserMenuOpen: false})}
        >
          {/* <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => console.log('add form submit logic'),
              loading: false,
              disabled: false,
            }}
            discardAction={{
              onAction: () => console.log('add clear form logic'),
            }}
          /> */}
          <Page title="Playground" />
        </Frame>
      </AppProvider>
    );
  }
}
