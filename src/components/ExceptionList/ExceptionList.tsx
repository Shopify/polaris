import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';
import Truncate from '../Truncate';

import * as styles from './ExceptionList.scss';

export interface Item {
  status?: 'critical' | 'warning',
  icon?: 'conversation' | 'risk', // | 'notification' // include after PR merge of 1017
  title?: string,
  description: string,
  truncate?: boolean,
}

export interface Props {
  items: Item[],
}

export default function ExceptionList({items: itemsList}: Props) {
  const items = itemsList.map((item, index) => {
    const {
      status,
      icon,
      title,
      description,
      truncate = false,
    } = item;

    const itemClasses = classnames(
      styles.Item,
      status && styles[`Item--${status}`],
    );

    const iconMarkup = icon
      ? <Icon source={icon} />
      : <span className={styles.Bullet} />;

    const titleMarkup = title && (
      <span className={styles.Summary}>{title}</span>
    );

    const descriptionMarkup = description && (
      <span className={styles.Description}>{description}</span>
    );

    const Element = truncate ? Truncate : 'span';

    return (
      <li className={itemClasses} key={index}>
        <span className={styles.Icon}>
          {iconMarkup}
        </span>
        <Element>
          {titleMarkup}
          {descriptionMarkup}
        </Element>
      </li>
    );
  });

  return <ul className={styles.ExceptionList}>{items}</ul>;
}
