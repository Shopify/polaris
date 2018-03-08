---
name: Embedded app
category: Embedded
hidePlayground: true
keywords:
  - application wrapper
  - wrapper
  - EASDK
  - embedded app SDK
  - SDK
---

# Embedded app

Embedded app is a wrapper for your entire application which provides access to the Shopify admin using the [Embedded App SDK (EASDK)](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/getting-started). The props passed to this component initialize your connection to the Shopify admin. Once connected, components in your application can send and receive messages using the EASDK.

This component only works within embedded apps. Read the [EASDK getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Examples

### Initializing

You must store your API key and the `shopOrigin` provided by the Shopify API somewhere on the page so you can use them to initialize your application.

```jsx
// We are accessing the apiKey and shopOrigin
// from content in script tags.
const shopOrigin = document.querySelector('#ShopOrigin').textContent;
const apiKey = document.querySelector('#APIKey').textContent;

ReactDOM.render(
  <EmbeddedApp
    shopOrigin={shopOrigin}
    apiKey={apiKey}
  >
    <ResourcePicker
      open
      products
      onSelection={(resources) => console.log('Selected resources ', resources)}
    />
  </EmbeddedApp>
)
```
