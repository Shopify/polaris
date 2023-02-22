import React from 'react';
import {Page} from '@shopify/polaris';

export function App({
  breadcrumbProps = [{url: '/testing', content: 'Breadcrumb'}],
}) {
  const breadcrumbs = [{url: '/testing', content: 'Breadcrumb'}];
  const getBreadcrumbs = () => [{url: '/testing', content: 'Breadcrumb'}];
  return (
    <>
      <Page backAction={{url: '/testing', content: 'Breadcrumb'}}>hello</Page>
      <Page backAction={{url: '/testing2', content: 'Breadcrumb2'}}>hello</Page>
      <Page>testing</Page>
      <Page
        backAction={
          /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated. */
          breadcrumbs
        }
      >
        testing
      </Page>
      <Page
        backAction={
          /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated. */
          breadcrumbProps
        }
      >
        testing
      </Page>
      <Page
        backAction={
          /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated. */
          getBreadcrumbs()
        }
      >
        testing
      </Page>
    </>
  );
}
