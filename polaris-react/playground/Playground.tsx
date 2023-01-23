import React from 'react';

import {Page} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <div
        style={{
          background: 'blue',
          minHeight: 'calc(44px + 2 * var(--p-space-4))',
        }}
      />
      <div
        style={{
          background: 'red',
          minHeight: 'calc(44px + var(--p-space-8))',
        }}
      />
    </Page>
  );
}
