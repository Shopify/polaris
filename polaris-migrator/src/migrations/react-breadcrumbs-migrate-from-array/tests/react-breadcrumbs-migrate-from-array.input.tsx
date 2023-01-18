import React from 'react';
import {Page} from '@shopify/polaris';

export function App() {
  const breadcrumbs = [{url: '/testing', content: 'Breadcrumb'}];
  return (
    <>
      <Page breadcrumbs={[{url: '/testing', content: 'Breadcrumb'}]}>
        hello
      </Page>
      <Page
        breadcrumbs={[
          {url: '/testing', content: 'Breadcrumb'},
          {url: '/testing2', content: 'Breadcrumb2'},
        ]}
      >
        hello
      </Page>
      <Page breadcrumbs={{url: '/testing', content: 'Breadcrumb'}}>
        testing
      </Page>
      <Page breadcrumbs={[]}>testing</Page>
      <Page breadcrumbs={breadcrumbs}>testing</Page>
    </>
  );
}
