import React from 'react';

import {Page, Columns} from '../src';

const background =
  'repeating-linear-gradient(45deg, var(--p-background), var(--p-background) 5px, var(--p-decorative-four-surface) 5px, var(--p-decorative-four-surface) 10px';

export function Playground() {
  return (
    <Page title="Playground">
      <Columns
        columns={{
          xs: 3,
          sm: ['oneHalf', 'oneHalf'],
          md: ['oneThird', 'twoThirds'],
          lg: ['oneThird', 'oneThird', 'oneThird'],
          xl: ['1fr', '1fr', 'oneThird', 'oneThird'],
        }}
      >
        <div style={{background}}>01</div>
        <div style={{background}}>02</div>
        <div style={{background}}>03</div>
        <div style={{background}}>04</div>
      </Columns>
    </Page>
  );
}
