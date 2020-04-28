---
name: Top bar
category: Structure
keywords:
  - global chrome
  - global features
  - topbar
  - top bar
  - nav bar
  - bar
  - navbar
  - brand
  - search
  - user
  - menu
  - logo
omitAppProvider: true
---

# Top bar

Merchants can use the top bar component to search, access menus, and navigate by clicking on the logo. It’s always visible at the top of non-embedded interfaces like Shopify or Shopify Plus. Third-party apps that use the top bar can customize the color to match their brand using the [app provider](https://polaris.shopify.com/components/structure/app-provider) component and are required to use their own logo.

---

## Required components

The top bar component must be passed to the [frame](https://polaris.shopify.com/components/structure/frame) component.

---

## Best practices

The top bar component should:

- Not provide global navigation for an application
  - Use the [navigation component](https://polaris.shopify.com/components/structure/navigation) instead
- Include search to help merchants find resources and navigate an application
- Include a user menu component to indicate the logged-in merchant and provide them with global actions
- Provide a color through the [app provider](https://polaris.shopify.com/components/structure/app-provider) component to style the background
- The global menu text should contrast with the rest of the top bar and pass the minimum contrast ratio of the WCAG 2.0 guidelines
- Use an SVG file for the logo
- Use a logo that passes the minimum contrast ratio of the WCAG 2.0 guidelines when compared to the top bar background color
- Show the navigation toggle so it appears on small screen

---

## Content guidelines

### Placeholder content

The placeholder content for the search field should:

- Always say "Search"
- Never include an ellipsis

<!-- usagelist -->

#### Do

- Search

#### Don’t

- search...

<!-- end -->

---

<a name="subcomponent-menu"></a>

## Top bar menu

A component that composes together an activator and a popover containing an action list to create a dropdown menu.

### Menu properties

| Prop             | Type                          | Description                                                                                        |
| ---------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| activatorContent | React.ReactNode               | Accepts an activator component that renders inside of a button that opens the menu                 |
| actions          | ActionListProps['sections']   | An array of action objects that are rendered inside of a popover triggered by this menu            |
| message          | [MessageProps](#type-message) | Accepts a message that facilitates direct, urgent communication with the merchant through the menu |
| open             | boolean                       | A boolean property indicating whether the menu is currently open                                   |
| onOpen()         | function                      | A callback function to handle opening the menu popover                                             |
| onClose()        | function                      | A callback function to handle closing the menu popover                                             |

<a name="subcomponent-user-menu"></a>

## Top bar user menu

A specialized menu component that is activated by a user avatar.

### Menu properties

| Prop       | Type                          | Description                                                                                             |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| actions    | {items: IconableAction[]}[]   | An array of action objects that are rendered inside of a popover triggered by this menu                 |
| message    | [MessageProps](#type-message) | Accepts a message that facilitates direct, urgent communication with the merchant through the user menu |
| name       | string                        | A string detailing the merchant’s full name to be displayed in the user menu                            |
| detail     | string                        | A string allowing further details on the merchant’s name displayed in the user menu                     |
| initials   | AvatarProps['initials']       | The merchant’s initials, rendered in place of an avatar image when not provided                         |
| avatar     | AvatarProps['source']         | An avatar image representing the merchant                                                               |
| open       | boolean                       | A boolean property indicating whether the user menu is currently open                                   |
| onToggle() | function                      | A callback function to handle opening and closing the user menu                                         |

<a name="type-message"></a>

### Top bar menu message

#### Message properties

| Prop        | Type                                            | Description                               |
| ----------- | ----------------------------------------------- | ----------------------------------------- |
| title       | string                                          | A title for the message                   |
| description | string                                          | A description for the message             |
| action      | {onClick(): void; content: string}              | An action to render near the message      |
| link        | {to: string; content: string}                   | A link to view the content of the message |
| badge       | {content: string; status: BadgeProps['status']} | A badge to render near the message        |

---

<a name="subcomponent-search-field"></a>

## Top bar search field

A text field component that is tailor-made for a search use-case.

### Search field properties

| Prop                    | Type     | Description                                                                      |
| ----------------------- | -------- | -------------------------------------------------------------------------------- |
| value                   | string   | Initial value for the input                                                      |
| placeholder             | string   | Hint text to display                                                             |
| focused                 | boolean  | Force the focus state on the input                                               |
| active                  | boolean  | Force a state where search is active but the text field component is not focused |
| onChange(value: string) | function | Callback when value is changed                                                   |
| onFocus()               | function | Callback when input is focused                                                   |
| onBlur()                | function | Callback when focus is removed                                                   |

---

## Examples

### Top bar with all of its elements

Use to provide structure for the top of an application. Style the top bar component using the app provider component with a theme. Providing just the `background` key for the top bar component theme will result in intelligent defaults being set for complementary colors with contrasting text.

```jsx
function TopBarExample() {
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

  const theme = {
    colors: {
      topBar: {
        background: '#357997',
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
          items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
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
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionMarkMajorTwotone} />
          <VisuallyHidden>Secondary menu</VisuallyHidden>
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
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            Frame: {skipToContent: 'Skip to content'},
            TopBar: {
              toggleMenuLabel: 'Toggle menu',
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        <Frame topBar={topBarMarkup} />
      </AppProvider>
    </div>
  );
}
```

### Top bar themed with keys

Provide specific keys and corresponding colors to the top bar theme for finer control. When giving more than just the `background`, providing all keys is necessary to prevent falling back to default colors.

```jsx
function TopBarExample() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
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
      topBar: {
        background: '#fff',
        backgroundLighter: '#F4F6F8',
        backgroundDarker: '#DFE3E8',
        border: '#C4CDD5',
        color: '#212B36',
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
          items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
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
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: 'Avatar',
              labelWithInitials: 'Avatar with initials {initials}',
            },
            Frame: {skipToContent: 'Skip to content'},
            TopBar: {
              toggleMenuLabel: 'Toggle menu',
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        <Frame topBar={topBarMarkup} />
      </AppProvider>
    </div>
  );
}
```

---

## Related components

- To provide the structure for the top bar component, as well as the primary navigation use the [frame](https://polaris.shopify.com/components/structure/frame) component.
- To display the primary navigation within the frame of a non-embedded application, use the [navigation](https://polaris.shopify.com/components/structure/navigation) component.
- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](https://polaris.shopify.com/components/forms/contextual-save-bar) component.
- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.
- To indicate to merchants that a page is loading or an upload is processing use the [loading](https://polaris.shopify.com/components/feedback-indicators/loading) component.
