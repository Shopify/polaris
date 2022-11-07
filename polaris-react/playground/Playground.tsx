import React from 'react';

import {Page, UnstyledButton} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <UnstyledButton
        className="hello"
        background="surface-neutral"
        onClick={() => {
          console.log('HI!!!');
        }}
      >
        Hello!
      </UnstyledButton>
    </Page>
  );
}
