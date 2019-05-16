import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import Icon, {Props as IconProps} from '../Icon';
import Truncate from '../Truncate';

import styles from './ExceptionList.scss';

export type Description =
  | string
  | React.ReactElement<any>
  | (string | React.ReactElement<any>)[];

export interface Item {
  /** Set the color of the icon and title for the given item. */
  status?: 'critical' | 'warning';
  /** Icon displayed by the list item */
  icon?: IconProps['source'];
  /** Text displayed beside the icon */
  title?: string;
  /** Text displayed for the item */
  description?: Description;
  /** Should the description be truncated at end of line */
  truncate?: boolean;
}

export interface Props {
  /** Collection of items for list */
  items: Item[];
}

export default function ExceptionList({items: itemsList}: Props) {
  const items = itemsList.map((item, index) => {
    const {status, icon, title, description, truncate = false} = item;

    const itemClasses = classNames(
      styles.Item,
      status && styles[variationName('status', status)],
    );

    const iconMarkup = icon ? (
      <Icon source={icon} />
    ) : (
      <span className={styles.Bullet} />
    );

    const titleMarkup = title && <span className={styles.Title}>{title}</span>;

    const descriptionMarkup = description && (
      <span className={styles.Description}>{description}</span>
    );

    const Element = truncate ? Truncate : React.Fragment;

    return (
      <li className={itemClasses} key={index}>
        <span className={styles.Icon}>{iconMarkup}</span>
        <Element>
          {titleMarkup}
          {descriptionMarkup}
        </Element>
      </li>
    );
  });

  return <ul className={styles.ExceptionList}>{items}</ul>;
}
