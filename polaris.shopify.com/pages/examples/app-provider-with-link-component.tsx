import {AppProvider, Page} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AppProviderLinkExample() {
  const CustomLinkComponent = ({
    children,
    url,
    ...rest
  }: {
    children?: React.ReactNode;
    url: string;
  }) => {
    return (
      <a
        href={url}
        onClick={() => console.log('Custom link clicked')}
        {...rest}
      >
        {children}
      </a>
    );
  };

  return (
    <AppProvider
      linkComponent={CustomLinkComponent}
      i18n={{
        Polaris: {
          Page: {
            Header: {
              rollupButton: 'Actions',
            },
          },
        },
      }}
    >
      <Page
        backAction={{content: 'Products', url: '#'}}
        title="Jar With Lock-Lid"
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[
          {content: 'Duplicate', url: '#'},
          {content: 'View on your store', url: '#'},
        ]}
      >
        <p>Page content</p>
      </Page>
    </AppProvider>
  );
}

export default withPolarisExample(AppProviderLinkExample);
