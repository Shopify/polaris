---
name: App provider
category: Structure
keywords:
  - app
  - provider
  - appprovider
  - internationalization
  - i18n
  - localization
  - context
  - translate
  - translation
  - application wrapper
  - wrapper
  - easdk
  - shopify app bridge
  - embedded app sdk
  - sdk
omitAppProvider: true
---

# App provider

App provider is a required component that enables sharing global settings throughout the hierarchy of your application.

---

## Best practices

The app provider component is required to use Polaris. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component. We’ve created [several examples to show how that’s done](https://github.com/Shopify/polaris-react/blob/master/examples/README.md).

---

## Examples

### Default

AppProvider works by default without any additional options passed to it.

```jsx
<AppProvider
  i18n={{
    Polaris: {
      ResourceList: {
        sortingLabel: 'Sort by',
        defaultItemSingular: 'item',
        defaultItemPlural: 'items',
        showing: 'Showing {itemsCount} {resource}',
        Item: {
          viewItem: 'View details for {itemName}',
        },
      },
      Common: {
        checkbox: 'checkbox',
      },
    },
  }}
>
  <Page>
    <Card>
      <ResourceList
        showHeader
        items={[
          {
            id: 341,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 256,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item id={id} url={url} media={media}>
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  </Page>
</AppProvider>
```

### With i18n

With an `i18n`, `AppProvider` will provide these translations to polaris components. See [using translations](https://polaris.shopify.com/components/structure/app-provider#using-translations)

```jsx
<AppProvider
  i18n={{
    Polaris: {
      Common: {
        checkbox: 'case à cocher',
      },
      ResourceList: {
        sortingLabel: 'Trier par',
        showing: '{itemsCount} {resource} affichés',
        defaultItemPlural: 'articles',
        defaultItemSingular: 'article',
        Item: {
          viewItem: "Afficher les détails de l'{itemName}",
        },
      },
    },
  }}
>
  <Page>
    <Card>
      <ResourceList
        showHeader
        items={[
          {
            id: 341,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 256,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceList.Item id={id} url={url} media={media}>
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  </Page>
</AppProvider>
```

### With linkComponent

With a `linkComponent`, the app provider component will override the links used in other components. For example you may want to use the `Link` component provided by `react-router` throughout your application instead of the default `a` tag.

```jsx
function AppProviderLinkExample() {
  const CustomLinkComponent = ({children, url, ...rest}) => {
    return (
      <a
        href={url}
        onClick={() => console.log('Custom link clicked')}
        {...rest}
      >
        {children}
      </a>
    );
  };

  return (
    <AppProvider
      linkComponent={CustomLinkComponent}
      i18n={{
        Polaris: {
          Page: {
            Header: {
              rollupButton: 'Actions',
            },
          },
        },
      }}
    >
      <Page
        breadcrumbs={[{content: 'Products', url: '#'}]}
        title="Jar With Lock-Lid"
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[
          {content: 'Duplicate', url: '#'},
          {content: 'View on your store', url: '#'},
        ]}
      >
        <p>Page content</p>
      </Page>
    </AppProvider>
  );
}
```

### With theme

With a `theme`, the app provider component will set light, dark, and text colors for the [top bar](https://polaris.shopify.com/components/structure/top-bar) component when given a `background` color, as well as a logo for the top bar and [contextual save bar](https://polaris.shopify.com/components/forms/contextual-save-bar) components.

```jsx
function AppProviderThemeExample() {
  const [isDirty, setIsDirty] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const handleSearchChange = useCallback(
    (searchFieldValue) => setSearchFieldValue(searchFieldValue),
    [],
  );

  const toggleIsDirty = useCallback(
    () => setIsDirty((isDirty) => !isDirty),
    [],
  );

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
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    },
  };

  const searchFieldMarkup = (
    <TopBar.SearchField
      placeholder="Search"
      value={searchFieldValue}
      onChange={handleSearchChange}
    />
  );

  const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

  const contentStatus = isDirty ? 'Disable' : 'Enable';
  const textStatus = isDirty ? 'enabled' : 'disabled';

  const pageMarkup = (
    <Page title="Account">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: toggleIsDirty,
            }}
            enabled={isDirty}
          >
            This setting is{' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: toggleIsDirty,
      }}
      discardAction={{
        onAction: toggleIsDirty,
      }}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Frame: {skipToContent: 'Skip to content'},
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TopBar: {
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        <Frame topBar={topBarMarkup}>
          {contextualSaveBarMarkup}
          {pageMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}
```

### With theme using all theme keys

Provide specific keys and corresponding colors to the [top bar](https://polaris.shopify.com/components/structure/top-bar) component theme for finer control. When giving more than just the `background`, providing all keys is necessary to prevent falling back to default colors.

```jsx
function AppProviderWithAllThemeKeysExample() {
  const [isDirty, setIsDirty] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const handleSearchChange = useCallback(
    (searchFieldValue) => setSearchFieldValue(searchFieldValue),
    [],
  );

  const toggleIsDirty = useCallback(
    () => setIsDirty((isDirty) => !isDirty),
    [],
  );

  const theme = {
    colors: {
      topBar: {
        background: '#357997',
        backgroundLighter: '#6192a9',
        color: '#FFFFFF',
      },
    },
    logo: {
      width: 124,
      topBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
      url: 'http://jadedpixel.com',
      accessibilityLabel: 'Jaded Pixel',
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    },
  };

  const searchFieldMarkup = (
    <TopBar.SearchField
      placeholder="Search"
      value={searchFieldValue}
      onChange={handleSearchChange}
    />
  );

  const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

  const contentStatus = isDirty ? 'Disable' : 'Enable';
  const textStatus = isDirty ? 'enabled' : 'disabled';

  const pageMarkup = (
    <Page title="Account">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: toggleIsDirty,
            }}
            enabled={isDirty}
          >
            This setting is{' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: toggleIsDirty,
      }}
      discardAction={{
        onAction: toggleIsDirty,
      }}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <AppProvider
        theme={theme}
        i18n={{
          Polaris: {
            Frame: {
              skipToContent: 'Skip to content',
            },
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TopBar: {
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        <Frame topBar={topBarMarkup}>
          {contextualSaveBarMarkup}
          {pageMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}
```

### With the new design language enabled

The new design language is enabled by passing `{newDesignLanguage: true}` to the `features` prop on the app provider component. This feature is currently meant for development and quality assurance usage only. The new design language is not yet meant for production experiences.

```jsx
function NewDesignLanguageExample() {
  const [isDirty, setIsDirty] = useState(false);

  const toggleIsDirty = useCallback(
    () => setIsDirty((isDirty) => !isDirty),
    [],
  );

  const contentStatus = isDirty ? 'Disable' : 'Enable';
  const textStatus = isDirty ? 'enabled' : 'disabled';

  return (
    <div style={{height: '250px'}}>
      <AppProvider features={{newDesignLanguage: true}} i18n={{}}>
        <Page title="Account">
          <Layout>
            <Layout.Section>
              <SettingToggle
                action={{
                  content: contentStatus,
                  onAction: toggleIsDirty,
                }}
                enabled={isDirty}
              >
                This setting is{' '}
                <TextStyle variation="strong">{textStatus}</TextStyle>.
              </SettingToggle>
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    </div>
  );
}
```

---

## Using translations

Translations are provided in the locales folder. When using Polaris, you are able to import translations from all languages supported by the core Shopify product and consume them through the `i18n` prop.

If a project has only one locale, then you can pass the JSON content from the locale file into `AppProvider`.

```jsx
import AppProvider from '@shopify/polaris';
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json';

function App() {
  return <AppProvider i18n={translations}>{/* App content */}</AppProvider>;
}
```

If a project supports multiple locales, then load them dynamically using [`@shopify/react-i18n`](https://github.com/Shopify/quilt/tree/master/packages/react-i18n#translation). This ensures that you load only the translations you need.

```jsx
import AppProvider from '@shopify/polaris';
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json';
import {useI18n} from '@shopify/react-i18n';

function App() {
  const [i18n] = useI18n({
    id: 'Polaris',
    fallback: translations,
    translations(locale) {
      return import(
        /* webpackChunkName: "Polaris-i18n", webpackMode: "lazy-once" */ `@shopify/polaris/locales/${locale}.json`
      ).then((dictionary) => dictionary && dictionary.default);
    },
  });

  // i18n.translations is an array of translation dictionaries, where the first
  // dictionary is the desired language, and the second is the fallback.
  // AppProvider however expects that the first dictionary is the fallback
  // and the second is the desired language. Thus we need to reverse the array
  // to ensure the dictionaries are in the order desired by AppProvider.
  // The slice is to ensure we don't manipulate the original translations array
  // as reverse() modifies the array in-place.
  return (
    <AppProvider i18n={i18n.translations.slice().reverse()}>
      {/* App content */}
    </AppProvider>
  );
}
```

---

## Using linkComponent

By default Polaris renders `<Link>` elements (and action objects) as `<a>` tags. That works well for simple one-page demos. However for more complex multi-page applications that use a router such as [`react-router`](https://reacttraining.com/react-router/web) you will want links to use the components provided by your router. If you don't then every link will be an `<a>` tag and thus trigger a whole page refresh instead of navigating client-side.

The `linkComponent` prop allows you to customise how links behave within Polaris by allowing you to inject your router's own Link component. The following example demonstrates using react-router's `Link` component.

```jsx
import {BrowserRouter, Link as ReactRouterLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppProvider linkComponent={Link}>
        {/* App content including your <Route> components */}
      </AppProvider>
    </BrowserRouter>
  );
}

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function Link({children, url = '', external, ref, ...rest}) {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a reglar old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = '_blank';
    rest.rel = 'noopener noreferrer';
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}
```

---

## Initializing the Shopify App Bridge (deprecated)

When using Polaris, you don’t need to go through the initialization of the Shopify App Bridge as described in the [Shopify Help Center](https://help.shopify.com/en/api/embedded-apps/app-bridge#set-up-your-app). Instead, configure the connection to the Shopify admin through the [app provider component](https://polaris.shopify.com/components/structure/app-provider), which wraps all components in an embedded app. The app provider component initializes the Shopify App Bridge using the `apiKey` and `shopOrigin` that you provide. **The `apiKey` and the `shopOrigin` attributes are required.** Find the API key for your app in the Apps section of your [Shopify Partner Dashboard](https://partners.shopify.com). Learn how to get and store the shop origin in the [Shopify Help Center](https://help.shopify.com/en/api/embedded-apps/shop-origin).

```jsx
ReactDOM.render(
  <AppProvider apiKey="YOUR_API_KEY" shopOrigin="SHOP_ORIGIN" i18n={{}}>
    <ResourcePicker
      resourceType="Product"
      open={this.state.open}
      onSelection={({selection}) => {
        console.log('Selected products: ', selection);
        this.setState({open: false});
      }}
      onCancel={() => this.setState({open: false})}
    />
  </AppProvider>,
);
```

#### Deprecation rationale

As of v3.17.0, using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5.0 as the underlying Shopify App Bridge library will be removed from Polaris React. Learn more about the [deprecation rationale](https://github.com/Shopify/polaris-react/issues/814). Use [`Provider`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/provider) from [`@shopify/app-bridge-react`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components) instead.

---

## Access to the Shopify App Bridge instance (deprecated)

To provide access to your initialized Shopify App Bridge instance, we make it available through [React’s `context`](https://facebook.github.io/react/docs/context.html). The example below demonstrates how to access the `appBridge` object from React’s `context`, in order to use the [`Redirect` action](https://help.shopify.com/en/api/embedded-apps/app-bridge/actions/navigation/redirect) to navigate:

```js
import React from 'react';
import {render} from 'react-dom';
import {AppProvider, _SECRET_INTERNAL_APP_BRIDGE_CONTEXT} from '@shopify/polaris';
import {Redirect} from '@shopify/app-bridge/actions';

function MyApp() {
  const appBridge = useContext(_SECRET_INTERNAL_APP_BRIDGE_CONTEXT)

  redirectToSettings() {
    const redirect = Redirect.create(appBridge);

    // Go to {appOrigin}/settings
    redirect.dispatch(Redirect.Action.APP, '/settings');
  }

  render() {
    return null;
  }
}

render(
  <AppProvider
    apiKey="YOUR_APP_API_KEY"
    shopOrigin="YOUR_SHOP_ORIGIN"
    i18n={{}}
  >
    <MyApp />
  </AppProvider>,
  document.querySelector('#app'),
);
```

#### Deprecation rationale

As of v3.17.0, using the Shopify App Bridge instance in context is deprecated. Support for this will be removed in v5.0 as the underlying Shopify App Bridge library will be removed from Polaris React. More information can be found [here](https://github.com/Shopify/polaris-react/issues/814). Use the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) directly instead.

---

## Testing components

You must include Polaris context in your tests when you use Polaris components.

To make this easier for you, we’ve provided:

- a PolarisTestProvider component to provide the Polaris contexts for you
- a fully-working [example app with Jest and Enzyme](https://github.com/Shopify/polaris-react/tree/master/examples/create-react-app) you can reference
