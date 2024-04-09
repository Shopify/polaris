import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import type {
  KeyboardEvent,
  RefObject,
  MutableRefObject,
  RefCallback,
} from 'react';
import {
  InfoIcon,
  DuplicateIcon,
  EditIcon,
  LayoutColumns3Icon,
  DeleteIcon,
  ChevronDownIcon,
} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {
  focusFirstFocusableNode,
  handleMouseUpByBlurring,
} from '../../../../utilities/focus';
import {UnstyledButton} from '../../../UnstyledButton';
import {UnstyledLink} from '../../../UnstyledLink';
import {Icon} from '../../../Icon';
import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {Modal} from '../../../Modal';
import {Badge} from '../../../Badge';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import type {TabPropsWithAddedMethods, TabAction} from '../../types';
import styles from '../../Tabs.module.css';

import {RenameModal, DuplicateModal} from './components';

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
      readonly,
    }: TabPropsWithAddedMethods,
    ref: RefObject<HTMLElement>,
  ) => {
    const i18n = useI18n();
    const [popoverActive, setPopoverActive] = useState(false);
    const [activeModalType, setActiveModalType] = useState<TabAction | null>(
      null,
    );
    const wasSelected = useRef(selected);
    const panelFocused = useRef(false);
    const node = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
      onTogglePopover(popoverActive);
    }, [popoverActive, onTogglePopover]);

    useEffect(() => {
      onToggleModal(Boolean(activeModalType));
    }, [activeModalType, onToggleModal]);

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
        activeModalType == null &&
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
      activeModalType,
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
      if (disabled || readonly) {
        return;
      }
      if (selected) {
        togglePopoverActive();
      } else {
        onAction?.();
      }
    }, [selected, onAction, togglePopoverActive, disabled, readonly]);

    const handleModalOpen = (type: TabAction) => {
      setActiveModalType(type);
    };

    const handleModalClose = () => {
      setActiveModalType(null);
    };

    const handleSaveRenameModal = useCallback(
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

    const handleConfirmDeleteView = useCallback(async () => {
      await deleteAction?.onPrimaryAction?.(content);
      handleModalClose();
    }, [deleteAction, content]);

    const handleSaveDuplicateModal = useCallback(
      async (duplicateName: string) => {
        await duplicateAction?.onPrimaryAction?.(duplicateName);
      },
      [duplicateAction],
    );

    const actionContent = {
      rename: {
        icon: InfoIcon,
        content: i18n.translate('Polaris.Tabs.Tab.rename'),
      },
      duplicate: {
        icon: DuplicateIcon,
        content: i18n.translate('Polaris.Tabs.Tab.duplicate'),
      },
      edit: {
        icon: EditIcon,
        content: i18n.translate('Polaris.Tabs.Tab.edit'),
      },
      'edit-columns': {
        icon: LayoutColumns3Icon,
        content: i18n.translate('Polaris.Tabs.Tab.editColumns'),
      },
      delete: {
        icon: DeleteIcon,
        content: i18n.translate('Polaris.Tabs.Tab.delete'),
        destructive: true,
      },
    };

    const formattedActions = actions?.map(
      ({type, onAction, onPrimaryAction, ...additionalOptions}) => {
        const isModalActivator = !type.includes('edit');
        return {
          ...actionContent[type],
          ...additionalOptions,
          onAction: () => {
            onAction?.(content);
            togglePopoverActive();
            if (isModalActivator) {
              handleModalOpen(type);
            }
          },
        };
      },
    );

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

    const urlIfNotDisabledOrSelected =
      disabled || selected || readonly ? undefined : url;

    const BaseComponent = urlIfNotDisabledOrSelected
      ? UnstyledLink
      : UnstyledButton;

    const tabClassName = classNames(
      styles.Tab,
      icon && styles['Tab-iconOnly'],
      popoverActive && styles['Tab-popoverActive'],
      selected && styles['Tab-active'],
      selected && actions?.length && styles['Tab-hasActions'],
      readonly && styles['Tab-readonly'],
    );

    const badgeMarkup = badge ? (
      <Badge tone={selected ? undefined : 'new'}>{badge}</Badge>
    ) : null;

    const disclosureMarkup =
      selected && actions?.length ? (
        <div className={classNames(styles.IconWrap)}>
          <Icon source={ChevronDownIcon} />
        </div>
      ) : null;

    const activator = (
      <BaseComponent
        id={id}
        className={tabClassName}
        tabIndex={tabIndex}
        aria-selected={selected}
        aria-controls={panelID}
        aria-label={accessibilityLabel}
        role={tabIndexOverride == null ? 'tab' : undefined}
        disabled={disabled}
        url={urlIfNotDisabledOrSelected}
        onFocus={onFocus}
        onMouseUp={handleMouseUpByBlurring}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <InlineStack gap="200" align="center" blockAlign="center" wrap={false}>
          <Text as="span" variant="bodySm" fontWeight="medium">
            {icon ?? content}
          </Text>
          {badgeMarkup}
        </InlineStack>
        {disclosureMarkup}
      </BaseComponent>
    );

    const isPlainButton = !selected || !actions?.length;

    const renameModal = renameAction ? (
      <RenameModal
        name={content}
        open={activeModalType === 'rename'}
        onClose={handleModalClose}
        onClickPrimaryAction={handleSaveRenameModal}
        isModalLoading={isModalLoading}
        viewNames={viewNames}
      />
    ) : null;
    const duplicateModal = duplicateAction ? (
      <DuplicateModal
        open={activeModalType === 'duplicate'}
        name={i18n.translate('Polaris.Tabs.Tab.copy', {name: content})}
        onClose={handleModalClose}
        onClickPrimaryAction={handleSaveDuplicateModal}
        isModalLoading={isModalLoading}
        viewNames={viewNames || []}
      />
    ) : null;
    const deleteModal = deleteAction ? (
      <Modal
        open={activeModalType === 'delete'}
        onClose={handleModalClose}
        primaryAction={{
          content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
          onAction: handleConfirmDeleteView,
          destructive: true,
          disabled: isModalLoading,
        }}
        secondaryActions={[
          {
            content: i18n.translate('Polaris.Tabs.Tab.deleteModal.cancel'),
            onAction: handleModalClose,
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
    ) : null;

    const markup =
      isPlainButton || disabled || readonly ? (
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
          {renameModal}
          {duplicateModal}
          {deleteModal}
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
