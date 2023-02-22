import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box} from '@shopify/polaris';

import type {FilterPillProps} from './FilterPill';
import {FilterPill} from './FilterPill';

export default {
  component: FilterPill,
  parameters: {
    a11y: {
      config: {
        // disabled due to DataTable having a scrollable region without
        // keyboard access when all content fits without scrolling.
        rules: [{id: 'scrollable-region-focusable', enabled: false}],
      },
    },
  },
} as ComponentMeta<typeof FilterPill>;

export function Default() {
  return (
    <FilterPill
      filterKey="foo"
      key="bar"
      selected={false}
      initialActive={false}
      onRemove={() => {}}
      onClick={() => {}}
      label="Shipping country"
      filter={<div>This is a filter</div>}
      disabled={false}
      pinned={false}
      hideClearButton={false}
    />
  );
}
