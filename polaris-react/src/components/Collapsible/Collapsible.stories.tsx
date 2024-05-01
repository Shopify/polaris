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
                duration: 'var(--p-motion-duration-150)',
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
export const Horizontal = {
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
            <Collapsible
              open={open}
              id="horizontal-collapsible"
              variant="horizontal"
            >
              <p style={{whiteSpace: 'nowrap'}}>Non breaking text</p>
            </Collapsible>
          </LegacyStack>
        </LegacyCard>
      </div>
    );
  },
};
