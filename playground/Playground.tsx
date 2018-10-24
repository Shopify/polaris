import * as React from 'react';
import {Page, AppProvider} from '@shopify/polaris';

interface State {}

export default class Playground extends React.Component<never, State> {
  render() {
    return (
      <AppProvider>
        <Page
          breadcrumbs={[{content: 'Products', url: '/products'}]}
          title="Jar With Lock-Lid"
          primaryAction={{content: 'Save', disabled: true}}
          secondaryActions={[
            {content: 'Duplicate'},
            {content: 'View on your store'},
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        >
          <p>Page content</p>
        </Page>
      </AppProvider>
    );
  }
}
