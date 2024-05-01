import React, {useCallback, useRef, useState} from 'react';
import type {Meta} from '@storybook/react';
import type {TextProps} from '@shopify/polaris';
import {
  useCopyToClipboard,
  useFocusIn,
  useHover,
  useMediaQuery,
  Link,
  Tooltip,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  BlockStack,
  Text,
  Box,
  Popover,
  ActionList,
} from '@shopify/polaris';
import {
  PlusIcon,
  PlusCircleIcon,
  XSmallIcon,
  ChevronDownIcon,
  EditIcon,
  MagicIcon,
  CheckIcon,
  ClipboardIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';

export default {
  component: Button,
} as Meta<typeof Button>;

export const All = {
  render() {
    const textProps: Pick<TextProps, 'as' | 'fontWeight'> = {
      as: 'span',
      fontWeight: 'bold',
    };
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="400">
        <Text {...textProps}>Default</Text>
        <Default.render />
        <Text {...textProps}>Critical</Text>
        <Critical.render />
        <Text {...textProps}>Primary</Text>
        <Primary.render />
        <Text {...textProps}>Primary success</Text>
        <PrimarySuccess.render />
        <Text {...textProps}>Primary critical</Text>
        <PrimaryCritical.render />
        <Text {...textProps}>Tertiary</Text>
        <Tertiary.render />
        <Text {...textProps}>Tertiary critical</Text>
        <TertiaryCritical.render />
        <Text {...textProps}>Plain</Text>
        <Plain.render />
        <Text {...textProps}>Plain Critical</Text>
        <PlainCritical.render />
        <Text {...textProps}>Monochrome Plain</Text>
        <MonochromePlain.render />
        <Text {...textProps}>Micro</Text>
        <Micro.render />
        <Text {...textProps}>Slim</Text>
        <Slim.render />
        <Text {...textProps}>Large</Text>
        <Large.render />
        <Text {...textProps}>Full width</Text>
        <FullWidth.render />
        <Text {...textProps}>Text aligned</Text>
        <TextAligned.render />
        <Text {...textProps}>Pressed</Text>
        <Pressed.render />
        <Text {...textProps}>Disclosure</Text>
        <PlainDisclosure.render />
        <Text {...textProps}>Right aligned disclosure</Text>
        <RightAlignedDisclosure.render />
        <Text {...textProps}>Select disclosure</Text>
        <SelectDisclosure.render />
        <Text {...textProps}>Split</Text>
        <Split.render />
        <Text {...textProps}>Disabled state</Text>
        <DisabledState.render />
        <Text {...textProps}>Loading state</Text>
        <LoadingState.render />
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    return (
      <>
        <Box padding="400">
          <InlineStack gap="400" blockAlign="end">
            <Button>Label</Button>
            <Button disabled>Label</Button>
            <Button icon={PlusIcon}>Label</Button>
            <Button disabled icon={PlusIcon}>
              Label
            </Button>
            <Button disclosure>Label</Button>
            <Button
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Box>
        <Card>
          <InlineStack gap="400" blockAlign="end">
            <Button>Label</Button>
            <Button disabled>Label</Button>
            <Button icon={PlusIcon}>Label</Button>
            <Button disabled icon={PlusIcon}>
              Label
            </Button>
            <Button disclosure>Label</Button>
            <Button
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
      </>
    );
  },
};

export const Critical = {
  render() {
    return (
      <>
        <Box padding="400">
          <InlineStack gap="400" blockAlign="end">
            <Button tone="critical">Label</Button>
            <Button tone="critical" disabled>
              Label
            </Button>
            <Button tone="critical" icon={DeleteIcon}>
              Label
            </Button>
            <Button tone="critical" disabled icon={DeleteIcon}>
              Label
            </Button>
            <Button tone="critical" disclosure>
              Label
            </Button>
            <Button
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Box>
        <Card>
          <InlineStack gap="400" blockAlign="end">
            <Button tone="critical">Label</Button>
            <Button tone="critical" disabled>
              Label
            </Button>
            <Button tone="critical" icon={DeleteIcon}>
              Label
            </Button>
            <Button tone="critical" disabled icon={DeleteIcon}>
              Label
            </Button>
            <Button tone="critical" disclosure>
              Label
            </Button>
            <Button
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              tone="critical"
              disabled
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
      </>
    );
  },
};

export const Plain = {
  render() {
    return (
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="plain">Label</Button>
          <Button variant="plain" disabled>
            Label
          </Button>
          <Button variant="plain" icon={PlusCircleIcon}>
            Label
          </Button>
          <Button variant="plain" disabled icon={PlusCircleIcon}>
            Label
          </Button>
          <Button variant="plain" disclosure>
            Label
          </Button>
          <Button variant="plain" disclosure disabled>
            Label
          </Button>
          <Button
            variant="plain"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            variant="plain"
            disabled
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
    );
  },
};

export const MonochromePlain = {
  render() {
    return (
      <Box padding="400">
        <InlineStack gap="400" blockAlign="center">
          <Button variant="monochromePlain">Default</Button>
          <Button variant="monochromePlain" icon={PlusCircleIcon}>
            With icon
          </Button>
          <Button variant="monochromePlain" disabled icon={PlusCircleIcon}>
            Disabled with icon
          </Button>
          <Button variant="monochromePlain" disclosure>
            Disclosure
          </Button>
          <Box color="text-success">
            <Button variant="monochromePlain" disclosure>
              Inherited color
            </Button>
          </Box>
          <Box color="text-magic">
            <Button
              variant="monochromePlain"
              icon={MagicIcon}
              accessibilityLabel="Apply suggestion"
            />
          </Box>
        </InlineStack>
      </Box>
    );
  },
};

export const Tertiary = {
  render() {
    return (
      <BlockStack gap="400">
        <Box padding="400">
          <InlineStack gap="400" blockAlign="end">
            <Button variant="tertiary">Label</Button>
            <Button variant="tertiary" disabled>
              Label
            </Button>
            <Button variant="tertiary" icon={PlusCircleIcon}>
              Label
            </Button>
            <Button variant="tertiary" disabled icon={PlusCircleIcon}>
              Label
            </Button>
            <Button variant="tertiary" disclosure>
              Label
            </Button>
            <Button
              variant="tertiary"
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="tertiary"
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Box>
        <Card>
          <InlineStack gap="400" blockAlign="end">
            <Button variant="tertiary">Label</Button>
            <Button variant="tertiary" disabled>
              Label
            </Button>
            <Button variant="tertiary" icon={PlusCircleIcon}>
              Label
            </Button>
            <Button variant="tertiary" disabled icon={PlusCircleIcon}>
              Label
            </Button>
            <Button variant="tertiary" disclosure>
              Label
            </Button>
            <Button
              variant="tertiary"
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="tertiary"
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
      </BlockStack>
    );
  },
};

export const TertiaryCritical = {
  render() {
    return (
      <BlockStack gap="400">
        <Box padding="400">
          <InlineStack gap="400" blockAlign="end">
            <Button variant="tertiary" tone="critical">
              Label
            </Button>
            <Button variant="tertiary" tone="critical" disabled>
              Label
            </Button>
            <Button variant="tertiary" tone="critical" icon={DeleteIcon}>
              Label
            </Button>
            <Button
              variant="tertiary"
              tone="critical"
              disabled
              icon={DeleteIcon}
            >
              Label
            </Button>
            <Button variant="tertiary" tone="critical" disclosure>
              Label
            </Button>
            <Button
              variant="tertiary"
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="tertiary"
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Box>
        <Card>
          <InlineStack gap="400" blockAlign="end">
            <Button variant="tertiary" tone="critical">
              Label
            </Button>
            <Button variant="tertiary" tone="critical" disabled>
              Label
            </Button>
            <Button variant="tertiary" tone="critical" icon={DeleteIcon}>
              Label
            </Button>
            <Button
              variant="tertiary"
              tone="critical"
              disabled
              icon={DeleteIcon}
            >
              Label
            </Button>
            <Button variant="tertiary" tone="critical" disclosure>
              Label
            </Button>
            <Button
              variant="tertiary"
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="tertiary"
              tone="critical"
              icon={DeleteIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
      </BlockStack>
    );
  },
};

export const PlainCritical = {
  render() {
    return (
      <InlineStack gap="400" blockAlign="end">
        <Button variant="plain" tone="critical">
          Label
        </Button>
        <Button variant="plain" tone="critical" disabled>
          Label
        </Button>
        <Button variant="plain" tone="critical" icon={DeleteIcon}>
          Label
        </Button>
        <Button variant="plain" tone="critical" disabled icon={DeleteIcon}>
          Label
        </Button>
        <Button variant="plain" tone="critical" disclosure>
          Label
        </Button>
        <Button variant="plain" tone="critical" disclosure disabled>
          Label
        </Button>
        <Button
          variant="plain"
          tone="critical"
          icon={DeleteIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          variant="plain"
          tone="critical"
          disabled
          icon={DeleteIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
      </InlineStack>
    );
  },
};

export const Primary = {
  render() {
    return (
      <BlockStack gap="400">
        <Box padding="400">
          <InlineStack gap="400" blockAlign="end">
            <Button variant="primary">Label</Button>
            <Button variant="primary" disabled>
              Label
            </Button>
            <Button variant="primary" icon={PlusIcon}>
              Label
            </Button>
            <Button variant="primary" disabled icon={PlusIcon}>
              Label
            </Button>
            <Button variant="primary" disclosure>
              Label
            </Button>
            <Button
              variant="primary"
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="primary"
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Box>
        <Card>
          <InlineStack gap="400" blockAlign="end">
            <Button variant="primary">Label</Button>
            <Button variant="primary" disabled>
              Label
            </Button>
            <Button variant="primary" icon={PlusIcon}>
              Label
            </Button>
            <Button variant="primary" disabled icon={PlusIcon}>
              Label
            </Button>
            <Button variant="primary" disclosure>
              Label
            </Button>
            <Button
              variant="primary"
              icon={XSmallIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              variant="primary"
              icon={EditIcon}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </InlineStack>
        </Card>
      </BlockStack>
    );
  },
};

export const PrimarySuccess = {
  render() {
    return (
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="primary" tone="success">
            Label
          </Button>
          <Button variant="primary" tone="success" disabled>
            Label
          </Button>
          <Button variant="primary" tone="success" icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" tone="success" disabled icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" tone="success" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            tone="success"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            tone="success"
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
    );
  },
};

export const PrimaryCritical = {
  render() {
    return (
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="primary" tone="critical">
            Label
          </Button>
          <Button variant="primary" tone="critical" disabled>
            Label
          </Button>
          <Button variant="primary" tone="critical" icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="primary" tone="critical" disabled icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="primary" tone="critical" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
    );
  },
};

export const Micro = {
  render() {
    return (
      <InlineStack gap="400">
        <Button size="micro">Label</Button>
        <Button variant="primary" size="micro">
          Label
        </Button>
        <Button tone="critical" size="micro">
          Label
        </Button>
        <Button variant="plain" size="micro">
          Label
        </Button>
        <Button size="micro" accessibilityLabel="Edit" icon={EditIcon} />
      </InlineStack>
    );
  },
};

export const Slim = {
  render() {
    return (
      <InlineStack gap="400">
        <Button size="slim">Label</Button>
        <Button variant="primary" size="slim">
          Label
        </Button>
        <Button tone="critical" size="slim">
          Label
        </Button>
        <Button variant="plain" size="slim">
          Label
        </Button>
        <Button size="slim" accessibilityLabel="Edit" icon={EditIcon} />
      </InlineStack>
    );
  },
};

export const Large = {
  render() {
    return (
      <InlineStack gap="400">
        <Button size="large">Label</Button>
        <Button size="large" variant="primary">
          Label
        </Button>
        <Button size="large" tone="critical">
          Label
        </Button>
        <Button size="large" variant="plain">
          Label
        </Button>
        <Button size="large" accessibilityLabel="Edit" icon={EditIcon} />
      </InlineStack>
    );
  },
};

export const FullWidth = {
  render() {
    return <Button fullWidth>Add customer</Button>;
  },
};

export const TextAligned = {
  render() {
    return (
      <Box maxWidth="200px">
        <Button variant="plain" textAlign="right">
          This is a really long string of text that overflows onto the next
          line.
        </Button>
      </Box>
    );
  },
};

export const Pressed = {
  render() {
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

    const handleFirstButtonClick = useCallback(() => {
      if (isFirstButtonActive) return;
      setIsFirstButtonActive(true);
    }, [isFirstButtonActive]);

    const handleSecondButtonClick = useCallback(() => {
      if (!isFirstButtonActive) return;
      setIsFirstButtonActive(false);
    }, [isFirstButtonActive]);

    return (
      <ButtonGroup variant="segmented">
        <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
          First button
        </Button>
        <Button
          pressed={!isFirstButtonActive}
          onClick={handleSecondButtonClick}
        >
          Second button
        </Button>
      </ButtonGroup>
    );
  },
};

export const PlainDisclosure = {
  render() {
    const [expanded, setExpanded] = useState(false);

    return (
      <Button
        variant="plain"
        disclosure={expanded ? 'up' : 'down'}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    );
  },
};

export const RightAlignedDisclosure = {
  render() {
    const [expanded, setExpanded] = useState(false);

    return (
      <div style={{width: '200px'}}>
        <Button
          fullWidth
          textAlign="left"
          disclosure={expanded ? 'up' : 'down'}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </div>
    );
  },
};

export const SelectDisclosure = {
  render() {
    return (
      <div>
        <Button disclosure="select" onClick={() => console.log('Open Popover')}>
          Select options
        </Button>
      </div>
    );
  },
};

export const Split = {
  render() {
    const [active, setActive] = React.useState<string | null>(null);

    const toggleActive = (id: string) => () => {
      setActive((activeId) => (activeId !== id ? id : null));
    };
    return (
      <div>
        <InlineStack gap="400">
          <ButtonGroup variant="segmented">
            <Button variant="primary">Save</Button>

            <Popover
              active={active === 'popover1'}
              preferredAlignment="right"
              activator={
                <Button
                  variant="primary"
                  onClick={toggleActive('popover1')}
                  icon={ChevronDownIcon}
                  accessibilityLabel="Other save actions"
                />
              }
              autofocusTarget="first-node"
              onClose={toggleActive('popover1')}
            >
              <ActionList
                actionRole="menuitem"
                items={[{content: 'Save as draft'}]}
              />
            </Popover>
          </ButtonGroup>

          <ButtonGroup variant="segmented">
            <Button>Save</Button>

            <Popover
              active={active === 'popover2'}
              preferredAlignment="right"
              activator={
                <Button
                  onClick={toggleActive('popover2')}
                  icon={ChevronDownIcon}
                  accessibilityLabel="Other save actions"
                />
              }
              autofocusTarget="first-node"
              onClose={toggleActive('popover2')}
            >
              <ActionList
                actionRole="menuitem"
                items={[{content: 'Save as draft'}]}
              />
            </Popover>
          </ButtonGroup>
        </InlineStack>
      </div>
    );
  },
};

export const DisabledState = {
  render() {
    return (
      <ButtonGroup>
        <Button disabled>Buy shipping label</Button>
        <Button variant="primary" disabled>
          Buy shipping label
        </Button>
        <Button tone="critical" disabled>
          Buy shipping label
        </Button>
        <span style={{color: '#bf0711'}}>
          <Button disabled>Buy shipping label</Button>
        </span>
        <Button variant="plain" disabled>
          Buy shipping label
        </Button>
        <Button variant="plain" tone="critical" disabled>
          Buy shipping label
        </Button>
        {/* Visual check to ensure the button color is not inherited from the parent */}
        <Box color="text-critical">
          <Button variant="monochromePlain" disabled icon={XSmallIcon}>
            Buy shipping label
          </Button>
        </Box>
      </ButtonGroup>
    );
  },
};

export const LoadingState = {
  render() {
    return (
      <InlineStack gap="400">
        <Button loading>Save product</Button>
        <Button variant="primary" loading>
          Save product
        </Button>
        <Button variant="plain" loading>
          Save product
        </Button>
      </InlineStack>
    );
  },
};

export const CopyToClipboard = {
  render() {
    const [copy, status] = useCopyToClipboard({
      defaultValue: 'hello@example.com',
    });

    const ref = useRef(null);
    const isFocusedIn = useFocusIn(ref);
    const isHovered = useHover(ref);
    const isMouseDevice = useMediaQuery('mouse');
    const isMouseHovered = isMouseDevice ? isHovered : true;

    return (
      <div style={{maxWidth: 300, paddingTop: 100}}>
        <Card>
          <div ref={ref}>
            <InlineStack align="space-between" gap="200" blockAlign="center">
              <Link removeUnderline>hello@example.com</Link>
              <div
                style={{
                  opacity:
                    isMouseHovered || isFocusedIn || status === 'copied'
                      ? 1
                      : 0,
                  transition:
                    isMouseHovered || isFocusedIn
                      ? 'var(--p-motion-duration-100) var(--p-motion-ease) opacity'
                      : 'none',
                }}
              >
                <Tooltip
                  dismissOnMouseOut
                  hoverDelay={500}
                  preferredPosition="above"
                  content="Copy"
                  active={status === 'copied' ? false : undefined}
                  activatorWrapper="div"
                >
                  <Button
                    variant="tertiary"
                    accessibilityLabel="Copy email address"
                    onClick={copy}
                    icon={status === 'copied' ? CheckIcon : ClipboardIcon}
                  />
                </Tooltip>
              </div>
            </InlineStack>
          </div>
        </Card>
      </div>
    );
  },
};
