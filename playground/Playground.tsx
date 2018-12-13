import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  TopBar,
  AppProvider,
  Card,
  ActionList,
  Frame,
  Page,
  TextField,
  ThemeProvider,
} from '@shopify/polaris';

export default class TopBarExample extends React.Component {
  state = {
    userMenuOpen: false,
    searchActive: false,
    searchText: '',
  };

  render() {
    const {
      state,
      handleSearchChange,
      handleSearchResultsDismiss,
      toggleUserMenu,
    } = this;
    const {userMenuOpen, searchText, searchActive} = state;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'Back to Shopify', icon: 'arrowLeft'}],
          },
          {
            items: [{content: 'Community forums'}],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={userMenuOpen}
        onToggle={toggleUserMenu}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {content: 'Shopify help center'},
            {content: 'Community forums'},
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={handleSearchChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={() => {
          console.log('toggle navigation visibility');
        }}
      />
    );

    return (
      <AppProvider
        theme={{
          styles: {
            background: '#333',
            layeredBackground: '#222',
            layeredBorder: '#333',
            layeredShadow: '0 0 10px #111',
            color: '#fff',
            accent: '#111',
            accentDark: '#000',
            accentLight: '#222',
            accentSubdued: '#888',
            subdued: '#555',
          },
          logo: {
            width: 124,
            topBarSource:
              'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
            url: 'http://jadedpixel.com',
            accessibilityLabel: 'Jaded Pixel',
          },
        }}
      >
        <Frame topBar={topBarMarkup}>
          <Page title="Create shipment order">
            <Card
              secondaryFooterAction={{content: 'Cancel'}}
              primaryFooterAction={{content: 'Create'}}
              sectioned
            >
              <ThemeProvider
                theme={{
                  styles: {
                    layeredBackground: '#333',
                  },
                }}
              >
                <TextField
                  label="Street"
                  placeholder="e.g. 22 Main Street"
                  onChange={noop}
                />
              </ThemeProvider>
            </Card>
          </Page>
        </Frame>
      </AppProvider>
    );
  }

  toggleUserMenu = () => {
    this.setState(({userMenuOpen}) => ({userMenuOpen: !userMenuOpen}));
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleSearchChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };
}
