import {TopBar, ActionList, Frame, Button} from '@shopify/polaris';
import {ArrowLeftMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TopBarExample() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const handleThemeChange = useCallback(
    () => setIsDarkTheme((isDarkTheme) => !isDarkTheme),
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

  const theme = {
    colors: {
      surface: '#FFFFFF',
      onsurface: '#212B36',
    },
    colorScheme: isDarkTheme ? 'dark' : 'light',
  };

  const logo = {
    width: 124,
    topBarSource: `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 446 92.6' fill='%23${
      isDarkTheme ? 'fff' : '000'
    }'%3E%3Cpath d='M112.2 51.6c-2.8-1.5-4.2-2.8-4.2-4.5 0-2.2 2-3.7 5.1-3.7 3.6 0 6.9 1.5 6.9 1.5l2.5-7.8s-2.3-1.8-9.2-1.8c-9.6 0-16.3 5.5-16.3 13.2 0 4.4 3.1 7.7 7.3 10.1 3.3 1.9 4.5 3.3 4.5 5.3 0 2.1-1.7 3.7-4.8 3.7-4.6 0-9-2.4-9-2.4L92.3 73s4 2.7 10.8 2.7c9.9 0 17-4.9 17-13.6 0-4.7-3.6-8-7.9-10.5zM151.5 35.2c-4.9 0-8.7 2.3-11.6 5.8l-.2-.1 4.2-22.1h-11L122.3 75h11l3.7-19.2c1.4-7.3 5.2-11.7 8.7-11.7 2.5 0 3.4 1.7 3.4 4.1 0 1.5-.2 3.3-.5 4.9l-4.1 22h11l4.3-22.7c.5-2.4.8-5.3.8-7.2-.1-6.3-3.3-10-9.1-10zM185.4 35.2c-13.2 0-22 12-22 25.3 0 8.5 5.3 15.4 15.1 15.4 13 0 21.8-11.6 21.8-25.3 0-7.9-4.6-15.4-14.9-15.4zM180 67.4c-3.7 0-5.3-3.2-5.3-7.2 0-6.3 3.3-16.6 9.2-16.6 3.9 0 5.2 3.3 5.2 6.6 0 6.8-3.3 17.2-9.1 17.2zM228.4 35.2c-7.4 0-11.6 6.5-11.6 6.5h-.2l.6-5.9h-9.7c-.5 4-1.4 10-2.2 14.6l-7.6 40.2h11l3-16.3h.2s2.3 1.4 6.5 1.4c12.9 0 21.4-13.2 21.4-26.6 0-7.3-3.3-13.9-11.4-13.9zm-10.5 32.3c-2.9 0-4.5-1.6-4.5-1.6l1.8-10.3c1.3-6.9 4.9-11.4 8.7-11.4 3.3 0 4.4 3.1 4.4 6.1 0 7.1-4.2 17.2-10.4 17.2zM255.5 19.4c-3.5 0-6.3 2.8-6.3 6.4 0 3.3 2.1 5.5 5.2 5.5h.2c3.4 0 6.4-2.3 6.5-6.4-.2-3.2-2.3-5.5-5.6-5.5zM240.1 75h11l7.5-38.9h-11.1zM286.5 36h-7.6l.4-1.8c.6-3.7 2.9-7.1 6.5-7.1 2 0 3.5.6 3.5.6l2.2-8.6s-1.9-1-6-1c-3.9 0-7.8 1.1-10.8 3.7-3.7 3.2-5.5 7.8-6.4 12.4L268 36h-5.1l-1.6 8.3h5.1L260.6 75h11l5.8-30.8h7.6l1.5-8.2zM313 36.1s-6.9 17.3-10 26.8h-.2c-.2-3-2.7-26.8-2.7-26.8h-11.6l6.6 35.8c.2.8.1 1.3-.2 1.8-1.3 2.5-3.4 4.9-6 6.6-2.1 1.5-4.4 2.5-6.2 3.1l3 9.3c2.2-.5 6.9-2.3 10.8-6 5-4.7 9.6-12 14.4-21.8l13.5-28.8H313zM54.3 10.8s-1 .3-2.7.8c-.3-.9-.7-2-1.3-3.2-1.9-3.6-4.7-5.6-8.1-5.6h-.7c-.1-.1-.2-.2-.3-.4C39.7.8 37.8.1 35.6.1 31.2.2 26.9 3.4 23.4 9c-2.5 3.9-4.4 8.9-4.9 12.7-5 1.6-8.5 2.6-8.6 2.7-2.5.8-2.6.9-2.9 3.3-.3 1.8-6.9 53-6.9 53l55 9.5V10.7c-.4 0-.7.1-.8.1zm-12.7 3.9c-2.9.9-6.1 1.9-9.3 2.9.9-3.4 2.6-6.8 4.7-9.1.8-.8 1.9-1.8 3.1-2.3 1.3 2.5 1.5 6.1 1.5 8.5zM35.7 3.2c1 0 1.9.2 2.6.7-1.2.6-2.3 1.5-3.4 2.6-2.8 3-4.9 7.6-5.7 12.1-2.6.8-5.2 1.6-7.6 2.4C23 13.9 28.9 3.4 35.7 3.2zm-8.5 40c.3 4.7 12.6 5.7 13.3 16.6.5 8.6-4.6 14.5-11.9 15-8.8.6-13.7-4.7-13.7-4.7l1.9-8s4.9 3.7 8.8 3.4c2.6-.2 3.5-2.2 3.4-3.7-.4-6.1-10.4-5.7-11-15.8-.5-8.4 5-17 17.2-17.8 4.7-.3 7.1.9 7.1.9l-2.8 10.5s-3.1-1.4-6.8-1.2c-5.5.5-5.6 3.9-5.5 4.8zm17.3-29.4c0-2.2-.3-5.3-1.3-7.9 3.3.6 4.9 4.4 5.6 6.6-1.3.4-2.7.8-4.3 1.3zm12.3 76.3l22.8-5.7S69.8 18 69.7 17.6c-.1-.5-.5-.7-.8-.7-.3 0-6.7-.1-6.7-.1s-3.9-3.8-5.4-5.2v78.5zM347.7 35.4c-5.7 0-10.3 2-13.6 5.8l.6-3.3c.2-1.1-.5-1.9-1.6-1.9s-2.1.9-2.3 1.9L321 88.7c-.2 1.1.5 1.9 1.6 1.9s2.1-.9 2.3-1.9l3.6-18.9c1.3 2.4 4.4 5.7 11.4 5.7 5.5 0 10-1.7 13.6-5 3.7-3.4 6.2-8.5 7.5-15.1 1.3-6.6.7-11.7-1.7-15.1-2.2-3.2-6.1-4.9-11.6-4.9zm-7 36.6c-8.3 0-11.6-5.7-9.5-16.5 2.1-10.9 7.4-16.5 15.6-16.5 9 0 12.4 5.4 10.2 16.5-2.1 11.2-7.3 16.5-16.3 16.5zm91.6-18.7c-4.9-1.8-9.6-3.5-8.7-8.1.4-2.3 2.3-6.2 9.9-6.2 4.2 0 6.9 1.2 9.2 4 .4.5.9.5 1.1.5 1 0 1.9-.8 2.1-1.8.1-.5 0-.8-.2-1.2-2.4-3.4-6.2-5.1-11.6-5.1-7.7 0-13.3 3.7-14.4 9.7-1.4 7.2 5 9.6 10.6 11.7 4.9 1.8 9.4 3.6 8.6 8-1.2 6.2-7.7 7.1-11.5 7.1-5.2 0-8.4-1.4-10.8-4.7-.3-.4-.7-.5-1.1-.5-.9 0-1.9.7-2.1 1.8-.1.5 0 .8.2 1.2 1.6 2.9 6.2 5.8 13.1 5.8 8.8 0 14.8-4 16.1-10.7 1.4-7.1-4.9-9.5-10.5-11.5zm-11.8-28h-4.1l.8-4.1c.2-1.1-.5-1.9-1.6-1.9s-2.1.9-2.3 1.9l-.8 4.1h-4.1c-1.1 0-2.1.9-2.3 1.9-.2 1.1.5 1.9 1.6 1.9h4.1l-.8 4.1c-.2 1.1.5 1.9 1.6 1.9s2.1-.9 2.3-1.9l.8-4.1h4.1c1.1 0 2.1-.9 2.3-1.9.2-1-.5-1.9-1.6-1.9zm-9 14.3c-1.1 0-2.1.9-2.3 1.9l-3.7 19.3c-2 9.8-8.1 11.2-13.7 11.2-10.2 0-10.4-5.8-9.4-11.5l4.4-22.7c.2-1.1-.5-1.9-1.6-1.9s-2.1.9-2.3 1.9l-4.4 22.7c-.9 4.6-.6 8 1 10.4 1.9 3.1 5.8 4.6 11.6 4.6s10.3-1.6 13.4-4.6c2.5-2.4 4.1-5.9 5-10.4l3.7-19c.1-1-.6-1.9-1.7-1.9zm-35.1-20.2c-1.1 0-2.1.9-2.3 1.9l-10 51.8c-.2 1.1.5 1.9 1.6 1.9s2.1-.9 2.3-1.9l10-51.8c.2-1-.5-1.9-1.6-1.9z'/%3E%3C/svg%3E`,
    url: 'https://plus.shopify.com',
    accessibilityLabel: 'Shopify Plus',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'Back to Shopify Plus', icon: ArrowLeftMinor}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      name="Scott"
      detail="Snow Devil"
      initials="S"
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

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div style={{height: '250px'}}>
      <Frame topBar={topBarMarkup} logo={logo}>
        <Button onClick={handleThemeChange}>
          Toggle between dark and light themes
        </Button>
      </Frame>
    </div>
  );
}

export default withPolarisExample(TopBarExample);
