import React from 'react';

import {Page, Stack, Badge} from '../src';

export function Playground() {
  return (
    <>
      <Page title="Pip">
        <Stack>
          <div>
            <Badge.Pip progress="incomplete" status="new" /> Incomplete & new
            <br />
            <Badge.Pip progress="incomplete" status="info" /> Incomplete & info
            <br />
            <Badge.Pip /> Default
          </div>
        </Stack>
      </Page>
      <Page title="Badges">
        <Stack>
          <Badge progress="incomplete" status="new">
            Incomplete & new
          </Badge>
          <Badge progress="incomplete" status="info">
            Incomplete & info
          </Badge>
          <Badge progress="complete">Default</Badge>
        </Stack>
      </Page>
    </>
  );
}
