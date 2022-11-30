import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  Bleed,
  Box,
  Button,
  Card,
  Link,
  Page,
  PageActions,
  Popover,
  Stack,
  Text,
  useBreakpoints,
} from '@shopify/polaris';
import {PlusMinor, ArrowDownMinor, ExternalMinor} from '@shopify/polaris-icons';

export default {
  component: Page,
} as ComponentMeta<typeof Page>;

export function Default() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '/products'}]}
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithCustomPrimaryAction() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '/settings'}]}
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithoutPrimaryActionInHeader() {
  return (
    <Page
      breadcrumbs={[{content: 'Orders', url: '/orders'}]}
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
      <Card sectioned title="Fulfill order">
        <Stack alignment="center">
          <Stack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </Stack.Item>
          <Button primary>Continue</Button>
        </Stack>
      </Card>
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
      <Card title="Product X" sectioned>
        <p>Product X information</p>
      </Card>
    </Page>
  );
}

export function WithSubtitle() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '/products'}]}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithoutPagination() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '/settings'}]}
      title="General"
      primaryAction={{content: 'Save'}}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function NarrowWidth() {
  return (
    <Page
      narrowWidth
      breadcrumbs={[{content: 'Orders', url: '/orders'}]}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithContentAfterTitle() {
  return (
    <Page
      breadcrumbs={[{content: 'Products', url: '/products'}]}
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
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithDivider() {
  return (
    <Page
      breadcrumbs={[{content: 'Settings', url: '/settings'}]}
      title="General"
      divider
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export function WithCustomPopover() {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({top: 0, right: 0});
  const {mdUp} = useBreakpoints();

  const activator = <div style={{visibility: 'hidden'}}>I'm a button</div>;

  const customAboutAction = {
    content: 'About',
    accessibilityLabel: 'Secondary action label',
    onAction: (ref: React.RefObject<HTMLElement>) => {
      if (!ref.current) {
        return;
      }

      const {right, top, height} = ref.current.getBoundingClientRect();
      setPopoverPosition({
        top: top + height,
        right: window.innerWidth - right,
      });

      if (mdUp) {
        setPopoverVisible(!popoverVisible);
      } else {
        setBannerVisible(!bannerVisible);
      }
    },
  };

  const popover = (
    <div
      style={{
        position: 'absolute',
        top: popoverPosition.top,
        right: popoverPosition.right,
      }}
    >
      <Popover
        activator={activator}
        active={popoverVisible}
        preferredAlignment={'right'}
        onClose={() => setPopoverVisible(false)}
      >
        <Popover.Section>
          <Text as="h6" variant="headingSm">
            How to use this feature
          </Text>
          <Link>Learn more</Link>
        </Popover.Section>
      </Popover>
    </div>
  );
  const educationalBanner = (
    <div style={{marginBottom: '20px'}}>
      <Bleed horizontal="4" vertical="4">
        <Box padding="4" background="surface">
          <Text as="h6" variant="headingSm">
            How to use this feature
          </Text>
          <Link>Learn more</Link>
        </Box>
      </Bleed>
    </div>
  );
  return (
    <>
      {bannerVisible && !mdUp && educationalBanner}
      <Page
        breadcrumbs={[{content: 'Products', url: '/products'}]}
        title="Customer cohort analysis"
        compactTitle
        secondaryActions={[
          {
            content: 'Print',
            onAction: () => console.log('Print on action'),
          },
          {
            content: 'Export',
            onAction: () => console.log('Export on action'),
          },
          customAboutAction,
        ]}
      >
        <Card sectioned>
          <p>Customer cohort chart</p>
        </Card>
        {popover}
      </Page>
    </>
  );
}
