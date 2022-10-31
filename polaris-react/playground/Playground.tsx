import React from 'react';

import {Page, Columns} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Columns columns={3}>
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
      </Columns>
    </Page>
  );
}
