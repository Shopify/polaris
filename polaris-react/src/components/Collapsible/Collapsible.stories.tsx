import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  Collapsible,
  Link,
  LegacyStack,
  TextContainer,
  Text,
  InlineStack,
  Box,
} from '@shopify/polaris';

export default {
  component: Collapsible,
} as Meta<typeof Collapsible>;

export const Default = {
  render() {
    const [open, setOpen] = useState(true);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    return (
      <div style={{height: '200px'}}>
        <LegacyCard sectioned>
          <LegacyStack vertical>
            <Button
              onClick={handleToggle}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
            >
              Toggle
            </Button>
            <Collapsible
              open={open}
              id="basic-collapsible"
              transition={{
                duration: 'var(--p-motion-duration-250)',
                timingFunction: 'var(--p-motion-ease-in-out)',
              }}
              expandOnPrint
            >
              <TextContainer>
                <Text as="p" variant="bodyMd">
                  Your mailing list lets you contact customers or visitors who
                  have shown an interest in your store. Reach out to them with
                  exclusive offers or updates about your products.
                </Text>
                <Link url="#">Test link</Link>
              </TextContainer>
            </Collapsible>
          </LegacyStack>
        </LegacyCard>
      </div>
    );
  },
};
export const Inline = {
  render() {
    const [open, setOpen] = useState(true);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    return (
      <div style={{height: '200px'}}>
        <LegacyCard sectioned>
          <LegacyStack alignment="center">
            <Button
              onClick={handleToggle}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
            >
              Toggle
            </Button>
            <Collapsible open={open} id="inline-collapsible" variant="inline">
              <p style={{whiteSpace: 'nowrap', backgroundColor: 'red'}}>
                Non breaking text
              </p>
            </Collapsible>
          </LegacyStack>
        </LegacyCard>
      </div>
    );
  },
};

export const AnimateIn = {
  render() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [openInline, setOpenInline] = useState(true);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    const handleToggle2 = useCallback(() => setOpen2((open2) => !open2), []);
    const handleToggleInline = useCallback(
      () => setOpenInline((openInline) => !openInline),
      [],
    );

    return (
      <div style={{height: '200px'}}>
        <LegacyCard sectioned>
          <InlineStack>
            <Button
              onClick={handleToggleInline}
              ariaExpanded={openInline}
              ariaControls="inline-collapsible"
            >
              Toggle Inline
            </Button>
            <Collapsible
              open={openInline}
              id="inline-collapsible"
              variant="inline"
              transition={{
                animateIn: true,
                duration: 'var(--p-motion-duration-250)',
              }}
            >
              <p style={{whiteSpace: 'nowrap', backgroundColor: 'red'}}>
                Non breaking text
              </p>
            </Collapsible>

            <Button
              onClick={handleToggle}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
            >
              Toggle
            </Button>
            <Button
              onClick={handleToggle2}
              ariaExpanded={open2}
              ariaControls="basic-collapsible-2"
            >
              Toggle 2
            </Button>
            <Box maxWidth="20%">
              <Collapsible
                open={open}
                id="inline-collapsible"
                transition={{
                  animateIn: true,
                  duration: 'var(--p-motion-duration-250)',
                }}
              >
                <Box background="avatar-bg-fill">
                  <Text as="p" variant="bodyMd">
                    Your mailing list lets you contact customers or visitors who
                    have shown an interest in your store. Reach out to them with
                    exclusive offers or updates about your products.
                  </Text>
                </Box>
              </Collapsible>
              <Collapsible
                open={open2}
                id="basic-collapsible-2"
                transition={{
                  animateIn: true,
                  duration: 'var(--p-motion-duration-250)',
                }}
              >
                <Box background="avatar-bg-fill">
                  <Text as="p" variant="bodyMd">
                    Your mailing list lets you contact customers or visitors who
                    have shown an interest in your store. Reach out to them with
                    exclusive offers or updates about your products.
                  </Text>
                </Box>
              </Collapsible>
            </Box>
          </InlineStack>
        </LegacyCard>
      </div>
    );
  },
};
