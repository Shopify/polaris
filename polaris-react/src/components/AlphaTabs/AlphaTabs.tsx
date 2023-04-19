import React, {useEffect, useCallback, useRef, useReducer} from 'react';
import type {KeyboardEvent, FocusEvent} from 'react';
import {CaretDownMinor, PlusMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useBreakpoints} from '../../utilities/breakpoints';
import {Icon} from '../Icon';
import {Popover} from '../Popover';
import {UnstyledButton} from '../UnstyledButton';
import {Tooltip} from '../Tooltip';
import {Text} from '../Text';
import {Box} from '../Box';
import {usePrevious} from '../../utilities/use-previous';

import {getVisibleAndHiddenTabIndices} from './utilities';
import type {AlphaTabProps, AlphaTabMeasurements} from './types';
import {Tab, CreateViewModal, List, TabMeasurer, Panel} from './components';
import styles from './AlphaTabs.scss';

export interface AlphaTabsState {
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

export interface AlphaTabsProps {
  /** The items that map to each Tab. */
  tabs: AlphaTabProps[];
  /** Content to display in tabs */
  children?: React.ReactNode;
  /** The index of the currently selected Tab. */
  selected: number;
  /** Whether the Tabs are disabled or not. */
  disabled?: boolean;
  /** Optional callback invoked when a Tab becomes selected. */
  onSelect?: (selectedTabIndex: number) => void;
  /** Whether to show the add new view Tab. */
  canCreateNewView?: boolean;
  /** Label for the new view Tab. Will override the default of "Create new view" */
  newViewAccessibilityLabel?: string;
  /** Optional callback invoked when a merchant saves a new view from the Modal */
  onCreateNewView?: (value: string) => Promise<boolean>;
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
}
const CREATE_NEW_VIEW_ID = 'create-new-view';

export const AlphaTabs = ({
  tabs,
  children,
  selected,
  newViewAccessibilityLabel,
  canCreateNewView,
  disabled,
  onCreateNewView,
  onSelect,
  fitted,
  disclosureText,
}: AlphaTabsProps) => {
  const i18n = useI18n();

  const {mdDown} = useBreakpoints();

  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLElement>(null);

  const [state, setState] = useReducer(
    (
      data: AlphaTabsState,
      partialData: Partial<AlphaTabsState>,
    ): AlphaTabsState => {
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

  const {
    tabToFocus,
    visibleTabs,
    hiddenTabs,
    showDisclosure,
    isNewViewModalActive,
    modalSubmitted,
    disclosureWidth,
    tabWidths,
    containerWidth,
    isTabsFocused,
    isTabModalOpen,
    isTabPopoverOpen,
  } = state;

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
    if (!onCreateNewView) {
      return false;
    }
    const hasExecuted = await onCreateNewView?.(value);
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
    (tab: AlphaTabProps, index: number) => {
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
          ref={index === selected ? selectedTabRef : null}
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
      const isInNaturalDOMOrder = relatedTarget?.closest?.(
        `.${styles.AlphaTabs}`,
      );
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

  useEffect(() => {
    const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(
      tabs,
      selected,
      disclosureWidth,
      tabWidths,
      containerWidth,
    );
    setState({
      visibleTabs,
      hiddenTabs,
    });
  }, [containerWidth, disclosureWidth, tabs, selected, tabWidths, setState]);

  const moveToSelectedTab = useCallback(() => {
    const activeButton = selectedTabRef.current?.querySelector(
      `.${styles['Tab-active']}`,
    ) as HTMLElement;
    if (activeButton) {
      moveToActiveTab(activeButton.offsetLeft);
    }
  }, []);

  useEffect(() => {
    if (mdDown) {
      moveToSelectedTab();
    }
  }, [moveToSelectedTab, selected, mdDown]);

  useEffect(() => {
    if (isTabsFocused && !showDisclosure) {
      const tabToFocus = selected;
      setState({tabToFocus});
    }
  }, [isTabsFocused, selected, setState, showDisclosure]);

  const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
    const {
      showDisclosure,
      visibleTabs,
      hiddenTabs,
      tabToFocus,
      isNewViewModalActive,
    } = state;
    if (isTabModalOpen || isTabPopoverOpen || isNewViewModalActive) {
      return;
    }
    const key = event.key;
    const tabsArrayInOrder =
      showDisclosure || mdDown
        ? visibleTabs.concat(hiddenTabs)
        : [...visibleTabs];

    let newFocus = tabsArrayInOrder.indexOf(tabToFocus);

    if (key === 'ArrowRight') {
      newFocus += 1;

      if (newFocus === tabsArrayInOrder.length) {
        newFocus = 0;
      }
    }

    if (key === 'ArrowLeft') {
      if (newFocus === -1 || newFocus === 0) {
        newFocus = tabsArrayInOrder.length - 1;
      } else {
        newFocus -= 1;
      }
    }

    const buttonToFocus = tabsArrayInOrder[newFocus];

    if (buttonToFocus != null) {
      setState({
        tabToFocus: buttonToFocus,
      });
    }
  };

  const handleDisclosureActivatorClick = () => {
    setState({
      showDisclosure: !showDisclosure,
      tabToFocus: hiddenTabs[0],
    });
  };

  const handleClose = () => {
    setState({showDisclosure: false});
  };

  const handleMeasurement = useCallback(
    (measurements: AlphaTabMeasurements) => {
      const {
        hiddenTabWidths: tabWidths,
        containerWidth,
        disclosureWidth,
      } = measurements;

      const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(
        tabs,
        selected,
        disclosureWidth,
        tabWidths,
        containerWidth,
      );
      setState({
        visibleTabs,
        hiddenTabs,
        disclosureWidth,
        containerWidth,
        tabWidths,
      });
    },
    [tabs, selected, setState],
  );

  const handleListTabClick = (id: string) => {
    handleTabClick(id);
    handleClose();
    setState({
      isTabsFocused: true,
    });
  };

  const moveToActiveTab = (offsetLeft: number) => {
    setTimeout(() => {
      if (scrollRef.current && typeof scrollRef.current.scroll === 'function') {
        const scrollRefOffset = wrapRef?.current?.offsetLeft || 0;
        scrollRef?.current?.scroll({
          left: offsetLeft - scrollRefOffset,
        });
      }
    }, 0);
  };

  const createViewA11yLabel =
    newViewAccessibilityLabel ||
    i18n.translate('Polaris.Tabs.newViewAccessibilityLabel');

  const tabsToShow = mdDown ? [...visibleTabs, ...hiddenTabs] : visibleTabs;

  const tabsMarkup = tabsToShow
    .sort((tabA, tabB) => tabA - tabB)
    .filter((tabIndex) => tabs[tabIndex])
    .map((tabIndex) => renderTabMarkup(tabs[tabIndex], tabIndex));

  const disclosureActivatorVisible =
    visibleTabs.length < tabs.length && !mdDown;

  const classname = classNames(
    styles.AlphaTabs,
    fitted && styles.fitted,
    disclosureActivatorVisible && styles.fillSpace,
  );

  const wrapperClassNames = classNames(
    styles.Wrapper,
    canCreateNewView && styles.WrapperWithNewButton,
  );

  const disclosureTabClassName = classNames(
    styles.DisclosureTab,
    disclosureActivatorVisible && styles['DisclosureTab-visible'],
  );

  const disclosureButtonClassName = classNames(styles.DisclosureActivator);

  const disclosureButtonContent = (
    <>
      <Text as="span" variant="bodySm" fontWeight="semibold">
        {disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel')}
      </Text>
      <div
        className={classNames(
          styles.IconWrap,
          disclosureActivatorVisible &&
            showDisclosure &&
            styles['IconWrap-open'],
        )}
      >
        <Icon source={CaretDownMinor} color="subdued" />
      </div>
    </>
  );

  const disclosureButton = (
    <UnstyledButton
      type="button"
      className={disclosureButtonClassName}
      onClick={handleDisclosureActivatorClick}
      aria-label={
        disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel')
      }
      disabled={disabled}
    >
      {disclosureButtonContent}
    </UnstyledButton>
  );

  const activator = disclosureButton;

  const disclosureTabs = hiddenTabs.map((tabIndex) => tabs[tabIndex]);

  const viewNames = tabs.map(({content}) => content);

  const tabMeasurer = (
    <TabMeasurer
      tabToFocus={tabToFocus}
      activator={activator}
      selected={selected}
      tabs={tabs}
      siblingTabHasFocus={tabToFocus > -1}
      handleMeasurement={handleMeasurement}
    />
  );

  const newTab = (
    <Tab
      id={CREATE_NEW_VIEW_ID}
      content={createViewA11yLabel}
      actions={[]}
      onAction={handleClickNewTab}
      onFocus={() => {
        if (modalSubmitted) {
          setState({
            tabToFocus: selected,
            modalSubmitted: false,
          });
        }
      }}
      icon={
        <Icon source={PlusMinor} accessibilityLabel={createViewA11yLabel} />
      }
      disabled={disabled}
      onTogglePopover={handleTogglePopover}
      onToggleModal={handleToggleModal}
      tabIndexOverride={0}
    />
  );

  const panelMarkup = children
    ? tabs.map((_tab, index) => {
        return selected === index ? (
          <Panel
            id={tabs[index].panelID || `${tabs[index].id}-panel`}
            tabID={tabs[index].id}
            key={tabs[index].id}
          >
            {children}
          </Panel>
        ) : (
          <Panel
            id={tabs[index].panelID || `${tabs[index].id}-panel`}
            tabID={tabs[index].id}
            key={tabs[index].id}
            hidden
          />
        );
      })
    : null;

  return (
    <div className={styles.Outer}>
      <Box
        padding={{
          md: '2',
        }}
        background="bg"
        borderColor="border-subdued"
        borderBlockEndWidth="1"
        borderRadiusStartEnd="2"
        borderRadiusStartStart="2"
      >
        {tabMeasurer}
        <div className={wrapperClassNames} ref={scrollRef}>
          <div className={styles.ButtonWrapper} ref={wrapRef}>
            <ul
              role={tabsMarkup.length > 0 ? 'tablist' : undefined}
              className={classname}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyPress}
              data-tabs-focus-catchment
            >
              {tabsMarkup}
              {mdDown || tabsToShow.length === 0 ? null : (
                <li className={disclosureTabClassName} role="presentation">
                  <Popover
                    preferredPosition="below"
                    activator={activator}
                    active={disclosureActivatorVisible && showDisclosure}
                    onClose={handleClose}
                    autofocusTarget="first-node"
                  >
                    <List
                      focusIndex={hiddenTabs.indexOf(tabToFocus)}
                      disclosureTabs={disclosureTabs}
                      onClick={handleListTabClick}
                      onKeyPress={handleKeyPress}
                    />
                  </Popover>
                </li>
              )}
            </ul>

            {canCreateNewView && tabsToShow.length > 0 ? (
              <div className={styles.NewTab}>
                <CreateViewModal
                  open={isNewViewModalActive}
                  onClose={handleCloseNewViewModal}
                  onClickPrimaryAction={handleSaveNewViewModal}
                  viewNames={viewNames}
                  activator={
                    disabled ? (
                      newTab
                    ) : (
                      <Tooltip
                        content={i18n.translate('Polaris.Tabs.newViewTooltip')}
                        preferredPosition="above"
                        hoverDelay={400}
                      >
                        {newTab}
                      </Tooltip>
                    )
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </Box>

      {panelMarkup}
    </div>
  );
};
