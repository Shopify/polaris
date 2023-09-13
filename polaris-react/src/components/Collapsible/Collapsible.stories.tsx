import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  LegacyCard,
  Collapsible,
  Link,
  BlockStack,
} from '@shopify/polaris';

export default {
  component: Collapsible,
} as ComponentMeta<typeof Collapsible>;

export function Default() {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <div style={{height: '200px'}}>
      <LegacyCard sectioned>
        <BlockStack gap="4" inlineAlign="start">
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
            <p>
              Your mailing list lets you contact customers or visitors who have
              shown an interest in your store. Reach out to them with exclusive
              offers or updates about your products.
            </p>
            <Link url="#">Test link</Link>
          </Collapsible>
        </BlockStack>
      </LegacyCard>
    </div>
  );
}
