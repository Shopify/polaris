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
  let helpTextID: undefined | string;
  let titleElement = null;
  let titleID: undefined | string;

  if (helpText) {
    helpTextID = `${id}HelpText`;
    helpTextElement = (
      <Box id={helpTextID} color="text-secondary">
        {helpText}
      </Box>
    );
  }

  if (title) {
    titleID = `${id}Title`;
    titleElement = (
      <Text as="p" fontWeight="medium">
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
      aria-labelledby={titleID}
      aria-describedby={helpTextID}
    >
      {titleElement}
      <InlineStack gap="300">{itemsMarkup}</InlineStack>
      {helpTextElement}
    </BlockStack>
  );
}
