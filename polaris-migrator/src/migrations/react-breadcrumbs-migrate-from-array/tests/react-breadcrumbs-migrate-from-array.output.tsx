import React from 'react';
import {Page} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Page breadcrumbs={{url: '/testing', content: 'Breadcrumb'}}>hello</Page>
      <Page breadcrumbs={{url: '/testing', content: 'Breadcrumb'}}>
        testing
      </Page>
      <Page breadcrumbs={[]}>testing</Page>
    </>
  );
}
