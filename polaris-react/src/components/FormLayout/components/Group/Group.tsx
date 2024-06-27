import React, {Children, useId} from 'react';

import {wrapWithComponent} from '../../../../utilities/components';
import {Box} from '../../../Box';
import {BlockStack} from '../../../BlockStack';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {Item} from '../Item';

export interface GroupProps {
  children?: React.ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: React.ReactNode;
}

export function Group({children, condensed, title, helpText}: GroupProps) {
  const id = useId();

  let helpTextElement = null;
  let helpTextId: undefined | string;
  let titleElement = null;
  let titleId: undefined | string;

  if (helpText) {
    helpTextId = `${id}HelpText`;
    helpTextElement = (
      <Box id={helpTextId}>
        <Text as="p" variant="bodySm" tone="subdued">
          {helpText}
        </Text>
      </Box>
    );
  }

  if (title) {
    titleId = `${id}Title`;
    titleElement = (
      <Text id={titleId} as="p">
        {title}
      </Text>
    );
  }

  const itemsMarkup = Children.map(children, (child) =>
    wrapWithComponent(child, Item, {condensed}),
  );

  return (
    <BlockStack
      role="group"
      gap="200"
      aria-labelledby={titleId}
      aria-describedby={helpTextId}
    >
      {titleElement}
      <InlineStack gap="300">{itemsMarkup}</InlineStack>
      {helpTextElement}
    </BlockStack>
  );
}
