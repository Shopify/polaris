import React from 'react';
import type {Meta} from '@storybook/react';
import {Page, VerticalStack, TextField} from '@shopify/polaris';

import {AppSettingsLayout} from './AppSettingsLayout';

export default {
  component: AppSettingsLayout,
} as Meta<typeof AppSettingsLayout>;

export function Default() {
  return (
    <Page
      divider
      primaryAction={{
        content: 'View on your store',
        disabled: true,
        onAction: () => {},
      }}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Duplicate settings',
          onAction: () => {},
        },
      ]}
    >
      <AppSettingsLayout>
        <AppSettingsLayout.AnnotatedSection
          title="InterJambs"
          description="Interjambs are the rounded protruding bits of your puzzlie piece"
          hideDivider
        >
          <AppSettingsLayout.Card>
            <VerticalStack gap="4">
              <TextField label="Interjamb style" autoComplete="off" />
              <TextField label="Interjamb ratio" autoComplete="off" />
            </VerticalStack>
          </AppSettingsLayout.Card>
        </AppSettingsLayout.AnnotatedSection>
        <AppSettingsLayout.AnnotatedSection
          title="Dimensions"
          description="Size of your puzzlie piece"
        >
          <AppSettingsLayout.Card>
            <VerticalStack gap="4">
              <TextField label="Horizontal" autoComplete="off" />
              <TextField label="Interjamb ratio" autoComplete="off" />
            </VerticalStack>
          </AppSettingsLayout.Card>
        </AppSettingsLayout.AnnotatedSection>
      </AppSettingsLayout>
    </Page>
  );
}
