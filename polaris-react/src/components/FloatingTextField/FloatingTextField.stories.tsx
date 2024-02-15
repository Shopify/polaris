import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {Card, Text, FloatingTextField} from '@shopify/polaris';
import {EditIcon, PlusIcon} from '@shopify/polaris-icons';

export default {
  component: FloatingTextField,
} as Meta<typeof FloatingTextField>;

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((newValue: string) => setValue(newValue), []);

  return [value, onChange] as const;
}

export function All() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--p-space-300)',
      }}
    >
      <Text as="h3" variant="headingLg">
        WIP
      </Text>
      <WIP />
      <Text as="h3" variant="headingLg">
        Default
      </Text>
      <Default />
      <Text as="h3" variant="headingLg">
        With controlled component
      </Text>
      <WithControlled />
      <Text as="h3" variant="headingLg">
        With uncontrolled component
      </Text>
      <WithUncontrolled />
      <Text as="h3" variant="headingLg">
        With placeholder
      </Text>
      <WithPlaceholder />
      <Text as="h3" variant="headingLg">
        With loading
      </Text>
      <Text as="p">WIP: Field should be disabled when loading</Text>
      <WithLoading />
      <Text as="h3" variant="headingLg">
        With custom empty icon
      </Text>
      <WithEmptyIcon />
      <Text as="h3" variant="headingLg">
        With custom filled icon
      </Text>
      <WithFilledIcon />
      <br />
      <br />
      <br />
    </div>
  );
}

export function WIP() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField placeholder="Add notes" />
        </div>
      </Card>
    </div>
  );
}

export function Default() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField />
        </div>
      </Card>
    </div>
  );
}

export function WithControlled() {
  const [value, setValue] = useInput('Controlled value');

  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField value={value} onChange={setValue} />
        </div>
      </Card>
    </div>
  );
}

export function WithUncontrolled() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField defaultValue="Uncontrolled value" />
        </div>
      </Card>
    </div>
  );
}

export function WithPlaceholder() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField placeholder="Add notes" />
        </div>
      </Card>
    </div>
  );
}

export function WithLoading() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField loading placeholder="Add notes" />
        </div>
      </Card>
    </div>
  );
}

export function WithEmptyIcon() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField emptyIcon={PlusIcon} placeholder="Add notes" />
        </div>
      </Card>
    </div>
  );
}

export function WithFilledIcon() {
  return (
    <div style={{maxWidth: 300}}>
      <Card roundedAbove="sm">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--p-space-200)',
          }}
        >
          <Text as="h3" variant="headingSm">
            Notes
          </Text>
          <FloatingTextField filledIcon={EditIcon} placeholder="Add notes" />
        </div>
      </Card>
    </div>
  );
}
