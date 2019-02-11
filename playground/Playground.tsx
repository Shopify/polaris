import * as React from 'react';
import {Page} from '../src';

interface State {}

export default class Playground extends React.Component<{}, State> {
  render() {
    return (
      <Page title="Playground">
        {/* Add the code you want to test in here */}
      </Page>
    );
  }
}
