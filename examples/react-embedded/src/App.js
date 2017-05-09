import * as React from 'react';
import URLSearchParams from 'url-search-params';
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
            <p>
              Go to <strong>http://localhost:3000/login?shop=&lt;your-shop&gt;.myshopify.com&apiKey=&lt;your-app-api-key&gt;</strong> to see how your embedded app work with Polaris
            </p>
            <br/>
            <p>
              Insert the rest of your app here, including those components detailed below, which can now communicate with the Embedded App SDK.
            </p>
          </Card>
        </Page>
      </EmbeddedApp>
    );
  }
}
