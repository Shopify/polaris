import React from 'react';
import {LocationsMinor} from '@shopify/polaris-icons';

import {Button, HorizontalStack, Page, VerticalStack, Text} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <VerticalStack gap="8">
        <VerticalStack gap="2">
          <Text>primary</Text>
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
        </VerticalStack>

        <VerticalStack gap="2">
          <Text>primary destructive</Text>
          <HorizontalStack gap="4" blockAlign="end">
            <Button primary destructive>
              Label
            </Button>
            <Button primary destructive disabled>
              Label
            </Button>
            <Button primary destructive pressed>
              Label
            </Button>
            <Button primary destructive icon={LocationsMinor}>
              Label
            </Button>
            <Button primary destructive disclosure>
              Label
            </Button>
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text>default</Text>
          <HorizontalStack gap="4" blockAlign="end">
            <Button>Label</Button>
            <Button disabled>Label</Button>
            <Button pressed>Label</Button>
            <Button icon={LocationsMinor}>Label</Button>
            <Button disclosure>Label</Button>
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text>destructive</Text>
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
        </VerticalStack>

        <VerticalStack gap="2">
          <Text>plain</Text>
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

        <VerticalStack gap="2">
          <Text>plain destructive</Text>
          <HorizontalStack gap="4" blockAlign="end">
            <Button plain destructive>
              Label
            </Button>
            <Button plain destructive disabled>
              Label
            </Button>
            <Button plain destructive pressed>
              Label
            </Button>
            <Button plain destructive icon={LocationsMinor}>
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
