import React, {useMemo} from 'react';

import type {ActionListItemDescriptor} from '../../../../types';
import {Badge} from '../../../Badge';
import {classNames} from '../../../../utilities/css';
import {MappedActionContext} from '../../../../utilities/autocomplete';
import {Listbox} from '../../../Listbox';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {useI18n} from '../../../../utilities/i18n';

import styles from './MappedAction.scss';

interface MappedAction extends ActionListItemDescriptor {
  wrapOverflow?: boolean;
}

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
  wrapOverflow = false,
}: MappedAction) {
  const i18n = useI18n();

  let prefixMarkup: React.ReactNode | null = null;

  const contentOverflowStyle = wrapOverflow ? styles.ContentWrap : undefined;

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
    <div className={styles.Text}>
      <div className={contentOverflowStyle}>{contentText}</div>
      {helpText ? (
        <Text color="subdued" as="span">
          {helpText}
        </Text>
      ) : null}
    </div>
  );

  const context = useMemo(
    () => ({
      role,
      url,
      external,
      onAction,
      destructive,
    }),
    [role, url, external, onAction, destructive],
  );

  const actionClassNames = classNames(
    styles.Action,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.selected,
  );

  return (
    <MappedActionContext.Provider value={context}>
      <div className={styles.ActionContainer}>
        <Listbox.Action
          selected={active}
          disabled={disabled}
          value={content || ''}
        >
          <div className={actionClassNames}>
            <div className={styles.Content}>
              {prefixMarkup}
              {contentMarkup}
              {badgeMarkup}
              {suffixMarkup}
            </div>
          </div>
        </Listbox.Action>
      </div>
    </MappedActionContext.Provider>
  );
}
