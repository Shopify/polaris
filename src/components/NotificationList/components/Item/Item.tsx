import React from 'react';

import {classNames} from '../../../../utilities/css';
import type {NotificationListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import styles from '../../NotificationList.scss';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';

export type ItemProps = NotificationListItemDescriptor;

export function Item({
  id,
  title,
  body,
  domain,
  time,
  isOpen,
  status,
  accessibilityLabel,
  onAction,
  active,
  role,
}: ItemProps) {
  const className = classNames(styles.Item, active && styles.active);

  const contentElement = (
    <span className={styles.Content}>
      {title}
      {body}
      {domain}
      {time}
      {isOpen}
      {status}
    </span>
  );

  const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

  return (
    <li role={role}>
      {scrollMarkup}
      <span
        id={id}
        className={className}
        aria-label={accessibilityLabel}
        onClick={onAction}
        onMouseUp={handleMouseUpByBlurring}
      >
        {contentElement}
      </span>
    </li>
  );
}
