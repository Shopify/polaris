import React from 'react';
import {LocationsMinor} from '@shopify/polaris-icons';

import {Button, HorizontalStack, Page, VerticalStack} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <VerticalStack gap="8">
        <HorizontalStack gap="4" blockAlign="end">
          <Button>Label</Button>
          <Button disabled>Label</Button>
          <Button pressed>Label</Button>
          <Button icon={LocationsMinor}>Label</Button>
          <Button disclosure>Label</Button>
          {/* <Button
            connectedDisclosure={{
              accessibilityLabel: 'Other save actions',
              actions: [{content: 'Action'}],
            }}
          >
            Label
          </Button> */}
        </HorizontalStack>

        <HorizontalStack gap="4" blockAlign="end">
          <Button primary>Label</Button>
          <Button primary disabled>
            Label
          </Button>
          <Button primary pressed>
            Label
          </Button>
          <Button primary icon={LocationsMinor}>
            Label
          </Button>
          <Button primary disclosure>
            Label
          </Button>
          {/* <Button
            primary
            connectedDisclosure={{
              accessibilityLabel: 'Other save actions',
              actions: [{content: 'Action'}],
            }}
          >
            Label
          </Button> */}
        </HorizontalStack>

        <HorizontalStack gap="4" blockAlign="end">
          <Button destructive>Label</Button>
          <Button destructive disabled>
            Label
          </Button>
          <Button destructive pressed>
            Label
          </Button>
          <Button destructive icon={LocationsMinor}>
            Label
          </Button>
          <Button destructive disclosure>
            Label
          </Button>
          {/* <Button
            destructive
            connectedDisclosure={{
              accessibilityLabel: 'Other save actions',
              actions: [{content: 'Action'}],
            }}
          >
            Label
          </Button> */}
        </HorizontalStack>
      </VerticalStack>
    </Page>
  );
}
