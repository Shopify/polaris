import * as React from 'react';
import {Page, Button} from '@shopify/polaris';

interface State {}

export default class Playground extends React.Component<{}, State> {
  render() {
    return (
      <Page
        title="Playground"
        primaryAction={{content: 'View Examples', url: '/examples'}}
      >
        <Button>Click me!</Button>
      </Page>
    );
  }
}
