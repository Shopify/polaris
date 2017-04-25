# Embedded apps

In addition to the [visual components](https://polaris.shopify.com/components/get-started) provided as part of Polaris, we provide React wrappers around Shopify’s [Embedded App SDK (EASDK)](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-redirect-path). When using Polaris, you don't need to go through the initialization of the EASDK as described [in the docs](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/initialization). Instead, configure the connection to the Admin through an `EmbeddedApp` component:

```js
import React from 'react';
import {Page, Card} from '@shopify/polaris';
import {EmbeddedApp} from '@shopify/polaris/embedded';

export default class MyApp extends React.Component {
  render() {
    return (
      <EmbeddedApp
        apiKey="YOUR_APP_API_KEY"
        shopOrigin="https://CURRENT_LOGGED_IN_SHOP.myshopify.com"
      >
        <Page title="Example application">
          <Card sectioned>
            Insert the rest of your app here, including those components detailed below, which can now communicate with the Embedded App SDK.
          </Card>
        </Page>
      </EmbeddedApp>
    );
  }
}
```

Your apiKey and shopOrigin attributes are required. The [EASDK init section](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-init-config) describes the details of these attributes and where to find them.

## Components
To access the EASDK components you need to add them to you project:
`import * from @shopify/polaris/embedded` or `import {EmbeddedApp, Alert, Modal} from @shopify/polaris/embedded` if you want to import only the components you will use.

All EASDK components must be wrapped by the `<EmbeddedApp />` component. This component initializes the EASDK using the apiKey and shopOrigin you provide.

* [`<EmbeddedApp />`](https://polaris.shopify.com/components/embedded/embedded-app): The root component that manages the communication with the Shopify admin.
* [`<Page />`](https://polaris.shopify.com/components/structure/page): An outer wrapper of the embedded app content used to control page title and associated page actions. This replaces the [`ShopifyApp.Bar.initialize`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-initialize-config), [`ShopifyApp.Bar.setTitle`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-settitle-title), [`ShopifyApp.Bar.setIcon`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-seticon-icon), [`ShopifyApp.Bar.setPagination`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-setpagination-config) and [`ShopifyApp.Bar.setBreadcrumb`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-setbreadcrumb-config)
* [`<Alert />`](https://polaris.shopify.com/components/embedded/alert): A modal alert presented to the user with a configurable option to cancel or confirm. This replaces the [`ShopifyApp.Modal.alert`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-alert-options-fn) and [`ShopifyApp.Modal.confirm`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-confirm-options-fn) EASDK methods.
* [`<Modal />`](https://polaris.shopify.com/components/embedded/modal): A modal dialog presented over top of your application. This dialog will present another page of your choice from your application. This replaces the [`ShopifyApp.Modal.open`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-open-init-fn) EASDK method.
* [`<ResourcePicker />`](https://polaris.shopify.com/components/embedded/resource-picker): A modal dialog that allows the user to select one or more of their products or collections, and provides you with details on the selected resources. This replaces the [`ShopifyApp.Modal.productPicker`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-productpicker-options-fn) and [`ShopifyApp.Modal.collectionPicker`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-collectionpicker-options-fn) EASDK methods.

## Access to further EASDK APIs

We've provided access to some functionality of the underlying EASDK API. This enables performing actions like redirects or displaying a flash message from within your embedded app.

In order to call these methods, you must get the `easdk` object that we add to [React’s `context`](https://facebook.github.io/react/docs/context.html). The example below demonstrates how to access the `easdk` object from React's `context`:


```js
import React from 'react';
import * as PropTypes from 'prop-types';
import {Page, Card, Button} from '@shopify/polaris';
import {EmbeddedApp} from '@shopify/polaris/embedded';

export default class MyApp extends React.Component {
  // This line is very important! It tells React to attach the `easdk`
  // object to `this.context` within your component.
  static contextTypes = {
    easdk: PropTypes.object,
  };

  render() {
    return (
      <EmbeddedApp
        apiKey="YOUR_APP_API_KEY"
        shopOrigin="https://CURRENT_LOGGED_IN_SHOP.myshopify.com"
      >
        <Page title="Example application">
          <Card sectioned>
            <Button onClick={this.context.easdk.startLoading()}>Start loading</Button>
            <Button onClick={this.context.easdk.stopLoading()}>Stop loading</Button>
          </Card>
        </Page>
      </EmbeddedApp>
    );
  }
}
```
### Methods provided:

We provide the following methods, (annotated with the types of their parameters and return values):

#### `easdk.showFlashNotice()`

```ts
showFlashNotice(message: string): void;
```

Presents a flash message in the Shopify admin and replaces the [`ShopifyApp.flashNotice`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flashnotice-message) method in the EASDK.

##### Best practices

Use flash messages sparingly and only for very quick, tactical feedback on an action. Remember that flash messages disappear after 3 seconds so they can be hard to read for anyone with low literacy, limited vision, or anyone who doesn’t speak English as their first language.

Make flash messages very short and scannable.

##### Content guidelines

Flash messages should:

* Follow a {noun} + {verb} pattern (e.g. Settings saved, Buy Button removed, Discount deleted)
* Confirm a previous call to action performed by the merchant (e.g. if the merchant selects a button that says “Add channel”, the flash message that follows should say “Channel added”)
* Be short and specific (2 or 3 words)

###### Do
Changes saved

###### Don't
Successfully saved changes

#### `easdk.pushState()`

```ts
pushState(location: string): void;
```

Rewrites the URL to the passed location. Note that this is called automatically by other methods, so it is rarely needed directly. Replaces the [`ShopifyApp.pushState`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-pushstate-path) method in the EASDK.

#### `easdk.redirect()`

```ts
redirect(location: string): void;
```

Navigates away from your app and to another section of the Shopify admin. The path should be prefixed with a slash, but should not include the `/admin` part. Example: `/customers/120999015` or `/settings/domains`. Replaces the [`ShopifyApp.redirect`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-redirect-path) method in the EASDK.

#### `easdk.startLoading()`

```ts
startLoading(): void;
```

Starts a loading indicator in the Shopify admin. It is a best practice to trigger this when you start any long-running asynchronous operation, such as an AJAX request. Replaces the [`ShopifyApp.Bar.loadingOn`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-loadingon) method in the EASDK.

#### `easdk.stopLoading()`

```ts
stopLoading(): void;
```

Stops the loading indicator in the Shopify admin. Make sure to match this to any calls to `startLoading` once the asynchronous task is complete. Replaces the [`ShopifyApp.Bar.loadingOff`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-loadingoff) method in the EASDK.
