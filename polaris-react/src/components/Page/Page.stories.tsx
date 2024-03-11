import React, {useState, useRef} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  DeleteIcon,
  PlusIcon,
  ArrowDownIcon,
  ExternalIcon,
  ViewIcon,
  MenuVerticalIcon,
  ChevronDownIcon,
} from '@shopify/polaris-icons';
import {
  Badge,
  Button,
  LegacyCard,
  LegacyStack,
  Page,
  PageActions,
  Popover,
  ActionList,
  ButtonGroup,
  TextField,
  FormLayout,
  ContextualSaveBar,
  Frame,
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
          tone: 'critical',
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
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
            <p>Buy postage and ship remaining 2 items</p>
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
      <p>Page content</p>
    </Page>
  );
}

export function WithCustomSecondaryAction() {
  return (
    <Page title="General" secondaryActions={<Button>Save</Button>}>
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
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
          icon: ExternalIcon,
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
      backAction={{content: 'Settings', url: '#'}}
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
      primaryAction={{content: 'Create order', icon: PlusIcon}}
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
      backAction={{content: 'Orders', url: '#'}}
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
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
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export function WithSplitSaveAction() {
  const initialState = {
    title: 'Jar With Lock-Lid',
    description: '',
    isDraft: false,
  };

  const [active, setActive] = React.useState(false);
  const [title, setTitle] = useState('Jar With Lock-Lid');
  const [description, setDescription] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const savedEditHistory = useRef<
    {
      title: string;
      description: string;
      isDraft: boolean;
    }[]
  >([]);

  const handleChange = (name: string) => (value: string) => {
    switch (name) {
      case 'title':
        handleDirtyState(name, value, title);
        setTitle(value);
        break;
      case 'description':
        handleDirtyState(name, value, description);
        setDescription(value);
        break;
      default:
        null;
    }
  };

  const handleDirtyState = (
    name: string,
    newValue: string,
    currentValue: string,
  ) => {
    if (
      (newValue !== initialState[name] && !isDirty) ||
      newValue !== currentValue
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  };

  const handleDiscard = () => {
    const previousState: {
      title: string;
      description: string;
      isDraft: boolean;
    } = savedEditHistory.current.pop() ?? initialState;

    setTitle(previousState.title);
    setDescription(previousState.description);
    setIsDraft(previousState.isDraft);
    setIsDirty(false);
  };

  const splitButton = (
    <ButtonGroup variant="segmented">
      <Button
        size="large"
        onClick={() => {
          savedEditHistory.current.push({title, description, isDraft: false});
          setIsDirty(false);
          setIsDraft(false);
        }}
      >
        Save
      </Button>

      <Popover
        active={active}
        preferredAlignment="right"
        activator={
          <Button
            size="large"
            onClick={() => setActive(true)}
            icon={ChevronDownIcon}
            accessibilityLabel="Other save actions"
          />
        }
        autofocusTarget="first-node"
        onClose={() => setActive(false)}
        zIndexOverride={514}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: 'Save as draft',
              onAction: () => {
                setIsDraft(true);
                savedEditHistory.current.push({
                  title,
                  description,
                  isDraft: true,
                });
              },
            },
          ]}
          onActionAnyItem={() => setIsDirty(false)}
        />
      </Popover>
    </ButtonGroup>
  );

  const saveBar = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={splitButton}
      discardAction={{
        content: 'Discard',
        onAction: handleDiscard,
      }}
    />
  ) : null;

  console.log(savedEditHistory);

  return (
    <Frame
      logo={{
        width: 124,
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      }}
    >
      {saveBar}
      <Page
        backAction={{content: 'Products', url: '#'}}
        title="Jar With Lock-Lid"
        titleMetadata={
          <Badge tone={isDraft ? 'info' : 'success'}>
            {isDraft ? 'Draft' : 'Active'}
          </Badge>
        }
        secondaryActions={[
          {content: 'Duplicate'},
          {content: 'View on your store'},
        ]}
        pagination={{
          hasPrevious: true,
          hasNext: true,
        }}
      >
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              autoComplete="off"
              label="Title"
              value={title}
              onChange={handleChange('title')}
            />
            <TextField
              multiline
              autoComplete="off"
              label="Description"
              value={description}
              onChange={handleChange('description')}
            />
          </FormLayout>
        </LegacyCard>
      </Page>
    </Frame>
  );
}
