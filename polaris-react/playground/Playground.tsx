import React from 'react';
import {LocationsMinor} from '@shopify/polaris-icons';

import {Button, HorizontalStack, Page, VerticalStack} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <VerticalStack gap="8">
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
        </HorizontalStack>

        <HorizontalStack gap="4" blockAlign="end">
          <Button>Label</Button>
          <Button disabled>Label</Button>
          <Button pressed>Label</Button>
          <Button icon={LocationsMinor}>Label</Button>
          <Button disclosure>Label</Button>
        </HorizontalStack>

        <HorizontalStack gap="4" blockAlign="end">
          <Button plain>Label</Button>
          <Button plain disabled>
            Label
          </Button>
          <Button plain pressed>
            Label
          </Button>
          <Button plain icon={LocationsMinor}>
            Label
          </Button>
          <Button plain disclosure>
            Label
          </Button>
        </HorizontalStack>
      </VerticalStack>
    </Page>
  );
}
