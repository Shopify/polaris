import * as React from 'react';
import {
  TopBar,
  AppProvider,
  Card,
  ActionList,
  Frame,
  Page,
  TextField,
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

    const theme = {
      styles: {
        frame: {
          color: '#fff',
          background: '#383838',
        },
        card: {
          background: '#222',
          shadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        },
        topBar: {
          background: '#111',
          backgroundDarker: '#000',
          backgroundLighter: '#333',
          color: '#EEE',
        },
        textField: {
          background: '#333',
          color: '#fff',
          border: '#555',
          borderFocus: '#1795FC',
          placeholder: '#888',
        },
      },
      logo: {
        width: 124,
        topBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: 'http://jadedpixel.com',
        accessibilityLabel: 'Jaded Pixel',
      },
    };

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
      <AppProvider theme={theme}>
        <Frame topBar={topBarMarkup}>
          <Page title="Create shipment order">
            <Card
              secondaryFooterAction={{content: 'Cancel'}}
              primaryFooterAction={{content: 'Create'}}
              sectioned
            >
              <TextField label="Street" placeholder="e.g. 22 Main Street" />
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
