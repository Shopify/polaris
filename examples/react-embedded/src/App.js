import * as React from 'react';
import {Page, Card} from '@shopify/polaris';
import {EmbeddedApp} from '@shopify/polaris/embedded';

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const apiKey = new URLSearchParams(window.location.search).get('apiKey');

export default class MyApp extends React.Component {
  render() {
    return (
      <EmbeddedApp
        apiKey={apiKey}
        shopOrigin={shopOrigin}
        forceRedirect
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
