import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Avatar,
  Button,
  Icon,
  Popover,
  Thumbnail,
  VerticalStack,
} from '@shopify/polaris';
import {
  TickSmallMinor,
  ChevronRightMinor,
  DeleteMinor,
  ExportMinor,
  ImportMinor,
  EditMinor,
  CustomersMajor,
} from '@shopify/polaris-icons';

export default {
  component: ActionList,
} as ComponentMeta<typeof ActionList>;

export function All() {
  return (
    <VerticalStack gap="16">
      <InAPopover />
      <WithIconsOrImage />
      <WithAnIconAndASuffix />
      <WithSections />
      <WithSectionsNoTitles />
      <WithDestructiveItem />
      <WithHelpText />
      <WithAPrefixAndASuffix />
    </VerticalStack>
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
            {content: 'Import file', icon: ImportMinor},
            {content: 'Export file', icon: ExportMinor},
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
              icon: ImportMinor,
              suffix: <Icon source={TickSmallMinor} />,
            },
            {content: 'Export file', icon: ExportMinor},
            {
              disabled: true,
              content: 'Disable file',
              icon: ImportMinor,
              suffix: <Icon source={TickSmallMinor} />,
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
                {content: 'Import file', icon: ImportMinor},
                {content: 'Export file', icon: ExportMinor},
              ],
            },
            {
              title: 'Bulk actions',
              items: [
                {content: 'Edit', icon: EditMinor},
                {content: 'Delete', icon: DeleteMinor},
              ],
            },
            {
              title: 'More options',
              items: [
                {
                  content:
                    'Manage several customers at once with a CSV file import',
                  icon: CustomersMajor,
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
                {content: 'Import file', icon: ImportMinor},
                {content: 'Export file', icon: ExportMinor},
              ],
            },
            {
              items: [
                {content: 'Edit', icon: EditMinor},
                {content: 'Delete', icon: DeleteMinor},
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
                  icon: ImportMinor,
                },
                {content: 'Export file', icon: ExportMinor},
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: DeleteMinor,
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
                  icon: ImportMinor,
                  suffix: <Icon source={TickSmallMinor} />,
                },
                {
                  disabled: true,
                  content: 'Disabled blogs',
                  helpText: 'This is also helpful text',
                  icon: ImportMinor,
                  suffix: <Icon source={TickSmallMinor} />,
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
            suffix: <Icon source={ChevronRightMinor} />,
          },
          {
            content: 'Or there',
            prefix: <Avatar customer name="Farrah" size="small" />,
            suffix: <Icon source={ChevronRightMinor} />,
          },
        ]}
      />
    </div>
  );
}
