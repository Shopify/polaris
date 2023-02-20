import type {Meta, StoryFn} from '@storybook/react';
import {Stack} from '@shopify/polaris';

import type {FilterPillProps} from './FilterPill';
import {FilterPill} from './FilterPill';

// Learn how to write stories:
// https://github.com/Shopify/web/blob/master/app/stories/02-HowToWriteStories.stories.mdx
const meta: Meta = {
  component: FilterPill,
  parameters: {
    // Embedding Figma designs
    // The embed appears in the "Design" tab of the story
    // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/...?node-id=...',
    // },
  },
};

export default meta;

// 👇 We create a "template" of how args map to rendering
const Template: StoryFn<FilterPillProps> = (args) => (
  <div style={{padding: 'var(--p-space-4)'}}>
    <Stack>
      <FilterPill {...args} />
    </Stack>
  </div>
);

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  filterKey: 'foo',
  key: 'bar',
  selected: false,
  initialActive: false,
  onRemove: () => {},
  onClick: () => {},
  label: 'Shipping country',
  filter: <div>This is a filter</div>,
  disabled: false,
  pinned: false,
  hideClearButton: false,
};

export const WithFilterInitiallyActive = Template.bind({});

WithFilterInitiallyActive.args = {
  filterKey: 'foo',
  key: 'bar',
  selected: false,
  initialActive: true,
  onRemove: () => {},
  onClick: () => {},
  label: 'Fulfillment status',
  filter: <div>This is a filter</div>,
  disabled: false,
  pinned: false,
  hideClearButton: false,
};
