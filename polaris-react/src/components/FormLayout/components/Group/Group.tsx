import React, {Children} from 'react';

import {classNames} from '../../../../utilities/css';
import {wrapWithComponent} from '../../../../utilities/components';
import {useUniqueId} from '../../../../utilities/unique-id';
import {Box} from '../../../Box';
import {Item} from '../Item';
import styles from '../../FormLayout.scss';

export interface GroupProps {
  children?: React.ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: React.ReactNode;
}

export function Group({children, condensed, title, helpText}: GroupProps) {
  const className = classNames(condensed ? styles.condensed : styles.grouped);

  const id = useUniqueId('FormLayoutGroup');

  let helpTextElement = null;
  let helpTextID: undefined | string;
  let titleElement = null;
  let titleID: undefined | string;

  if (helpText) {
    helpTextID = `${id}HelpText`;
    helpTextElement = (
      <Box
        id={helpTextID}
        paddingBlockStart="2"
        paddingInlineStart="5"
        paddingBlockEnd="0"
        paddingInlineEnd="5"
        color="text-subdued"
      >
        {helpText}
      </Box>
    );
  }

  if (title) {
    titleID = `${id}Title`;
    titleElement = (
      <div id={titleID} className={styles.Title}>
        {title}
      </div>
    );
  }

  const itemsMarkup = Children.map(children, (child) =>
    wrapWithComponent(child, Item, {}),
  );

  return (
    <div
      role="group"
      className={className}
      aria-labelledby={titleID}
      aria-describedby={helpTextID}
    >
      {titleElement}
      <div className={styles.Items}>{itemsMarkup}</div>
      {helpTextElement}
    </div>
  );
}
