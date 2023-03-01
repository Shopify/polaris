import type {KeyboardEvent, FocusEvent} from 'react';
import React, {useReducer, useCallback, useEffect} from 'react';

import {usePrevious} from '../../../../utilities/use-previous';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {Tab} from '../../components/Tab';
import type {TabsProps} from '../../Tabs';
import type {TabProps} from '../../types';
import styles from '../../Tabs.scss';

export interface State {
  disclosureWidth: number;
  tabWidths: number[];
  visibleTabs: number[];
  hiddenTabs: number[];
  containerWidth: number;
  showDisclosure: boolean;
  tabToFocus: number;
  isTabPopoverOpen: boolean;
  isTabModalOpen: boolean;
  isNewViewModalActive: boolean;
  modalSubmitted: boolean;
  isTabsFocused: boolean;
}

export function useTabsMethods({
  tabs,
  children,
  selected,
  disabled,
  onSaveNewViewModal,
  onSelect,
}: TabsProps) {
  const [state, setState] = useReducer(
    (data: State, partialData: Partial<State>): State => {
      return {...data, ...partialData};
    },
    {
      disclosureWidth: 0,
      containerWidth: Infinity,
      tabWidths: [],
      visibleTabs: [],
      hiddenTabs: [],
      showDisclosure: false,
      tabToFocus: -1,
      isNewViewModalActive: false,
      modalSubmitted: false,
      isTabsFocused: false,
      isTabPopoverOpen: false,
      isTabModalOpen: false,
    },
  );

  const {tabToFocus, isNewViewModalActive, isTabPopoverOpen, isTabModalOpen} =
    state;

  const prevModalOpen = usePrevious(isTabModalOpen);
  const prevPopoverOpen = usePrevious(isTabPopoverOpen);

  useEffect(() => {
    const hasModalClosed = prevModalOpen && !isTabModalOpen;
    const hasPopoverClosed = prevPopoverOpen && !isTabPopoverOpen;
    if (hasModalClosed) {
      setState({isTabsFocused: true, tabToFocus: selected});
    } else if (hasPopoverClosed && !isTabModalOpen) {
      setState({isTabsFocused: true, tabToFocus: selected});
    }
  }, [
    prevPopoverOpen,
    isTabPopoverOpen,
    prevModalOpen,
    isTabModalOpen,
    selected,
    tabToFocus,
  ]);

  const handleTogglePopover = useCallback(
    (isOpen: boolean) => setState({isTabPopoverOpen: isOpen}),
    [],
  );

  const handleToggleModal = useCallback(
    (isOpen: boolean) => setState({isTabModalOpen: isOpen}),
    [],
  );

  const handleCloseNewViewModal = () => {
    setState({
      isNewViewModalActive: false,
    });
  };

  const handleSaveNewViewModal = async (value: string) => {
    if (!onSaveNewViewModal) {
      return false;
    }
    const hasExecuted = await onSaveNewViewModal?.(value);
    if (hasExecuted) {
      setState({
        modalSubmitted: true,
      });
    }
    return hasExecuted;
  };

  const handleClickNewTab = () => {
    setState({
      isNewViewModalActive: true,
    });
  };

  const handleTabClick = useCallback(
    (id: string) => {
      const tab = tabs.find((aTab) => aTab.id === id);
      if (tab == null) {
        return null;
      }
      const selectedIndex = tabs.indexOf(tab);
      onSelect?.(selectedIndex);
    },
    [tabs, onSelect],
  );

  const renderTabMarkup = useCallback(
    (tab: TabProps, index: number) => {
      const handleClick = () => {
        handleTabClick(tab.id);
        tab.onAction?.();
      };

      const viewNames = tabs.map(({content}) => content);
      const tabPanelID = tab.panelID || `${tab.id}-panel`;

      return (
        <Tab
          {...tab}
          key={`${index}-${tab.id}`}
          id={tab.id}
          panelID={children ? tabPanelID : undefined}
          disabled={disabled}
          siblingTabHasFocus={tabToFocus > -1}
          focused={index === tabToFocus}
          selected={index === selected}
          onAction={handleClick}
          accessibilityLabel={tab.accessibilityLabel}
          url={tab.url}
          content={tab.content}
          onToggleModal={handleToggleModal}
          onTogglePopover={handleTogglePopover}
          viewNames={viewNames}
        />
      );
    },
    [
      disabled,
      handleTabClick,
      tabs,
      children,
      selected,
      tabToFocus,
      handleToggleModal,
      handleTogglePopover,
    ],
  );

  const handleFocus = useCallback((event: FocusEvent<HTMLUListElement>) => {
    const target = event.target;
    const isItem = target.classList.contains(styles.Item);
    const isInNaturalDOMOrder =
      target.closest(`[data-tabs-focus-catchment]`) || isItem;

    const isDisclosureActivator = target.classList.contains(
      styles.DisclosureActivator,
    );

    if (isDisclosureActivator || !isInNaturalDOMOrder) {
      return;
    }

    setState({
      isTabsFocused: true,
    });
  }, []);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLUListElement>) => {
      const target = event.target;
      const relatedTarget = event.relatedTarget;
      const isInNaturalDOMOrder = relatedTarget?.closest?.(`.${styles.Tabs}`);
      const targetIsATab = target?.classList?.contains?.(styles.Tab);
      const focusReceiverIsAnItem = relatedTarget?.classList.contains(
        styles.Item,
      );

      if (
        !relatedTarget &&
        !isTabModalOpen &&
        !targetIsATab &&
        !focusReceiverIsAnItem
      ) {
        setState({
          tabToFocus: -1,
        });
        return;
      }

      if (
        !isInNaturalDOMOrder &&
        !isTabModalOpen &&
        !targetIsATab &&
        !focusReceiverIsAnItem
      ) {
        setState({
          tabToFocus: -1,
        });
        return;
      }

      setState({
        isTabsFocused: false,
      });
    },
    [isTabModalOpen],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isTabPopoverOpen || isTabModalOpen || isNewViewModalActive) {
      return;
    }
    const {key} = event;

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return {
    state,
    setState,
    handleCloseNewViewModal,
    handleSaveNewViewModal,
    handleClickNewTab,
    handleTabClick,
    renderTabMarkup,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleTogglePopover,
    handleToggleModal,
  };
}
