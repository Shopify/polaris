import React from 'react';

import {Page, Tooltip, TextStyle} from '../src';

export function Playground() {
  const callMonorailEventEmitter = (tooltipActivated: boolean) => {
    if (tooltipActivated) console.log('Calling monorail event emitter!!');
  };

  return (
    <Page title="Playground">
      <Tooltip
        active
        content="This order has shipping labels."
        onVisibilityChange={callMonorailEventEmitter}
      >
        <TextStyle variation="strong">Order #1001</TextStyle>
      </Tooltip>
    </Page>
  );
}
