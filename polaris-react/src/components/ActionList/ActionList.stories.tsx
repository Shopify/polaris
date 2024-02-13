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
  CheckSmallIcon,
  ChevronRightIcon,
  DeleteIcon,
  ExportIcon,
  ImportIcon,
  EditIcon,
  PersonIcon,
  DuplicateIcon,
  ArchiveIcon,
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
            {content: 'Duplicate', icon: DuplicateIcon},
            {content: 'Archive', icon: ArchiveIcon},
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
        <div style={{width: '200px'}}>
          <ActionList
            actionRole="menuitem"
            items={[
              {
                active: true,
                content: 'Import file',
                icon: ImportIcon,
                suffix: <Icon source={CheckSmallIcon} />,
              },
              {content: 'Export file', icon: ExportIcon},
              {
                content: 'Manage your blog articles',
                icon: ImportIcon,
                suffix: <Icon source={CheckSmallIcon} />,
              },
              {
                content: `Manage uploaded images`,
                icon: ImportIcon,
                suffix: <Icon source={CheckSmallIcon} />,
                truncate: true,
              },
              {
                disabled: true,
                content: 'Disable file',
                icon: ImportIcon,
                suffix: <Icon source={CheckSmallIcon} />,
              },
            ]}
          />
        </div>
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
                {content: 'Import file', icon: ImportIcon},
                {content: 'Export file', icon: ExportIcon},
              ],
            },
            {
              title: 'Bulk actions',
              items: [
                {content: 'Edit', icon: EditIcon},
                {content: 'Delete', icon: DeleteIcon},
              ],
            },
            {
              title: 'More options',
              items: [
                {
                  content:
                    'Manage several customers at once with a CSV file import',
                  icon: PersonIcon,
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
                {content: 'Import file', icon: ImportIcon},
                {content: 'Export file', icon: ExportIcon},
              ],
            },
            {
              items: [
                {content: 'Edit', icon: EditIcon},
                {content: 'Delete', icon: DeleteIcon},
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
                  icon: ImportIcon,
                },
                {content: 'Export file', icon: ExportIcon},
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: DeleteIcon,
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
                  icon: ImportIcon,
                  suffix: <Icon source={CheckSmallIcon} />,
                },
                {
                  disabled: true,
                  content: 'Disabled blogs',
                  helpText: 'This is also helpful text',
                  icon: ImportIcon,
                  suffix: <Icon source={CheckSmallIcon} />,
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
            suffix: <Icon source={ChevronRightIcon} />,
          },
          {
            content: 'Or there',
            prefix: <Avatar customer name="Farrah" size="sm" />,
            suffix: <Icon source={ChevronRightIcon} />,
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
