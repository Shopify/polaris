import React from 'react';

import {Page, ActionList} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <div style={{height: '250px', width: '140px', backgroundColor: `white`}}>
        <ActionList
          sections={[
            {
              items: [{content: 'Import file'}, {content: 'Export file'}],
            },
            {
              items: [{content: 'Edit'}, {content: 'Delete'}],
            },
          ]}
        />
      </div>
    </Page>
  );
}
