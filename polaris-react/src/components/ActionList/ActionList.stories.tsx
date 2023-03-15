import { useCallback, useState } from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Avatar,
  Button,
  Icon,
  Popover,
  Thumbnail,
} from '@shopify/polaris';
import {
  TickSmallMinor,
  ChevronRightMinor,
  DeleteMinor,
  ExportMinor,
  ImportMinor,
  EditMinor,
} from '@shopify/polaris-icons';

export default {
  component: ActionList,
} as ComponentMeta<typeof ActionList>;

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
