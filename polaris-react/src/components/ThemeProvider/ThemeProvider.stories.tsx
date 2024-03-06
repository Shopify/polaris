import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  Text,
  ThemeProvider,
  Card,
  Popover,
  ActionList,
  useBreakpoints,
} from '@shopify/polaris';
import {
  ClipboardIcon,
  DeleteIcon,
  ExportIcon,
  ImportIcon,
  MenuHorizontalIcon,
} from '@shopify/polaris-icons';

export default {
  component: ThemeProvider,
} as ComponentMeta<typeof ThemeProvider>;

export function Default() {
  const breakpoints = useBreakpoints();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: breakpoints.mdUp ? '1fr 1fr' : '1fr',
        gap: 20,
      }}
    >
      {Array.from({length: 5}, (_, index) => (
        <Card key={index}>
          <div style={{display: 'grid', gap: 'var(--p-space-300)'}}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 'var(--p-space-200)',
              }}
            >
              <Text as="h2" variant="headingSm">
                Customer
              </Text>
              <MoreActionsMenu />
              <Text as="p" variant="bodyMd">
                John Smith
              </Text>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
              }}
            >
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Contact Information!
              </Text>
              <Button icon={ClipboardIcon} variant="tertiary" />
              <Text as="p" variant="bodyMd">
                john.smith@example.com
              </Text>
              <span />
            </div>
            <div>
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Address
              </Text>
              <div />
              <Text as="p" variant="bodyMd">
                1234 Street
                <br />
                Anytown, CA, 12345
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MoreActionsMenu() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Popover
      active={active}
      autofocusTarget="first-node"
      onClose={toggleActive}
      activator={
        <Button
          variant="tertiary"
          icon={MenuHorizontalIcon}
          onClick={toggleActive}
        />
      }
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
  );
}
