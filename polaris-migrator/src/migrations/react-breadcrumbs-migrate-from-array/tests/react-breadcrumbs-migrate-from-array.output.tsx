import React from 'react';
import {Page} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Page breadcrumbs={{url: '/testing', content: 'Breadcrumb'}}>hello</Page>
      <Page breadcrumbs={{url: '/testing2', content: 'Breadcrumb2'}}>
        hello
      </Page>
      <Page breadcrumbs={{url: '/testing', content: 'Breadcrumb'}}>
        testing
      </Page>
      <Page>testing</Page>
    </>
  );
}
