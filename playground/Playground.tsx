/* eslint-disable */

import * as React from 'react';
import {Page, AppProvider} from '@shopify/polaris';

interface State {}

export default class Playground extends React.Component<never, State> {
  render() {
    return (
      <AppProvider>
        <Page title="Playground" />
      </AppProvider>
    );
  }
}

/* eslint-enable */
