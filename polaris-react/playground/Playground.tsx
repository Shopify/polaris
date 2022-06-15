import React from 'react';

import {Page} from '../src';
import {Display} from './Display';
import {Heading} from './Heading';
import {Body} from './Body';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Display size="medium">Display medium</Display>
      <Heading size="xlarge" strong>
        Heading xlarge
      </Heading>
      <Body size="small">Body small</Body>
    </Page>
  );
}
