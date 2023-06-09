import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {DescriptionList} from '@shopify/polaris';

export default {
  component: DescriptionList,
} as ComponentMeta<typeof DescriptionList>;

export function Default() {
  return (
    <DescriptionList
      items={[
        {
          term: 'Logistics',
          description:
            'The management of products or other resources as they travel between a point of origin and a destination.',
        },
        {
          term: 'Sole proprietorship',
          description:
            'A business structure where a single individual both owns and runs the company.',
        },
        {
          term: 'Discount code',
          description:
            'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
        },
      ]}
    />
  );
}

export function Tight() {
  return (
    <DescriptionList
      spacing="tight"
      items={[
        {
          term: 'Logistics',
          description:
            'The management of products or other resources as they travel between a point of origin and a destination.',
        },
        {
          term: 'Sole proprietorship',
          description:
            'A business structure where a single individual both owns and runs the company.',
        },
        {
          term: 'Discount code',
          description:
            'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
        },
      ]}
    />
  );
}
