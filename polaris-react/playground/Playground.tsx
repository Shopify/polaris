import React from 'react';

import {Button, Page} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Button onPointerDown={() => console.log('test')}>test</Button>
      {/* Add the code you want to test in here */}
    </Page>
  );
}
