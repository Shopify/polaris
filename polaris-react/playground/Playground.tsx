import {CancelSmallMinor} from '@shopify/polaris-icons';
import React from 'react';

import {
  Page,
  Columns,
  Tag,
  Box,
  Bleed,
  AlphaStack,
  UnstyledButton,
  Inline,
  Text,
  Icon,
} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Columns columns={17}>{genChildren(23)}</Columns>

      <hr />

      <Columns columns={{xs: 3, sm: 4, md: 5}}>{genChildren(6)}</Columns>

      <hr />

      <Columns columns={{xs: ['oneThird', 'twoThirds']}}>
        {genChildren(6)}
      </Columns>

      <hr />

      <Columns columns={{xs: ['twoThirds', 'oneThird']}}>
        {genChildren(6)}
      </Columns>

      <hr />

      <Columns columns={{xs: ['oneHalf', 'oneHalf']}}>{genChildren(6)}</Columns>
    </Page>
  );
}

function genChildren(count: number) {
  const background =
    'repeating-linear-gradient(45deg, var(--p-background), var(--p-background) 5px, var(--p-decorative-four-surface) 5px, var(--p-decorative-four-surface) 10px';
  return Array.from({length: count}).map((_, index) => (
    <div key={index} style={{background}}>
      {index}
    </div>
  ));
}
