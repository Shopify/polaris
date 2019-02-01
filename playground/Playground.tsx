import * as React from 'react';
import {TopBar} from '../src';

interface State {}

export default class Playground extends React.Component<{}, State> {
  render() {
    return (
      <TopBar
        contextControl={<TopBar.Menu action={[]} activatorContent="User" />}
      />
    );
  }
}
