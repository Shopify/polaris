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
  accessibilityLabel,
  onAction,
  active,
  role,
  onDismiss,
  createdAt,
  isRead,
}: ItemProps) {
  const className = classNames(styles.Item, active && styles.active);

  const dismissMarkup = (
    <div className={styles.CloseButtonWrapper}>
      <button type="button" className={styles.CloseButton} onClick={onDismiss}>
        <Icon source={CancelSmallMinor} color="base" />
      </button>
    </div>
  );

  let badgeMarkup = badge && (
    <p className={styles.Badge}>
      <ThemeProvider theme={{colorScheme: 'light'}}>
        <Badge status={badge.status}>{badge.content}</Badge>
      </ThemeProvider>
    </p>
  );

  if (id === 'gid://shopify/AdminNotification/2') {
    badgeMarkup = (
      <p className={styles.Badge}>
        <ThemeProvider theme={{colorScheme: 'light'}}>
          <Badge status="critical">Critical</Badge>
        </ThemeProvider>
      </p>
    );
  }

  let notificationDomain = 'Billing';

  if (domain) {
    notificationDomain = domain;
  } else if (id === 'gid://shopify/AdminNotification/4') {
    notificationDomain = 'Settings';
  }

  const contentElement = (
    <span className={styles.ContentWrapper}>
      <MessageIndicator active={!isRead} />
      <span className={styles.Content}>
        <p className={styles.Heading}>
          <TextStyle variation="subdued">
            {notificationDomain} · {createdAt}
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
