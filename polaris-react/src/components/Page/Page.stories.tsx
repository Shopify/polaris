import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  DeleteIcon,
  PlusIcon,
  ArrowDownIcon,
  ExternalIcon,
  ViewIcon,
  MenuVerticalIcon,
} from '@shopify/polaris-icons';
import {
  Badge,
  Button,
  LegacyCard,
  LegacyStack,
  Page,
  PageActions,
  Text,
} from '@shopify/polaris';

export default {
  component: Page,
} as ComponentMeta<typeof Page>;

export function Default() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge tone="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          icon: DeleteIcon,
          accessibilityLabel: 'Delete action label',
          onAction: () => console.log('Delete action'),
        },
        {
          content: 'View on your store',
          icon: ViewIcon,
          onAction: () => console.log('View on your store action'),
        },
      ]}
      actionGroups={[
        {
          title: 'Promote',
          icon: MenuVerticalIcon,
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithCustomPrimaryAction() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={<Button variant="primary">Save</Button>}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithoutPrimaryActionInHeader() {
  return (
    <Page
      backAction={{content: 'Orders', url: '#'}}
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
            <Text as="p" variant="bodyMd">
              Buy postage and ship remaining 2 items
            </Text>
          </LegacyStack.Item>
          <Button variant="primary">Continue</Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}

export function WithDestructiveSecondaryAction() {
  return (
    <Page
      title="General"
      secondaryActions={[{content: 'Delete', tone: 'critical'}]}
    >
      <Text as="p" variant="bodyMd">
        Page content
      </Text>
    </Page>
  );
}

export function WithCustomSecondaryAction() {
  return (
    <Page title="General" secondaryActions={<Button>Save</Button>}>
      <Text as="p" variant="bodyMd">
        Page content
      </Text>
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
        <Text as="p" variant="bodyMd">
          Product X information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithBackActionOnAction() {
  return (
    <Page
      backAction={{
        content: 'Settings',
        onAction: () => {
          // eslint-disable-next-line no-alert
          alert('Clicked back button');
        },
      }}
      title="General"
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithSubtitle() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownIcon}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithSubtitleAndAdditionalMetadata() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      additionalMetadata="Net payment due: Within 60 days of receipt"
      secondaryActions={[{content: 'Download', icon: ArrowDownIcon}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithSubtitleAndAdditionalMetadataAndNoBackAction() {
  return (
    <Page
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      additionalMetadata="Net payment due: Within 60 days of receipt"
      secondaryActions={[{content: 'Download', icon: ArrowDownIcon}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
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
          icon: ExternalIcon,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithoutPagination() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={{content: 'Save'}}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function FullWidth() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{content: 'Create order', icon: PlusIcon}}
      secondaryActions={[{content: 'Export'}]}
      pagination={{
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function NarrowWidth() {
  return (
    <Page
      narrowWidth
      backAction={{content: 'Orders', url: '#'}}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <LegacyCard title="Credit card" sectioned>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithActionGroupsAndActions() {
  return (
    <Page
      title="List of products"
      subtitle="Brow Code Professional USA & Canada, Brow Code Professional New Zealand, and 8 other stores have charges on this bill"
      secondaryActions={[
        {
          content: 'Send test',
          onAction: () => {},
        },
        {
          content: 'Confirm',
          onAction: () => {},
        },
        {
          content: 'Localize',
          url: '/store/marcs-staffed-store/apps/translate-and-adapt/localize/email_template?id=10774151224&locale=fr',
        },
        {
          content: 'Manage payment reminders',
          url: '/store/marcs-staffed-store/settings/notifications/payment_reminders',
        },
      ]}
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
          title: 'Delete',
          disabled: false,
          actions: [{content: 'Delete or remove'}],
        },
        {
          title: 'Other actions',
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithActionGroupsAndActionsAndLongTitle() {
  return (
    <Page
      title="List of products available on your online store"
      secondaryActions={[
        {
          content: 'Send test',
          onAction: () => {},
        },
        {
          content: 'Confirm',
          onAction: () => {},
        },
        {
          content: 'Localize',
          url: '/store/marcs-staffed-store/apps/translate-and-adapt/localize/email_template?id=10774151224&locale=fr',
        },
        {
          content: 'Manage payment reminders',
          url: '/store/marcs-staffed-store/settings/notifications/payment_reminders',
        },
      ]}
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
          title: 'Delete',
          disabled: false,
          actions: [{content: 'Delete or remove'}],
        },
        {
          title: 'Other actions',
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithContentAfterTitle() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Jar With Lock-Lid"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}

export function WithContentAfterTitleAndSubtitle() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Jar With Lock-Lid"
      titleMetadata={
        <Button disclosure size="large">
          All locations
        </Button>
      }
      subtitle="Created: May 3, 2019 to June 2, 2019"
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
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </LegacyCard>
    </Page>
  );
}
