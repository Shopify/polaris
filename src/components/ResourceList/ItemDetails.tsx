import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import Badge, {Status} from '../Badge';
import * as styles from './ItemDetails.scss';

export type ExceptionStatus = 'neutral' | 'warning' | 'critical';

export interface BadgeDescriptor {
  status: Status,
  content: string,
}

export interface ExceptionDescriptor {
  status?: ExceptionStatus,
  title?: string,
  description?: string,
}

export interface Props {
  attributeOne?: string,
  attributeTwo?: React.ReactNode,
  attributeThree?: React.ReactNode,
  persistActions?: boolean,
  badges?: BadgeDescriptor[],
  exceptions?: ExceptionDescriptor[],
}

export default function ItemDetails({attributeOne, attributeTwo, attributeThree, badges, exceptions, persistActions}: Props) {

  const attributeTwoMarkup = attributeTwo
    ? <div className={styles.AttributeTwo}>{attributeTwo}</div>
    : null;

  const badgeMarkup = badges
    ? <div className={styles.Badge}>{badges.map(renderBadge)}</div>
    : null;

  const attributeThreeMarkup = attributeThree
    ? <div className={styles.AttributeThree}>{attributeThree}</div>
    : null;

  const exceptionsMarkup = exceptions
    ? <ul className={styles.ExceptionList}>{exceptions.map(renderException)}</ul>
    : null;

  const className = classNames(
    persistActions && styles['Item-persistActions'],
  );

  return (
    <div className={className}>
      <div className={styles.Attributes}>
        <p className={styles.AttributeOne}>
          {attributeOne}
        </p>
        {attributeTwoMarkup}
        {badgeMarkup}
        {attributeThreeMarkup}
      </div>
      {exceptionsMarkup}
    </div>
  );
}

function renderBadge(badge: BadgeDescriptor) {
  return <Badge key={badge.content} status={badge.status}>{badge.content}</Badge>;
}

function renderException(exception: ExceptionDescriptor, index: number) {
  const {status, title, description} = exception;
  const className = classNames(
    styles.ExceptionItem,
    status && styles[variationName('ExceptionItem-status', status)],
  );

  const titleMarkup = title != null
    ? <div className={styles.Title}>{title}</div>
    : null;

  const descriptionMarkup = description != null
    ? <div className={styles.Description}>{description}</div>
    : null;

  return (
    <li key={index} className={className}>
      {titleMarkup}
      {descriptionMarkup}
    </li>
  );
}
