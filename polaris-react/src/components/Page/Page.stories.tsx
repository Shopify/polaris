import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  Button,
  LegacyCard,
  Page,
  PageActions,
  LegacyStack,
} from '@shopify/polaris';
import {PlusMinor, ArrowDownMinor, ExternalMinor} from '@shopify/polaris-icons';

export default {
  component: Page,
} as ComponentMeta<typeof Page>;

export function Default() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '#'}]}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge status="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: () => console.log('Duplicate action'),
        },
        {
          content: 'View on your store',
          onAction: () => console.log('View on your store action'),
        },
      ]}
      actionGroups={[
        {
          title: 'Promote',
          accessibilityLabel: 'Action group label',
          actions: [
            {
              content: 'Share on Facebook',
              accessibilityLabel: 'Individual action label',
              onAction: () => console.log('Share on Facebook action'),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithCustomPrimaryAction() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '#'}]}
      title="General"
      primaryAction={
        <Button
          primary
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as new'}],
          }}
        >
          Save
        </Button>
      }
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithoutPrimaryActionInHeader() {
  return (
    <Page
      breadcrumbs={[{content: 'Orders', url: '#'}]}
      title="#1085"
      secondaryActions={[
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button primary>Continue</Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}

export function WithDestructiveSecondaryAction() {
  return (
    <Page
      title="General"
      secondaryActions={[{content: 'Delete', destructive: true}]}
    >
      <p>Page content</p>
    </Page>
  );
}

export function WithCustomSecondaryAction() {
  return (
    <Page
      title="General"
      secondaryActions={
        <Button
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as new'}],
          }}
        >
          Save
        </Button>
      }
    >
      <p>Page content</p>
    </Page>
  );
}

export function WithToolTipAction() {
  return (
    <Page
      title="Product"
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Import',
          disabled: true,
          helpText: 'You need permission to import products.',
        },
      ]}
    >
      <LegacyCard title="Product X" sectioned>
        <p>Product X information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithSubtitle() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '#'}]}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithExternalLink() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalMinor,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithoutPagination() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '#'}]}
      title="General"
      primaryAction={{content: 'Save'}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function FullWidth() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{content: 'Create order', icon: PlusMinor}}
      secondaryActions={[{content: 'Export'}]}
      pagination={{
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function NarrowWidth() {
  return (
    <Page
      narrowWidth
      breadcrumbs={[{content: 'Orders', url: '#'}]}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
      <PageActions
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[{content: 'Delete'}]}
      />
    </Page>
  );
}

export function WithActionGroups() {
  return (
    <Page
      title="Products"
      actionGroups={[
        {
          title: 'Copy',
          onClick: (openActions) => {
            console.log('Copy action');
            openActions();
          },
          actions: [{content: 'Copy to clipboard'}],
        },
        {
          title: 'Promote',
          disabled: true,
          actions: [{content: 'Share on Facebook'}],
        },
        {
          title: 'More actions',
          actions: [
            {content: 'Duplicate'},
            {content: 'Print'},
            {content: 'Unarchive'},
            {content: 'Cancel order'},
          ],
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithContentAfterTitle() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '#'}]}
      title="Jar With Lock-Lid"
      titleMetadata={<Badge status="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithDivider() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '#'}]}
      title="General"
      divider
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}
