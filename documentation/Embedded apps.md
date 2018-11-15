# Embedded apps

In addition to the [visual components](https://polaris.shopify.com/components/get-started) provided as part of Polaris, we provide React wrappers around the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) (formerly known as the EASDK).

When using Polaris, you don’t need to go through the initialization of the Shopify App Bridge as described [in the docs](https://help.shopify.com/en/api/embedded-apps/app-bridge#set-up-your-app). Instead, configure the connection to the Shopify admin through the [app provider component](https://polaris.shopify.com/components/structure/app-provider#initializing-the-shopify-app-bridge), which must wrap all components in an embedded app. This component initializes the Shopify App Bridge using the `apiKey` you provide. **The `apiKey` attribute is required** and can be found in the [Shopify Partner Dashboard](https://partners.shopify.com).

## Components which wrap Shopify App Bridge

- [`<Toast />`](https://polaris.shopify.com/components/feedback-indicators/toast)
- [`<Loading />`](https://polaris.shopify.com/components/feedback-indicators/loading)
- [`<Page />`](https://polaris.shopify.com/components/structure/page)
- [`<Modal />`](https://polaris.shopify.com/components/overlays/modal)
- [`<ResourcePicker />`](https://polaris.shopify.com/components/overlays/resource-picker)
