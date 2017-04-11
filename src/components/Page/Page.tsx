import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {DisableableAction, ComplexAction} from '../types';
import {buttonsFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Breadcrumbs, {Props as BreadcrumbProps} from '../Breadcrumbs';
import DisplayText from '../DisplayText';

import * as styles from './Page.scss';

export interface Props {
  title: string,
  icon?: string,
  breadcrumbs?: BreadcrumbProps['breadcrumbs'],
  children?: React.ReactNode,
  fullWidth?: boolean,
  secondaryActions?: ComplexAction[],
  primaryAction?: DisableableAction,
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
    ? buttonsFrom(primaryAction, {primary: true})
    : null;

  const secondaryActionsMarkup = secondaryActions
    ? buttonsFrom(secondaryActions, {plain: true})
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
            <DisplayText size="large" element="h1">{title}</DisplayText>
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
