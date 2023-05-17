import React from 'react';
import {DeleteMinor, PlusMinor, TickMinor} from '@shopify/polaris-icons';

import {Button, HorizontalStack, Page, VerticalStack, Text} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <VerticalStack gap="12">
        <VerticalStack gap="4">
          <Text variant="headingSm" as="h2">
            primary
          </Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button primary>Label</Button>
            <Button primary disabled>
              Label
            </Button>
            <Button primary pressed>
              Label
            </Button>
            <Button primary icon={PlusMinor}>
              Label
            </Button>
            <Button primary disabled icon={PlusMinor}>
              Label
            </Button>
            <Button primary disclosure>
              Label
            </Button>
          </HorizontalStack>

          <HorizontalStack gap="5" blockAlign="end">
            <Button primary destructive>
              Label
            </Button>
            <Button primary destructive disabled>
              Label
            </Button>
            <Button primary destructive pressed>
              Label
            </Button>
            <Button primary destructive icon={DeleteMinor}>
              Label
            </Button>
            <Button primary destructive disabled icon={DeleteMinor}>
              Label
            </Button>
            <Button primary destructive disclosure>
              Label
            </Button>
          </HorizontalStack>

          <HorizontalStack gap="5" blockAlign="end">
            <Button primary success>
              Label
            </Button>
            <Button primary success disabled>
              Label
            </Button>
            <Button primary success pressed>
              Label
            </Button>
            <Button primary success icon={TickMinor}>
              Label
            </Button>
            <Button primary success disabled icon={TickMinor}>
              Label
            </Button>
            <Button primary success disclosure>
              Label
            </Button>
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="4">
          <Text variant="headingSm" as="h2">
            default
          </Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button>Label</Button>
            <Button disabled>Label</Button>
            <Button pressed>Label</Button>
            <Button icon={PlusMinor}>Label</Button>
            <Button disabled icon={PlusMinor}>
              Label
            </Button>
            <Button disclosure>Label</Button>
          </HorizontalStack>

          <HorizontalStack gap="5" blockAlign="end">
            <Button destructive>Label</Button>
            <Button destructive disabled>
              Label
            </Button>
            <Button destructive pressed>
              Label
            </Button>
            <Button destructive icon={DeleteMinor}>
              Label
            </Button>
            <Button destructive disabled icon={DeleteMinor}>
              Label
            </Button>
            <Button destructive disclosure>
              Label
            </Button>
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="4">
          <Text variant="headingSm" as="h2">
            plain
          </Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button plain>Label</Button>
            <Button plain disabled>
              Label
            </Button>
            <Button plain pressed>
              Label
            </Button>
            <Button plain icon={PlusMinor}>
              Label
            </Button>
            <Button plain disabled icon={PlusMinor}>
              Label
            </Button>
            <Button plain disclosure>
              Label
            </Button>
          </HorizontalStack>

          <HorizontalStack gap="5" blockAlign="end">
            <Button plain destructive>
              Label
            </Button>
            <Button plain destructive disabled>
              Label
            </Button>
            <Button plain destructive pressed>
              Label
            </Button>
            <Button plain destructive icon={DeleteMinor}>
              Label
            </Button>
            <Button plain destructive disabled icon={DeleteMinor}>
              Label
            </Button>
            <Button plain destructive disclosure>
              Label
            </Button>
          </HorizontalStack>
        </VerticalStack>
      </VerticalStack>
    </Page>
  );
}
