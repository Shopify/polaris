import React, {Children, useId} from 'react';

import {wrapWithComponent} from '../../../../utilities/components';
import {Box} from '../../../Box';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {Item} from '../Item';
import styles from '../../FormLayout.scss';

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
      <Box id={helpTextId} color="text-secondary">
        {helpText}
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
    <div
      role="group"
      className={styles.Group}
      aria-labelledby={titleId}
      aria-describedby={helpTextId}
    >
      {titleElement}
      <InlineStack gap="300">{itemsMarkup}</InlineStack>
      {helpTextElement}
    </div>
  );
}
