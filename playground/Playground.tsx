import React from 'react';

import {Page} from '../src';

export function Playground() {
  return (
    // <Page title="Playground">
    //   {/* Add the code you want to test in here */}
    // </Page>
    <Page
      title="My Page"
      primaryAction={{content: 'Edit', url: '#Edit'}}
      secondaryActions={[
        {content: 'Delete', destructive: true, url: '#Delete'},
      ]}
    >
      Some page content
    </Page>
  );
}
