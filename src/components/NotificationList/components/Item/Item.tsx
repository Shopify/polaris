import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import type {NotificationListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import styles from '../../NotificationList.scss';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';
import {MessageIndicator} from '../MessageIndicator';
import {TextStyle} from '../../../TextStyle';
import {Icon} from '../../../Icon';
import {Badge} from '../../../Badge';
import {ThemeProvider} from '../../../ThemeProvider';

export type ItemProps = NotificationListItemDescriptor;

export function Item({
  id,
  badge,
  title,
  body,
  domain,
  time,
  isOpen,
  accessibilityLabel,
  onAction,
  active,
  role,
  onDismiss,
}: ItemProps) {
  const className = classNames(styles.Item, active && styles.active);

  const dismissMarkup = (
    <div className={styles.CloseButtonWrapper}>
      <button type="button" className={styles.CloseButton} onClick={onDismiss}>
        <Icon source={CancelSmallMinor} color="base" />
      </button>
    </div>
  );

  const badgeMarkup = badge && (
    <p className={styles.Badge}>
      <ThemeProvider theme={{colorScheme: 'light'}}>
        <Badge status={badge.status}>{badge.content}</Badge>
      </ThemeProvider>
    </p>
  );

  const contentElement = (
    <span className={styles.ContentWrapper}>
      <MessageIndicator active={!isOpen} />
      <span className={styles.Content}>
        <p className={styles.Heading}>
          <TextStyle variation="subdued">
            {domain} · {time}
          </TextStyle>
        </p>
        <p>
          <strong>{title}</strong>
        </p>
        <p>{body}</p>
        {badgeMarkup}
      </span>
      {dismissMarkup}
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
