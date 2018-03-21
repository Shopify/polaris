import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {Action, DisableableAction, LoadableAction} from '../../types';
import Button, {buttonFrom} from '../Button';
import Heading from '../Heading';
import ButtonGroup from '../ButtonGroup';
import UnstyledLink from '../UnstyledLink';
import Icon, {Props as IconProps} from '../Icon';

import * as styles from './Banner.scss';

import successIcon from './icons/circle-check-mark.svg';
import fallbackIcon from './icons/flag.svg';
import warningIcon from './icons/circle-alert.svg';
import criticalIcon from './icons/circle-barred.svg';
import infoIcon from './icons/circle-information.svg';

export type Status = 'success' | 'info' | 'warning' | 'critical';

export interface Props {
  /** Title content for the banner. */
  title?: string;
  /** Icon to display in the banner. */
  icon?: IconProps['source'];
  /** Sets the status of the banner. */
  status?: Status;
  /** The child elements to render in the banner. */
  children?: React.ReactNode;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Callback when banner is dismissed */
  onDismiss?(): void;
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
  let ariaRoleType = 'status';

  switch (status) {
    case 'success':
      color = 'greenDark';
      defaultIcon = successIcon;
      break;
    case 'info':
      color = 'tealDark';
      defaultIcon = infoIcon;
      break;
    case 'warning':
      color = 'yellowDark';
      defaultIcon = warningIcon;
      ariaRoleType = 'alert';
      break;
    case 'critical':
      color = 'redDark';
      defaultIcon = criticalIcon;
      ariaRoleType = 'alert';
      break;
    default:
      color = 'inkLighter';
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

  const actionMarkup = action ? (
    <div className={styles.Actions}>
      <ButtonGroup>
        {buttonFrom(action, {outline: true})}
        {secondaryActionMarkup}
      </ButtonGroup>
    </div>
  ) : null;

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

  const dismissButton = onDismiss ? (
    <div className={styles.Dismiss}>
      <Button
        plain
        icon="cancelSmall"
        onClick={onDismiss}
        accessibilityLabel="Dismiss notification"
      />
    </div>
  ) : null;

  return (
    <div
      className={className}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role={ariaRoleType}
      aria-live="polite"
      onMouseUp={handleMouseUp}
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

function handleMouseUp({currentTarget}: React.MouseEvent<HTMLDivElement>) {
  currentTarget.blur();
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
