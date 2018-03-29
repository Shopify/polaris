---
name: Get started
slug: get-started
icon:
categoryName:
categorySlug:
order:
---

# Components

Our components are a collection of interface elements that can be reused across the Shopify system.

Components can be combined to help anyone building products for Shopify to efficiently design consistent experiences for merchants.

This frees us up to focus on solving unique merchant challenges, rather than reinventing interface elements that are already in use.

---

## Getting started

The component library was designed to help developers quickly create the best experience for Shopify merchants.

Each component includes information to help you implement them, such as:

* Explanations of the merchant problem it solves in the interface
* Interactive examples so you can see the component in action
* Best practices and guidelines to use the component correctly

Learn more about developing apps and themes for Shopify on our [developer hub](https://developers.shopify.com/).

---

## Installing and implementing

There are two options for installing and implementing our components, React or CSS.

### React components (Recommended)

Use React components in most cases, especially if you’re building a highly interactive experience. This can be done with or without a build system.

* [Implementation instructions](https://github.com/Shopify/polaris) (requires HTML, React, a JS build tool)

* Have a look at the [React component examples](https://github.com/Shopify/polaris/tree/master/examples) to see how it’s done

### CSS components

* Use CSS components if you don’t have or want a build system for your project

* Include the CSS in your HTML to implement:

```html
<link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.0.0-beta.13/polaris.min.css" />
```

* Have a look at the [CSS examples](https://github.com/Shopify/polaris/tree/master/examples/cdn-styles) to see how it’s done

---

## Using components

You can find comprehensive [instructions](https://github.com/Shopify/polaris) on how to use components in the Polaris GitHub repo. There are also [example applications](https://github.com/Shopify/polaris/tree/master/examples) to explore.

Here are some basic instructions to help you get started for both React and CSS-only:

### React components (Recommended)

Include the CSS in your HTML:

```html
<link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.0.0-beta.13/polaris.min.css" />
```

Include the component in your project:

```javascript
import {Button} from '@shopify/polaris';
```

Tell React to render the element in the DOM:

```javascript
ReactDOM.render(
  <Button onClick={() => alert('Button clicked!')}>Example button</Button>,
  domContainerNode
);
```

### CSS components

Include the CSS stylesheet in your HTML:

```html
<link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.0.0-beta.13/polaris.min.css" />
```

Add the appropriate classes to your HTML elements:

```html
<button class="Polaris-Button">Example button</button>
```

---

## Using embedded components

Building apps for merchants lets you quickly integrate your service into Shopify, or embed your web apps directly inside Shopify POS and the Shopify admin.

With embedded apps, you can add value to a merchant’s day-to-day business operations by leveraging the familiar surroundings of the Shopify admin. Embedded apps are separately hosted and use the Shopify API.

The embedded section includes

* Embedded app wrapper for your entire application
* Top bar with title, icon, breadcrumbs, buttons, pagination, and dropdown menus
* Custom modal windows
* Alert and confirmation dialogs
* Product and collection resource pickers

### Embedded apps

In addition to the visual components provided as part of Polaris, we provide React wrappers around Shopify’s [Embedded App SDK (EASDK)](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-redirect-path). When using Polaris, you don’t need to go through the initialization of the EASDK as described [in the docs](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/initialization). Instead, configure the connection to the Admin through an [`<EmbeddedApp />`](https://polaris.shopify.com/components/embedded/embedded-app) component:

```jsx
import React from 'react';
import {render} from 'react-dom';
import * as PropTypes from 'prop-types';
import {Page, Card, Button} from '@shopify/polaris';
import {EmbeddedApp} from '@shopify/polaris/embedded';

class MyApp extends React.Component {
  // This line is very important! It tells React to attach the `easdk`
  // object to `this.context` within your component.
  static contextTypes = {
    easdk: PropTypes.object
  };

  render() {
    return (
      <Page title="Example application">
        <Card sectioned>
          <Button onClick={() => this.context.easdk.startLoading()}>
            Start loading
          </Button>
          <Button onClick={() => this.context.easdk.stopLoading()}>
            Stop loading
          </Button>
        </Card>
      </Page>
    );
  }
}

render(
  <EmbeddedApp
    apiKey="YOUR_APP_API_KEY"
    shopOrigin="https://CURRENT_LOGGED_IN_SHOP.myshopify.com"
  >
    <MyApp />
  </EmbeddedApp>,
  document.querySelector('#app')
);
```

Your `apiKey` and `shopOrigin` attributes are required. The [EASDK init section](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-init-config) describes the details of these attributes and where to find them.

### Components

To access the EASDK components you need to add them to you project:

```javascript
import * as Embedded from '@shopify/polaris/embedded';
```

or

```javascript
import {EmbeddedApp, Alert, Modal} from '@shopify/polaris/embedded';
```

if you want to import a subset of the components.

All EASDK components must be wrapped by the `<EmbeddedApp />` component. This component initializes the EASDK using the `apiKey` and `shopOrigin` you provide.

* [`<EmbeddedApp />`](https://polaris.shopify.com/components/embedded/embedded-app): The root component that manages the communication with the Shopify admin.
* [`<Page />`](https://polaris.shopify.com/components/embedded/embedded-page): An outer wrapper of the embedded app content used to control page title and associated page actions. This replaces the [`ShopifyApp.Bar.initialize`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-initialize-config), [`ShopifyApp.Bar.setTitle`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-settitle-title), [`ShopifyApp.Bar.setIcon`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-seticon-icon), [`ShopifyApp.Bar.setPagination`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-setpagination-config) and [`ShopifyApp.Bar.setBreadcrumb`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-bar-setbreadcrumb-config)
* [`<Alert />`](https://polaris.shopify.com/components/embedded/embedded-alert): A modal alert presented to the user with a configurable option to cancel or confirm. This replaces the [`ShopifyApp.Modal.alert`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-alert-options-fn) and [`ShopifyApp.Modal.confirm`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-confirm-options-fn) EASDK methods.
* [`<Modal />`](https://polaris.shopify.com/components/embedded/embedded-modal): A modal dialog presented over top of your application. This dialog will present another page of your choice from your application. This replaces the [`ShopifyApp.Modal.open`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-open-init-fn) EASDK method.
* [`<ResourcePicker />`](https://polaris.shopify.com/components/embedded/embedded-resource-picker): A modal dialog that allows the user to select one or more of their products or collections, and provides you with details on the selected resources. This replaces the [`ShopifyApp.Modal.productPicker`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-productpicker-options-fn) and [`ShopifyApp.Modal.collectionPicker`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-modal-collectionpicker-options-fn) EASDK methods.

---

## Learning resources

These resources have information on getting started with React and how to develop apps and themes for Shopify.

### React

If you’re new to React, start with the official [React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html). As you read through the topics, follow along using the [React Hello World CodePen](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010) example.

Here are some additional resources:

* Online training at [reacttraining.com](https://reacttraining.com/), [buildwithreact.com](http://buildwithreact.com), and [reactforbeginners.com](https://reactforbeginners.com)
* Community resources in [Awesome React](https://github.com/enaqx/awesome-react)
* Answers in the various [React support communities](https://facebook.github.io/react/community/support.html)

### Shopify’s developer hub

Learn more about developing apps and themes for Shopify on our [developer hub](https://developers.shopify.com/).

---

## Component methodology

We make our components flexible enough to meet diverse needs. Our components are set up to be restructured based on the information passed in. No matter what type of experience you’re creating, you can use components as the building blocks of your product or feature.

Each of our components has a well-documented public interface (API) with guidelines and well-defined conventions. This way, developers don’t need to worry about the underlying implementation. Instead, they can focus on creating great merchant experiences.

We ensure that our components are made for everyone. They meet accessibility standards and are responsive to any screen or device. We also put a lot of effort into optimizing the performance of the components, so everyone can build inclusive experiences that work.

---

## Feedback

Issues or feature requests can be created on the [Polaris GitHub page](https://github.com/Shopify/polaris/issues). At this time we’re not accepting pull requests. This is something we’ll support in the future.
