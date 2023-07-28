import React from 'react';

import {Boxo, Page} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Boxo padding="space-4" background="bg-caution" borderRadius="3">
        Boxo
      </Boxo>
    </Page>
  );
}
