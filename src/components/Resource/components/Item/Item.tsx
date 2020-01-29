import React, {memo, useRef, ReactNode, ReactElement} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {Button, buttonsFrom} from '../../../Button';
import {AvatarProps} from '../../../Avatar';
import {Checkbox} from '../../../Checkbox';
import {ThumbnailProps} from '../../../Thumbnail';
import {ButtonGroup} from '../../../ButtonGroup';
import {ActionList} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {UnstyledLink} from '../../../UnstyledLink';
import {DisableableAction} from '../../../../types';

import {useToggle} from '../../../../utilities/use-toggle';
import {useI18n} from '../../../../utilities/i18n';
import {classNames, variationName} from '../../../../utilities/css';
import {
  useResourceManagerForItem,
  MissingResourceManagerError,
  SelectionType,
} from '../../../../utilities/resources';

import styles from './Item.scss';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface OwnedProps {
  media?: ReactElement<AvatarProps | ThumbnailProps>;
  selected?: boolean;
  accessibilityLabel?: string;
  defaultLabel: string;
  name?: string;
  handleSelection: (
    event: React.MouseEvent | React.KeyboardEvent | React.FormEvent<any>,
  ) => void;
}

const Owned = memo(function Owned({
  media,
  handleSelection,
  selected,
  accessibilityLabel,
  defaultLabel,
  name,
}: OwnedProps) {
  const mediaMarkup = media && <div className={styles.Media}>{media}</div>;
  const handleMarkup = (
    <div
      className={styles.Handle}
      onChange={handleSelection}
      onClick={stopPropagation}
    >
      <Checkbox
        checked={selected}
        label={name || accessibilityLabel || defaultLabel}
        labelHidden
      />
    </div>
  );

  const ownedClassNames = classNames(styles.Owned, media && styles.hasMedia);

  return (
    <div className={ownedClassNames}>
      {handleMarkup}
      {mediaMarkup}
    </div>
  );
});

export interface ItemProps {
  media?: ReactElement<AvatarProps | ThumbnailProps>;
  shortcutActions?: DisableableAction[];
  persistActions?: boolean;
  selected?: boolean;
  url?: string;
  id: string;
  position?: number;
  children?: ReactNode;

  accessibilityLabel?: string;
  name?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  external?: boolean;
  verticalAlignment?: Alignment;
  onClick?(id: string): void;
}

export const Item = memo(function Item({
  media,
  shortcutActions,
  persistActions,
  selected,
  url,
  id,
  position,
  children,
  accessibilityLabel,
  name,
  ariaControls,
  ariaExpanded,
  external,
  verticalAlignment,
  onClick,
}: ItemProps) {
  const itemNode = useRef<HTMLLIElement>(null);
  const i18n = useI18n();
  const {
    value: actionMenuVisible,
    toggle: toggleActionMenuVisible,
    setFalse: closeActionMenuVisible,
  } = useToggle(false);
  const {onSelection, resourceName} = useResourceManagerForItem();

  const ownedMarkup = (
    <Owned
      handleSelection={handleSelection}
      selected={selected}
      defaultLabel={i18n.translate('Polaris.Common.checkbox')}
      accessibilityLabel={accessibilityLabel}
      media={media}
      name={name}
    />
  );

  const actionsMarkup = shortcutActions && (
    <div className={styles.Actions} onClick={stopPropagation}>
      <ButtonGroup segmented={!persistActions}>
        {buttonsFrom(shortcutActions, {
          plain: Boolean(persistActions),
          size: persistActions ? 'medium' : 'slim',
        })}
      </ButtonGroup>
    </div>
  );
  const disclosureMarkup = actionsMarkup && persistActions && (
    <div className={styles.Disclosure} onClick={stopPropagation}>
      <Popover
        activator={
          <Button
            accessibilityLabel={
              name
                ? i18n.translate(
                    'Polaris.ResourceList.Item.actionsDropdownLabel',
                    {
                      accessibilityLabel: name,
                    },
                  )
                : i18n.translate('Polaris.ResourceList.Item.actionsDropdown')
            }
            onClick={toggleActionMenuVisible}
            plain
            icon={HorizontalDotsMinor}
          />
        }
        onClose={closeActionMenuVisible}
        active={actionMenuVisible}
      >
        <ActionList items={shortcutActions} />
      </Popover>
    </div>
  );

  const content = children && <div className={styles.Content}>{children}</div>;

  const accessibleProps = {
    ...(url
      ? {'aria-describedby': id, url, external}
      : {
          'aria-controls': ariaControls,
          'aria-expanded': ariaExpanded,
          onClick: handleClick,
        }),
    'aria-label':
      accessibilityLabel ||
      i18n.translate('Polaris.ResourceList.Item.viewItem', {
        itemName: name || (resourceName && resourceName.singular) || '',
      }),
    className: styles.Overlay,
  };

  const AccessibleTag = url ? UnstyledLink : 'button';
  const accessibleMarkup = <AccessibleTag {...accessibleProps} />;

  const itemClassName = classNames(
    styles.Item,
    persistActions && styles.persistActions,
    selected && styles.selected,
  );

  const containerClassName = classNames(
    styles.Container,
    verticalAlignment && styles[variationName('alignment', verticalAlignment)],
  );

  return (
    <li
      className={itemClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={itemNode}
      data-href={url}
    >
      {accessibleMarkup}
      <div className={styles.FocusLine} />
      <div className={containerClassName} id={id}>
        {ownedMarkup}
        {content}
        {actionsMarkup}
        {disclosureMarkup}
      </div>
    </li>
  );

  function handleClick(event: React.MouseEvent<any>) {
    stopPropagation(event);
    const {ctrlKey, metaKey} = event.nativeEvent;
    const anchor = itemNode.current && itemNode.current.querySelector('a');
    const selectMode = resourceIs(itemNode.current, 'SelectMode');

    if (selectMode === 'true') {
      handleSelection(event);
      return;
    }

    if (anchor === event.target) return;

    if (onClick) {
      onClick(id);
    }

    if (url && (ctrlKey || metaKey)) {
      window.open(url, '_blank');
      return;
    }

    if (url && anchor) anchor.click();
  }

  function handleKeyDown({key}: React.KeyboardEvent) {
    const selectMode = resourceIs(itemNode.current, 'SelectMode');
    key === 'Enter' && url && selectMode === 'false' && onClick && onClick(id);
  }

  function handleSelection(
    event: React.MouseEvent | React.KeyboardEvent | React.FormEvent<any>,
  ) {
    stopPropagation(event);
    if (('key' in event && event.key !== ' ') || !onSelection) return;
    const selectionType =
      'shiftKey' in event.nativeEvent && event.nativeEvent.shiftKey
        ? SelectionType.Multi
        : SelectionType.Single;

    onSelection(selectionType, !selected, id, position);
  }
});

function stopPropagation(
  event: React.MouseEvent | React.KeyboardEvent | React.FormEvent,
) {
  event.stopPropagation();
}

function resourceIs(
  node: HTMLElement | null,
  state: 'Selectable' | 'SelectMode',
) {
  if (!node) return false;
  let target = node.parentElement;

  while (target) {
    const resourceState = target.dataset[`polarisResource${state}`];

    if (resourceState !== undefined) return resourceState;

    target = target.parentElement;
  }

  throw new MissingResourceManagerError();
}
