import React, {useEffect, useCallback} from 'react';
import type {KeyboardEvent} from 'react';
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

import type {TabProps, TabMeasurements} from './types';
import {
  Tab,
  CreateViewModal,
  List,
  TabMeasurer,
  Panel,
  SmallScreenTabs,
} from './components';
import {useTabsMethods} from './hooks';
import styles from './Tabs.scss';
import {getVisibleAndHiddenTabIndices} from './utilities';

export interface TabsProps {
  /** The items that map to each Tab. */
  tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[];
  /** Content to display in tabs */
  children?: React.ReactNode;
  /** The index of the currently selected Tab. */
  selected: number;
  /** Whether the Tabs are disabled or not. */
  disabled?: boolean;
  /** Optional callback invoked when a Tab becomes selected. */
  onSelect?: (selectedTabIndex: number) => void;
  /** Whether to show the add new view Tab. */
  showNewTab?: boolean;
  /** Callback automatically added by the IndexFilters */
  onSetStateToEditingColumns?: () => void;
  /** Label for the new view Tab. Will override the default of "Create new view" */
  newViewAccessibilityLabel?: string;
  /** Optional callback invoked when a merchant saves a new view from the Modal */
  onSaveNewViewModal?: (value: string) => Promise<boolean>;
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
}

export type CombinedProps = TabsProps & {
  i18n: ReturnType<typeof useI18n>;
};

const CREATE_NEW_VIEW_ID = 'create-new-view';

export const TabsInner = ({
  tabs,
  children,
  i18n,
  selected,
  newViewAccessibilityLabel,
  showNewTab,
  disabled,
  onSaveNewViewModal,
  onSetStateToEditingColumns,
  onSelect,
  fitted,
  disclosureText,
}: CombinedProps) => {
  const {
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
  } = useTabsMethods({
    tabs,
    selected,
    disabled,
    onSaveNewViewModal,
    onSetStateToEditingColumns,
    onSelect,
  });
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

  useEffect(() => {
    if (isTabsFocused) {
      const tabToFocus = selected;
      setState({tabToFocus});
    }
  }, [isTabsFocused, selected, setState]);

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
    const tabsArrayInOrder = showDisclosure
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
    });
  };

  const handleClose = () => {
    setState({showDisclosure: false});
  };

  const handleMeasurement = useCallback(
    (measurements: TabMeasurements) => {
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

  const createViewA11yLabel =
    newViewAccessibilityLabel ||
    i18n.translate('Polaris.Tabs.newViewAccessibilityLabel');

  const tabsMarkup = visibleTabs
    .sort((tabA, tabB) => tabA - tabB)
    .filter((tabIndex) => tabs[tabIndex])
    .map((tabIndex) => renderTabMarkup(tabs[tabIndex], tabIndex));

  const disclosureActivatorVisible = visibleTabs.length < tabs.length;

  const classname = classNames(
    styles.Tabs,
    fitted && styles.fitted,
    disclosureActivatorVisible && styles.fillSpace,
  );

  const wrapperClassNames = classNames(
    styles.Wrapper,
    showNewTab && styles.WrapperWithNewButton,
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
      permissions={[]}
      isActive={false}
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
    <div>
      <Box
        padding="2"
        background="surface"
        borderBlockEnd="divider"
        borderRadiusStartEnd="2"
        borderRadiusStartStart="2"
      >
        {tabMeasurer}
        <div className={wrapperClassNames}>
          <ul
            role="tablist"
            className={classname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyPress}
            data-tabs-focus-catchment
          >
            {tabsMarkup}
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
          </ul>

          {showNewTab && (
            <div className={styles.NewTab}>
              <CreateViewModal
                open={isNewViewModalActive}
                onClose={handleCloseNewViewModal}
                onPrimaryAction={handleSaveNewViewModal}
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
          )}
        </div>
      </Box>

      {panelMarkup}
    </div>
  );
};

export function Tabs(props: TabsProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();

  if (mdDown) {
    return <SmallScreenTabs {...props} i18n={i18n} />;
  }

  return <TabsInner {...props} i18n={i18n} />;
}
