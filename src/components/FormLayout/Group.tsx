import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent} from '@shopify/react-utilities/components';

import * as styles from './FormLayout.scss';
import Item from './Item';

export interface Props {
  children?: React.ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: React.ReactNode;
}

const getUniqueID = createUniqueIDFactory('FormLayoutGroup');

export default function Group({children, condensed, title, helpText}: Props) {
  const className = classNames(condensed && styles.condensed);

  const id = getUniqueID();

  let helpTextElement = null;
  let helpTextID: undefined | string;
  let titleElement = null;
  let titleID: undefined | string;

  if (helpText) {
    helpTextID = `${id}HelpText`;
    helpTextElement = (
      <div id={helpTextID} className={styles.HelpText}>
        {helpText}
      </div>
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

  const itemsMarkup = React.Children.map(children, (child) =>
    wrapWithComponent(child, Item),
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
