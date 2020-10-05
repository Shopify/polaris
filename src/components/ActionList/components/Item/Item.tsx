import React from 'react';

import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import type {ActionListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import {Icon} from '../../../Icon';
import {UnstyledLink} from '../../../UnstyledLink';
import {Badge} from '../../../Badge';
import {TextStyle} from '../../../TextStyle';
import styles from '../../ActionList.scss';

export type ItemProps = ActionListItemDescriptor;

export function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  active,
  role,
}: ItemProps) {
  const {newDesignLanguage} = useFeatures();
  const className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active,
    newDesignLanguage && styles.newDesignLanguage,
  );

  let prefixMarkup: React.ReactNode | null = null;

  if (prefix) {
    prefixMarkup = <div className={styles.Prefix}>{prefix}</div>;
  } else if (icon) {
    prefixMarkup = (
      <div className={styles.Prefix}>
        <Icon source={icon} />
      </div>
    );
  } else if (image) {
    prefixMarkup = (
      <div
        role="presentation"
        className={styles.Prefix}
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
    <span className={styles.Suffix}>
      <Badge status={badge.status}>{badge.content}</Badge>
    </span>
  );

  const suffixMarkup = suffix && (
    <span className={styles.Suffix}>{suffix}</span>
  );

  const textMarkup = <div className={styles.Text}>{contentMarkup}</div>;

  const contentElement = (
    <div className={styles.Content}>
      {prefixMarkup}
      {textMarkup}
      {badgeMarkup}
      {suffixMarkup}
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
