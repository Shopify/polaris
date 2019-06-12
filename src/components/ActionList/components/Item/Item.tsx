import * as React from 'react';
import {classNames} from '@shopify/css-utilities';

import {ActionListItemDescriptor} from '../../../../types';
import Scrollable from '../../../Scrollable';
import Icon from '../../../Icon';
import UnstyledLink from '../../../UnstyledLink';
import Badge from '../../../Badge';
import TextStyle from '../../../TextStyle';

import styles from '../../ActionList.scss';

export type Props = ActionListItemDescriptor;

export default function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  icon,
  image,
  disabled,
  external,
  destructive,
  ellipsis,
  active,
  role,
}: Props) {
  const className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active,
  );

  let imageElement = null;

  if (icon) {
    imageElement = (
      <div className={styles.Image}>
        <Icon source={icon} />
      </div>
    );
  } else if (image) {
    imageElement = (
      <div
        role="presentation"
        className={styles.Image}
        style={{backgroundImage: `url(${image}`}}
      />
    );
  }

  const contentText = ellipsis && content ? `${content}…` : content;

  const contentMarkup = helpText ? (
    <div>
      <div>{contentText}</div>
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </div>
  ) : (
    contentText
  );

  const badgeMarkup = badge && (
    <span className={styles.BadgeWrapper}>
      <Badge status={badge.status}>{badge.content}</Badge>
    </span>
  );

  const textMarkup = imageElement ? (
    <div className={styles.Text}>{contentMarkup}</div>
  ) : (
    contentMarkup
  );

  const contentElement = (
    <div className={styles.Content}>
      {imageElement}
      {textMarkup}
      {badgeMarkup}
    </div>
  );

  const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

  const control = url ? (
    <UnstyledLink
      id={id}
      url={url}
      className={className}
      external={external}
      aria-label={accessibilityLabel}
      onClick={onAction}
    >
      {contentElement}
    </UnstyledLink>
  ) : (
    <button
      id={id}
      type="button"
      className={className}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={onAction}
    >
      {contentElement}
    </button>
  );

  return (
    <li role={role} aria-selected={active}>
      {scrollMarkup}
      {control}
    </li>
  );
}
