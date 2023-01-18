import React from 'react';
import {Page} from '@shopify/polaris';

export function App({
  breadcrumbProps = [{url: '/testing', content: 'Breadcrumb'}],
}) {
  const breadcrumbs = [{url: '/testing', content: 'Breadcrumb'}];
  const getBreadcrumbs = () => [{url: '/testing', content: 'Breadcrumb'}];
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
      <Page breadcrumbs={breadcrumbProps}>testing</Page>
      <Page breadcrumbs={getBreadcrumbs()}>testing</Page>
    </>
  );
}
