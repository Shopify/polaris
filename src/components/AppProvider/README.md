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
<AppProvider>
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

### With i18n object

With an `i18n` object, the app provider component will override default English translations.

```jsx
<AppProvider
  i18n={{
    Polaris: {
      ResourceList: {
        showing: '{itemsCount} {resource} affichés',
        defaultItemPlural: 'articles',
        defaultItemSingular: 'article',
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
class ProviderLinkExample extends React.Component {
  render() {
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
      <AppProvider linkComponent={CustomLinkComponent}>
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
}
```

### With theme

With a `theme`, the app provider component will set light, dark, and text colors for the [top bar](/components/structure/top-bar) component when given a `background` color, as well as a logo for the top bar and [contextual save bar](/components/forms/contextual-save-bar) components.

```jsx
class ProviderThemeExample extends React.Component {
  state = {
    isDirty: false,
    searchFieldValue: '',
  };

  render() {
    const {isDirty, searchFieldValue} = this.state;

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
        onChange={this.handleSearchChange}
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
                onAction: this.toggleState('isDirty'),
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
          onAction: this.toggleState('isDirty'),
        }}
        discardAction={{
          onAction: this.toggleState('isDirty'),
        }}
      />
    ) : null;

    return (
      <div style={{height: '250px'}}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            {contextualSaveBarMarkup}
            {pageMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  handleSearchChange = (searchFieldValue) => {
    this.setState({searchFieldValue});
  };

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}
```

### With theme using all theme keys

Provide specific keys and corresponding colors to the [top bar](/components/structure/top-bar) component theme for finer control. When giving more than just the `background`, providing all keys is necessary to prevent falling back to default colors.

```jsx
class ProviderThemeExample extends React.Component {
  state = {
    isDirty: false,
    searchFieldValue: '',
  };

  render() {
    const {isDirty, searchFieldValue} = this.state;

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
        onChange={this.handleSearchChange}
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
                onAction: this.toggleState('isDirty'),
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
          onAction: this.toggleState('isDirty'),
        }}
        discardAction={{
          onAction: this.toggleState('isDirty'),
        }}
      />
    ) : null;

    return (
      <div style={{height: '250px'}}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            {contextualSaveBarMarkup}
            {pageMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  handleSearchChange = (searchFieldValue) => {
    this.setState({searchFieldValue});
  };

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}
```

---

## Initializing the Shopify App Bridge

When using Polaris, you don’t need to go through the initialization of the Shopify App Bridge as described in the [Shopify Help Center](https://help.shopify.com/en/api/embedded-apps/app-bridge#set-up-your-app). Instead, configure the connection to the Shopify admin through the [app provider component](https://polaris.shopify.com/components/structure/app-provider), which wraps all components in an embedded app. The app provider component initializes the Shopify App Bridge using the `apiKey` and `shopOrigin` that you provide. **The `apiKey` and the `shopOrigin` attributes are required.** Find the API key for your app in the Apps section of your [Shopify Partner Dashboard](https://partners.shopify.com). Learn how to get and store the shop origin in the [Shopify Help Center](https://help.shopify.com/en/api/embedded-apps/shop-origin).

```jsx
ReactDOM.render(
  <AppProvider apiKey="YOUR_API_KEY" shopOrigin="SHOP_ORIGIN">
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

---

## Access to the Shopify App Bridge instance

To provide access to your initialized Shopify App Bridge instance, we make it available through [React’s `context`](https://facebook.github.io/react/docs/context.html). The example below demonstrates how to access the `appBridge` object from React’s `context`, in order to use the [`Redirect` action](https://help.shopify.com/en/api/embedded-apps/app-bridge/actions/navigation/redirect) to navigate:

```js
import React from 'react';
import {render} from 'react-dom';
import * as PropTypes from 'prop-types';
import {AppProvider} from '@shopify/polaris';
import {Redirect} from '@shopify/app-bridge/actions';

class MyApp extends React.Component {
  // This line is very important! It tells React to attach the `polaris`
  // object to `this.context` within your component.
  static contextTypes = {
    polaris: PropTypes.object,
  };

  redirectToSettings() {
    const redirect = Redirect.create(this.context.polaris.appBridge);

    // Go to {appOrigin}/settings
    redirect.dispatch(Redirect.Action.APP, '/settings');
  }
}

render(
  <AppProvider apiKey="YOUR_APP_API_KEY">
    <MyApp />
  </AppProvider>,
  document.querySelector('#app'),
);
```

---

## Testing components

You must include Polaris context in your tests when you use Polaris components.

To make this easier for you, we’ve provided:

- a `createPolarisContext()` function to create the Polaris context for you
- a `polarisContextTypes` variable that contains all the necessary context types
- a fully-working [example app with Jest and Enzyme](https://github.com/Shopify/polaris-react/tree/master/examples/create-react-app) you can reference
