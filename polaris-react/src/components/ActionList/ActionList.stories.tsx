import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Avatar,
  Button,
  Icon,
  Popover,
  Thumbnail,
  BlockStack,
} from '@shopify/polaris';
import {
  TickSmall,
  ChevronRight,
  Delete,
  Export,
  Import,
  Edit,
  Customers,
  Duplicate,
  Archive,
} from '@shopify/polaris-icons';

export default {
  component: ActionList,
} as ComponentMeta<typeof ActionList>;

export function All() {
  return (
    <BlockStack gap="1600">
      <InAPopover />
      <WithIconsOrImage />
      <WithAnIconAndASuffix />
      <WithSections />
      <WithSectionsNoTitles />
      <WithDestructiveItem />
      <WithHelpText />
      <WithAPrefixAndASuffix />
    </BlockStack>
  );
}

export function InAPopover() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleImportedAction = useCallback(
    () => console.log('Imported action'),
    [],
  );

  const handleExportedAction = useCallback(
    () => console.log('Exported action'),
    [],
  );

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: 'Import file',
              onAction: handleImportedAction,
            },
            {
              content: 'Export file',
              onAction: handleExportedAction,
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithIconsOrImage() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '200px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {content: 'Duplicate', icon: Duplicate},
            {content: 'Archive', icon: Archive},
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithAnIconAndASuffix() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '200px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              active: true,
              content: 'Import file',
              icon: Import,
              suffix: <Icon source={TickSmall} />,
            },
            {content: 'Export file', icon: Export},
            {
              disabled: true,
              content: 'Disable file',
              icon: Import,
              suffix: <Icon source={TickSmall} />,
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithSections() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {content: 'Import file', icon: Import},
                {content: 'Export file', icon: Export},
              ],
            },
            {
              title: 'Bulk actions',
              items: [
                {content: 'Edit', icon: Edit},
                {content: 'Delete', icon: Delete},
              ],
            },
            {
              title: 'More options',
              items: [
                {
                  content:
                    'Manage several customers at once with a CSV file import',
                  icon: Customers,
                  truncate: true,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithSectionsNoTitles() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              items: [
                {content: 'Import file', icon: Import},
                {content: 'Export file', icon: Export},
              ],
            },
            {
              items: [
                {content: 'Edit', icon: Edit},
                {content: 'Delete', icon: Delete},
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithDestructiveItem() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {
                  active: true,
                  content: 'Import file',
                  icon: Import,
                },
                {content: 'Export file', icon: Export},
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: Delete,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithHelpText() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              items: [
                {
                  content: 'Blog posts',
                  helpText: 'Manage your blog articles',
                },
                {
                  content: 'Blogs',
                  helpText: 'Manage blogs published to your Online Store',
                },
                {
                  active: true,
                  content: 'Active blogs',
                  helpText: 'This is helpful text',
                  icon: Import,
                  suffix: <Icon source={TickSmall} />,
                },
                {
                  disabled: true,
                  content: 'Disabled blogs',
                  helpText: 'This is also helpful text',
                  icon: Import,
                  suffix: <Icon source={TickSmall} />,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function WithAPrefixAndASuffix() {
  return (
    <div style={{height: '250px', maxWidth: '350px'}}>
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Go here',
            prefix: (
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="small"
                alt="Black leather pet collar"
              />
            ),
            suffix: <Icon source={ChevronRight} />,
          },
          {
            content: 'Or there',
            prefix: <Avatar customer name="Farrah" size="sm" />,
            suffix: <Icon source={ChevronRight} />,
          },
        ]}
      />
    </div>
  );
}

export function WithFiltering() {
  return (
    <div style={{height: '250px', maxWidth: '350px'}}>
      <ActionList
        actionRole="menuitem"
        allowFiltering
        items={Array.from({length: 8}).map((_, index) => ({
          content: `Item #${index + 1}`,
        }))}
      />
    </div>
  );
}
