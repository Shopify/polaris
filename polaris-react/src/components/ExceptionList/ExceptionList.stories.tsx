import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ExceptionList} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';

export default {
  component: ExceptionList,
} as ComponentMeta<typeof ExceptionList>;

export function Default() {
  return (
    <ExceptionList
      items={[
        {
          icon: NoteMinor,
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
      ]}
    />
  );
}
