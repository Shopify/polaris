import React from 'react';

import {Page, Columns, Stack} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Stack vertical>
        <h2>Equal columns example</h2>
        <Columns
          columns={{xs: 2, sm: '1fr 1.5fr', md: 4, lg: 6}}
          gap={{xs: 'var(--p-space-1)', lg: 'var(--p-space-4)'}}
        >
          <div style={{background: 'aquamarine'}}>one</div>
          <div style={{background: 'aquamarine'}}>two</div>
          <div style={{background: 'aquamarine'}}>three</div>
          <div style={{background: 'aquamarine'}}>four</div>
          <div style={{background: 'aquamarine'}}>five</div>
          <div style={{background: 'aquamarine'}}>six</div>
        </Columns>

        <h2>Non equal columns example</h2>
        <Columns
          columns={{
            xs: '1.5fr 0.5fr',
            sm: '2fr 1fr',
            md: '1fr 3fr auto 1fr',
            lg: '1fr 4fr auto 2fr 3fr auto',
          }}
          gap={{xs: 20}}
        >
          <div style={{background: 'aquamarine'}}>one</div>
          <div style={{background: 'aquamarine'}}>two</div>
          <div style={{background: 'aquamarine'}}>three</div>
          <div style={{background: 'aquamarine'}}>four</div>
          <div style={{background: 'aquamarine'}}>five</div>
          <div style={{background: 'aquamarine'}}>six</div>
        </Columns>
      </Stack>
    </Page>
  );
}
