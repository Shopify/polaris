import React, {useMemo} from 'react';

import {MappedActionContext} from '../../context';
import {ListBox} from '../ListBox';
import type {ActionListItemDescriptor} from '../../../../types';
import {Icon} from '../../../Icon';
import {TextStyle} from '../../../TextStyle';
import {Badge} from '../../../Badge';
import {useI18n} from '../../../../utilities/i18n';

import styles from './MappedAction.scss';

/**
 *                   helpText
 *                   icon -> icon
 *                   image
 *                   prefix -> children
 *                   suffix -> children
 *                   ellipsis
 *                   role
 *                  active -> selected
 *
 *                  id
 *                  content -> children
 *                  url
 *                  external
 *                  onAction
 *                  onMouseAction -> noop
 *                  onTouchStart -> noop
 *                  disabled -> disabled
 *                  destructive
 *                  badge {status, content}
 */

interface MappedAction extends ActionListItemDescriptor {}

export function MappedAction({
  active,
  content,
  disabled,
  icon,
  image,
  prefix,
  suffix,
  ellipsis,
  role,
  url,
  external,
  onAction,
  destructive,
  badge,
  helpText,
}: MappedAction) {
  const i18n = useI18n();

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

  const badgeMarkup = badge && (
    <span className={styles.Suffix}>
      <Badge status={badge.status}>{badge.content}</Badge>
    </span>
  );

  const suffixMarkup = suffix && (
    <span className={styles.Suffix}>{suffix}</span>
  );

  const contentText =
    ellipsis && content
      ? i18n.translate('Polaris.Autocomplete.ellipsis', {content})
      : content;

  const contentMarkup = (
    <div>
      {contentText}
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </div>
  );

  const context = useMemo(
    () => ({
      role,
      url,
      external,
      onAction,
      destructive,
      isAction: true,
    }),
    [role, url, external, onAction, destructive],
  );

  return (
    <MappedActionContext.Provider value={context}>
      <ListBox.Action
        selected={active}
        disabled={disabled}
        value={content || ''}
      >
        {prefixMarkup}
        {contentMarkup}
        {badgeMarkup}
        {suffixMarkup}
      </ListBox.Action>
    </MappedActionContext.Provider>
  );
}
