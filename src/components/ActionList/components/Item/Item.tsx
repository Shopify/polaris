import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import {ItemDescriptor} from '../../types';
import Icon from '../../../Icon';
import UnstyledLink from '../../../UnstyledLink';
import Badge from '../../../Badge';

import * as styles from '../../ActionList.scss';

export type Props = ItemDescriptor;

export default function Item({
  badge,
  content,
  url,
  onAction,
  icon,
  image,
  disabled,
  external,
  destructive,
  ellipsis,
}: Props) {
  const className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
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

  const contentMarkup = ellipsis && content ? `${content}…` : content;

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

  const control = url ? (
    <UnstyledLink
      url={url}
      onClick={onAction}
      className={styles.Item}
      external={external}
    >
      {contentElement}
    </UnstyledLink>
  ) : (
    <button
      onClick={onAction}
      className={className}
      disabled={disabled}
      type="button"
    >
      {contentElement}
    </button>
  );

  return <li>{control}</li>;
}
