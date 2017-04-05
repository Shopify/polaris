import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Button, {Props as ButtonProps} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Breadcrumbs, {BreadcrumbDescriptor} from '../Breadcrumbs';
import DisplayText from '../DisplayText';

import * as styles from './Page.scss';

export interface Action {
  text: string,
  to?: string,
  onClick?(): void,
}

export interface IconAction extends Action {
  icon?: ButtonProps['leftIcon'],
}

export interface Props {
  title: string,
  icon?: string,
  breadcrumbs?: BreadcrumbDescriptor[],
  children?: React.ReactNode,
  fullWidth?: boolean,
  secondaryActions?: IconAction[],
  primaryAction?: Action,
}

export default function Page({
  icon,
  children,
  title,
  breadcrumbs,
  primaryAction,
  secondaryActions,
  fullWidth,
}: Props) {
  const className = classNames(
    styles.Page,
    fullWidth && styles.fullWidth,
  );

  const breadcrumbMarkup = breadcrumbs
    ? (
      <div className={styles.Breadcrumbs}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    )
    : null;

  const primaryActionMarkup = primaryAction
    ? (
      <Button
        primary
        to={primaryAction.to}
        onClick={primaryAction.onClick}
      >
        {primaryAction.text}
      </Button>
    )
    : null;

  const secondaryActionsMarkup = secondaryActions
    ? secondaryActions.map((secondaryAction) => (
      <Button
        plain
        key={secondaryAction.text}
        to={secondaryAction.to}
        leftIcon={secondaryAction.icon}
        onClick={secondaryAction.onClick}
      >
        {secondaryAction.text}
      </Button>
    ))
    : null;

  const actionsMarkup = primaryAction || secondaryActions
    ? <ButtonGroup>{secondaryActionsMarkup}{primaryActionMarkup}</ButtonGroup>
    : null;

  const iconMarkup = icon
    ? <div className={styles.Icon} style={{backgroundImage: icon}} />
    : null;

  return (
    <div className={className}>
      <div className={styles.Header}>
        <div className={styles.Details}>
          {iconMarkup}
          <div className={styles.Title}>
            {breadcrumbMarkup}
            <DisplayText size="large">{title}</DisplayText>
          </div>
        </div>

        <div className={styles.Actions}>
          {actionsMarkup}
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
