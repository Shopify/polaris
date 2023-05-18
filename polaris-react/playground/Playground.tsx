import React from 'react';
import {colorUplift} from '@shopify/polaris-tokens';

import {AlphaCard, Page} from '../src';

export function Playground() {
  console.log(colorUplift);
  return (
    <Page title="Playground">
      <AlphaCard padding="6">
        <div style={{background: 'var(--p-color-admin-bg)'}}>new admin bg</div>
      </AlphaCard>
    </Page>
  );
}
