import type {ReactNode} from 'react';
import {Children} from 'react';

import {classNames} from '../../../../utilities/css';
import {wrapWithComponent} from '../../../../utilities/components';
import {useUniqueId} from '../../../../utilities/unique-id';
import styles from '../../FormLayout.scss';
import {Item} from '../Item';

export interface GroupProps {
  children?: ReactNode;
  condensed?: boolean;
  title?: string;
  helpText?: ReactNode;
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
