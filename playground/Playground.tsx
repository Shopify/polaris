// tslint:disable

import * as React from 'react';
import {Page, EmptyState} from '@shopify/polaris';

import emptyState from './illustrations/emptystate-products.svg';

interface State {

}

export default class Playground extends React.Component<never, State> {
  render() {
    return (
      <Page title="Playground">
        <EmptyState
          heading="Add your products"
          image={emptyState}
          action={{
            content: "Add product",
            url: '/admin/products/new',
          }}
          secondaryAction={{
            content: "Import products",
          }}
        >
          <p>Get closer to your first sale by adding products, or import your existing product inventory.</p>
        </EmptyState>
      </Page>
    );
  }
}

// tslint:enable
