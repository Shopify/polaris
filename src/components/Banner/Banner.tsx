import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {Action} from '../../types';
import Button, {buttonFrom} from '../Button';
import Heading from '../Heading';
import ButtonGroup from '../ButtonGroup';
import UnstyledLink from '../UnstyledLink';
import Icon, {Props as IconProps} from '../Icon';

import * as styles from './Banner.scss';

import successIcon from './icons/circle-check-mark.svg';
import infoIcon from './icons/flag.svg';
import warningIcon from './icons/circle-alert.svg';
import criticalIcon from './icons/circle-barred.svg';
import fallbackIcon from './icons/confetti.svg';

export type Status = 'success' | 'info' | 'warning' | 'critical';

export interface Props {
  icon?: IconProps['source'],
  title?: string,
  status?: Status,
  action?: Action,
  secondaryAction?: Action,
  children?: React.ReactNode,
  onDismiss?(): void,
}

export default function Banner({
  icon,
  action,
  secondaryAction,
  title,
  children,
  status,
  onDismiss,
}: Props) {
  let color: IconProps['color'];
  let defaultIcon: IconProps['source'];

  switch (status) {
    case 'success':
      color = 'greenDark';
      defaultIcon = successIcon;
      break;
    case 'info' :
      color = 'tealDark';
      defaultIcon = infoIcon;
      break;
    case 'warning':
      color = 'yellowDark';
      defaultIcon = warningIcon;
      break;
    case 'critical':
      color = 'redDark';
      defaultIcon = criticalIcon;
      break;
    default:
      color = 'ink';
      defaultIcon = fallbackIcon;
  }

  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
    onDismiss && styles.hasDismiss,
  );

  const id = uniqueID();
  const iconName = icon || defaultIcon;

  let headingMarkup: React.ReactNode = null;
  let headingID: string | undefined;

  if (title) {
    headingID = `${id}Heading`;
    headingMarkup = (
      <div className={styles.Heading} id={headingID}>
        <Heading element="p">{title}</Heading>
      </div>
    );
  }

  const secondaryActionMarkup = secondaryAction
    ? secondaryActionFrom(secondaryAction)
    : null;

  const actionMarkup = action
    ? (
      <div className={styles.Actions}>
        <ButtonGroup>
          {buttonFrom(action, {outline: true})}
          {secondaryActionMarkup}
        </ButtonGroup>
      </div>
    )
    : null;

  let contentMarkup = null;
  let contentID: string | undefined;

  if (children || actionMarkup) {
    contentID = `${id}Content`;
    contentMarkup = (
      <div className={styles.Content} id={contentID}>
        {children}
        {actionMarkup}
      </div>
    );
  }

  const dismissButton = onDismiss
    ? (
      <div className={styles.Dismiss}>
        <Button
          plain
          icon="cancelSmall"
          onClick={onDismiss}
          accessibilityLabel="Dismiss notification"
        />
      </div>
    )
    : null;

  return (
    <div
      className={className}
      tabIndex={0}
      role={`banner ${status}`}
      aria-labelledby={headingID}
      aria-describedby={contentID}
    >
      {dismissButton}
      <div className={styles.Ribbon}>
        <Icon source={iconName} color={color} backdrop />
      </div>
      <div>
        {headingMarkup}
        {contentMarkup}
      </div>
    </div>
  );
}

let index = 1;
function uniqueID() {
  return `Banner${index++}`;
}

function secondaryActionFrom(action: Action) {
  if (action.url) {
    return (
      <UnstyledLink className={styles.SecondaryAction} url={action.url}>
        <span className={styles.Text}>{action.content}</span>
      </UnstyledLink>
    );
  }

  return (
    <button className={styles.SecondaryAction} onClick={action.onAction}>
      <span className={styles.Text}>{action.content}</span>
    </button>
  );
}
