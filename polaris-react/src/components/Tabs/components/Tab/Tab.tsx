import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  KeyboardEvent,
  forwardRef,
  RefObject,
  MutableRefObject,
  RefCallback,
} from 'react';
import {
  InfoMinor,
  DuplicateMinor,
  Columns3Minor,
  EditMinor,
  DeleteMinor,
  CaretDownMinor,
} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {
  focusFirstFocusableNode,
  handleMouseUpByBlurring,
} from '../../../../utilities/focus';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {UnstyledButton} from '../../../UnstyledButton';
import {UnstyledLink} from '../../../UnstyledLink';
import {Icon} from '../../../Icon';
import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {Modal} from '../../../Modal';
import {Badge} from '../../../Badge';
import {Inline} from '../../../Inline';
import {Text} from '../../../Text';
import type {TabPropsWithAddedMethods} from '../../types';
import styles from '../../Tabs.scss';

import {RenameViewModal, DuplicateViewModal} from './components';

export const Tab = forwardRef(
  (
    {
      content,
      accessibilityLabel,
      badge,
      id,
      panelID,
      url,
      onAction,
      actions,
      disabled,
      isModalLoading,
      icon,
      siblingTabHasFocus,
      measuring,
      focused,
      selected,
      onToggleModal,
      onTogglePopover,
      viewNames,
      tabIndexOverride,
      onFocus,
    }: TabPropsWithAddedMethods,
    ref: RefObject<HTMLElement>,
  ) => {
    const i18n = useI18n();
    const [popoverActive, setPopoverActive] = useState(false);
    const [isRenameViewModalActive, setIsRenameViewModalActive] =
      useState(false);
    const [isDeleteViewModalActive, setIsDeleteViewModalActive] =
      useState(false);
    const [isDuplicateViewModalActive, setIsDuplicateViewModalActive] =
      useState(false);
    const {mdDown} = useBreakpoints();

    const wasSelected = useRef(selected);
    const panelFocused = useRef(false);
    const node = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
      onTogglePopover(popoverActive);
    }, [popoverActive, onTogglePopover]);

    useEffect(() => {
      onToggleModal(isRenameViewModalActive);
    }, [isRenameViewModalActive, onToggleModal]);

    useEffect(() => {
      onToggleModal(isDuplicateViewModalActive);
    }, [isDuplicateViewModalActive, onToggleModal]);

    useEffect(() => {
      onToggleModal(isDeleteViewModalActive);
    }, [isDeleteViewModalActive, onToggleModal]);

    useEffect(() => {
      return () => {
        onToggleModal(false);
        onTogglePopover(false);
      };
    }, [onToggleModal, onTogglePopover]);

    // A tab can start selected when it is moved from the disclosure dropdown into the main list, so we need to send focus from the tab to the panel on mount and update
    useEffect(() => {
      if (measuring) {
        return;
      }

      // Because of timing issues with the render, we may still have the old, in-disclosure version of the tab that has focus. Check for this as a second indicator of focus
      const itemHadFocus =
        focused || (document.activeElement && document.activeElement.id === id);

      // If we just check for selected, the panel for the active tab will be focused on page load, which we don’t want
      if (
        itemHadFocus &&
        selected &&
        panelID != null &&
        !panelFocused.current
      ) {
        focusPanelID(panelID);
        panelFocused.current = true;
      }

      if (selected && !wasSelected.current && panelID != null) {
        focusPanelID(panelID);
      } else if (
        focused &&
        node.current != null &&
        !isRenameViewModalActive &&
        !isDeleteViewModalActive &&
        !isDuplicateViewModalActive &&
        !disabled
      ) {
        focusFirstFocusableNode(node.current);
      }

      wasSelected.current = selected;
    }, [
      focused,
      id,
      content,
      measuring,
      panelID,
      selected,
      isRenameViewModalActive,
      isDeleteViewModalActive,
      isDuplicateViewModalActive,
      disabled,
    ]);

    let tabIndex: 0 | -1;

    if (selected && !siblingTabHasFocus && !measuring) {
      tabIndex = 0;
    } else if (focused && !measuring) {
      tabIndex = 0;
    } else {
      tabIndex = -1;
    }

    if (tabIndexOverride != null) {
      tabIndex = tabIndexOverride;
    }

    const renameAction = actions?.find((action) => action.type === 'rename');
    const duplicateAction = actions?.find(
      (action) => action.type === 'duplicate',
    );
    const deleteAction = actions?.find((action) => action.type === 'delete');

    const togglePopoverActive = useCallback(() => {
      if (!actions?.length) {
        return;
      }
      setPopoverActive((popoverActive) => !popoverActive);
    }, [actions]);

    const handleClick = useCallback(() => {
      if (disabled) {
        return;
      }
      if (selected) {
        togglePopoverActive();
      } else {
        onAction?.();
      }
    }, [selected, onAction, togglePopoverActive, disabled]);

    const handleCloseRenameViewModal = () => {
      setIsRenameViewModalActive(false);
    };

    const handleCloseDuplicateViewModal = () => {
      setIsDuplicateViewModalActive(false);
    };

    const handleSaveRenameViewModal = useCallback(
      async (value: string) => {
        await renameAction?.onPrimaryAction?.(value);

        setTimeout(() => {
          if (node.current) {
            focusFirstFocusableNode(node.current);
          }
        }, 250);
      },
      [renameAction],
    );

    const handleCloseDeleteViewModal = () => setIsDeleteViewModalActive(false);

    const handleConfirmDeleteView = useCallback(async () => {
      await deleteAction?.onPrimaryAction?.(content);
      setIsDeleteViewModalActive(false);
    }, [deleteAction, content]);

    const handleSaveDuplicateViewModal = useCallback(
      async (duplicateName: string) => {
        await duplicateAction?.onPrimaryAction?.(duplicateName);
      },
      [duplicateAction],
    );

    const formattedActions = actions?.map((action) => {
      const actionType = action.type;
      const {type, onAction, onPrimaryAction, ...rest} = action;
      const additionalOptions = rest;

      switch (actionType) {
        case 'rename':
          return {
            content: i18n.translate('Polaris.Tabs.Tab.rename'),
            icon: InfoMinor,
            onAction: () => {
              onAction?.(content);
              togglePopoverActive();
              setIsRenameViewModalActive(true);
            },
            ...additionalOptions,
          };
        case 'duplicate':
          return {
            content: i18n.translate('Polaris.Tabs.Tab.duplicate'),
            icon: DuplicateMinor,
            onAction: () => {
              onAction?.(content);
              setIsDuplicateViewModalActive(true);
              togglePopoverActive();
            },
            ...additionalOptions,
          };
        case 'edit':
          return {
            content: i18n.translate('Polaris.Tabs.Tab.edit'),
            icon: EditMinor,
            onAction: () => {
              onAction?.(content);
              togglePopoverActive();
            },
            ...additionalOptions,
          };
        case 'edit-columns':
          return {
            content: i18n.translate('Polaris.Tabs.Tab.editColumns'),
            icon: Columns3Minor,
            onAction: () => {
              onAction?.(content);
              togglePopoverActive();
            },
            ...additionalOptions,
          };
        case 'delete':
          return {
            content: i18n.translate('Polaris.Tabs.Tab.delete'),
            icon: DeleteMinor,
            destructive: true,
            onAction: () => {
              onAction?.(content);
              togglePopoverActive();
              setIsDeleteViewModalActive(true);
            },
            ...additionalOptions,
          };
      }
    });

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      },
      [handleClick],
    );

    const tabContainerClassNames = classNames(
      styles.TabContainer,
      selected && styles.Underline,
    );

    const urlIfNotDisabledOrSelected = disabled || selected ? undefined : url;

    const BaseComponent = urlIfNotDisabledOrSelected
      ? UnstyledLink
      : UnstyledButton;

    const activator = (
      <BaseComponent
        className={classNames(
          styles.Tab,
          icon && styles['Tab-iconOnly'],
          popoverActive && styles['Tab-popoverActive'],
          selected && styles['Tab-active'],
          selected && actions?.length && styles['Tab-hasActions'],
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        url={urlIfNotDisabledOrSelected}
        aria-label={accessibilityLabel}
        tabIndex={tabIndex}
        aria-selected={selected}
        aria-controls={panelID}
        onMouseUp={handleMouseUpByBlurring}
        role={tabIndexOverride == null ? 'tab' : undefined}
        id={id}
        onFocus={onFocus}
      >
        <Inline gap="2">
          <Text
            as="span"
            variant={mdDown ? 'bodyMd' : 'bodySm'}
            fontWeight="semibold"
          >
            {icon ?? content}
          </Text>
          {badge ? (
            <Badge status={selected ? 'success' : 'new'}>{badge}</Badge>
          ) : null}
        </Inline>
        {selected && actions?.length ? (
          <div className={classNames(styles.IconWrap)}>
            <Icon source={CaretDownMinor} />
          </div>
        ) : null}
      </BaseComponent>
    );

    const isPlainButton = !selected || !actions?.length;

    const markup =
      isPlainButton || disabled ? (
        activator
      ) : (
        <>
          <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <div className={styles.ActionListWrap}>
              <ActionList actionRole="menuitem" items={formattedActions} />
            </div>
          </Popover>
          {renameAction ? (
            <RenameViewModal
              name={content}
              open={isRenameViewModalActive}
              onClose={handleCloseRenameViewModal}
              onClickPrimaryAction={handleSaveRenameViewModal}
              isModalLoading={isModalLoading}
              viewNames={viewNames}
            />
          ) : null}
          {duplicateAction ? (
            <DuplicateViewModal
              open={isDuplicateViewModalActive}
              name={i18n.translate('Polaris.Tabs.Tab.copy', {name: content})}
              onClose={handleCloseDuplicateViewModal}
              onClickPrimaryAction={handleSaveDuplicateViewModal}
              isModalLoading={isModalLoading}
              viewNames={viewNames || []}
            />
          ) : null}
          {deleteAction ? (
            <Modal
              open={isDeleteViewModalActive}
              onClose={handleCloseDeleteViewModal}
              primaryAction={{
                content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
                onAction: handleConfirmDeleteView,
                destructive: true,
                disabled: isModalLoading,
              }}
              secondaryActions={[
                {
                  content: i18n.translate(
                    'Polaris.Tabs.Tab.deleteModal.cancel',
                  ),
                  onAction: handleCloseDeleteViewModal,
                },
              ]}
              title={i18n.translate('Polaris.Tabs.Tab.deleteModal.title')}
              instant
            >
              <Modal.Section>
                {i18n.translate('Polaris.Tabs.Tab.deleteModal.description', {
                  viewName: content,
                })}
              </Modal.Section>
            </Modal>
          ) : null}
        </>
      );

    if (icon) {
      return markup;
    }

    return (
      <li
        className={tabContainerClassNames}
        ref={mergeRefs([node, ref])}
        role="presentation"
      >
        {markup}
      </li>
    );
  },
);

Tab.displayName = 'Tab';

function focusPanelID(panelID: string) {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({preventScroll: true});
  }
}

function mergeRefs<T = any>(refs: MutableRefObject<T>[]): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}
