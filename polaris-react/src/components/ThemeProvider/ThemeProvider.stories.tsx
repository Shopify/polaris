import React, {useState} from 'react';
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

const sections = [
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
];

export function Default() {
  const breakpoints = useBreakpoints();

  const [lightThemeLightPopoverActive, setLightThemeLightPopoverActive] =
    useState(false);

  const [darkThemeDarkPopoverActive, setDarkThemeDarkPopoverActive] =
    useState(false);

  const [lightThemeDarkPopoverActive, setLightThemeDarkPopoverActive] =
    useState(false);

  const [darkThemeLightPopoverActive, setDarkThemeLightPopoverActive] =
    useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: breakpoints.mdUp ? '1fr 1fr' : '1fr',
        gap: 20,
      }}
    >
      <CustomerCard
        moreActions={
          <Popover
            active={lightThemeLightPopoverActive}
            autofocusTarget="first-node"
            onClose={() => setLightThemeLightPopoverActive((active) => !active)}
            activator={
              <Button
                variant="tertiary"
                icon={MenuHorizontalIcon}
                onClick={() =>
                  setLightThemeLightPopoverActive((active) => !active)
                }
              />
            }
          >
            <ActionList actionRole="menuitem" sections={sections} />
          </Popover>
        }
      />
      <ThemeProvider theme="dark">
        <CustomerCard
          moreActions={
            <Popover
              active={darkThemeDarkPopoverActive}
              autofocusTarget="first-node"
              onClose={() => setDarkThemeDarkPopoverActive((active) => !active)}
              activator={
                <Button
                  variant="tertiary"
                  icon={MenuHorizontalIcon}
                  onClick={() =>
                    setDarkThemeDarkPopoverActive((active) => !active)
                  }
                />
              }
            >
              <ActionList actionRole="menuitem" sections={sections} />
            </Popover>
          }
        />
      </ThemeProvider>
      <CustomerCard
        moreActions={
          <ThemeProvider theme="dark">
            <Popover
              active={lightThemeDarkPopoverActive}
              autofocusTarget="first-node"
              onClose={() =>
                setLightThemeDarkPopoverActive((active) => !active)
              }
              activator={
                <ThemeProvider theme="light">
                  <Button
                    variant="tertiary"
                    icon={MenuHorizontalIcon}
                    onClick={() =>
                      setLightThemeDarkPopoverActive((active) => !active)
                    }
                  />
                </ThemeProvider>
              }
            >
              <ActionList actionRole="menuitem" sections={sections} />
            </Popover>
          </ThemeProvider>
        }
      />
      <ThemeProvider theme="dark">
        <CustomerCard
          moreActions={
            <ThemeProvider theme="light">
              <Popover
                active={darkThemeLightPopoverActive}
                autofocusTarget="first-node"
                onClose={() =>
                  setDarkThemeLightPopoverActive((active) => !active)
                }
                activator={
                  <ThemeProvider theme="dark">
                    <Button
                      variant="tertiary"
                      icon={MenuHorizontalIcon}
                      onClick={() =>
                        setDarkThemeLightPopoverActive((active) => !active)
                      }
                    />
                  </ThemeProvider>
                }
              >
                <ActionList actionRole="menuitem" sections={sections} />
              </Popover>
            </ThemeProvider>
          }
        />
      </ThemeProvider>
    </div>
  );
}

function CustomerCard(props: {moreActions: React.ReactNode}) {
  return (
    <Card>
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
          {props.moreActions}
          <Text as="p" variant="bodyMd">
            John Smith!
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
  );
}
