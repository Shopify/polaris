import React, {PureComponent} from 'react';
import {HorizontalDotsMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {Icon} from '../Icon';
import {Popover} from '../Popover';
import {useI18n} from '../../utilities/i18n';
import {useFeatures} from '../../utilities/features';

import type {TabDescriptor} from './types';
import {getVisibleAndHiddenTabIndices} from './utilities';
import {List, Panel, Tab, TabMeasurer, TabMeasurerProps} from './components';
import styles from './Tabs.scss';

export interface TabsProps {
  /** Content to display in tabs */
  children?: React.ReactNode;
  /** Index of selected tab */
  selected: number;
  /** List of tabs */
  tabs: TabDescriptor[];
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
  /** Callback when tab is selected */
  onSelect?(selectedTabIndex: number): void;
}

type CombinedProps = TabsProps & {
  i18n: ReturnType<typeof useI18n>;
  features: ReturnType<typeof useFeatures>;
};

interface State {
  disclosureWidth: number;
  tabWidths: number[];
  visibleTabs: number[];
  hiddenTabs: number[];
  containerWidth: number;
  showDisclosure: boolean;
  tabToFocus: number;
}

class TabsInner extends PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(nextProps: TabsProps, prevState: State) {
    const {disclosureWidth, tabWidths, containerWidth} = prevState;
    const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(
      nextProps.tabs,
      nextProps.selected,
      disclosureWidth,
      tabWidths,
      containerWidth,
    );

    return {
      visibleTabs,
      hiddenTabs,
      selected: nextProps.selected,
    };
  }

  state: State = {
    disclosureWidth: 0,
    containerWidth: Infinity,
    tabWidths: [],
    visibleTabs: [],
    hiddenTabs: [],
    showDisclosure: false,
    tabToFocus: -1,
  };

  render() {
    const {
      tabs,
      selected,
      fitted,
      children,
      i18n,
      features,
      disclosureText,
    } = this.props;
    const {tabToFocus, visibleTabs, hiddenTabs, showDisclosure} = this.state;
    const disclosureTabs = hiddenTabs.map((tabIndex) => tabs[tabIndex]);
    const {newDesignLanguage} = features;

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

    const tabsMarkup = visibleTabs
      .sort((tabA, tabB) => tabA - tabB)
      .map((tabIndex) => this.renderTabMarkup(tabs[tabIndex], tabIndex));

    const disclosureActivatorVisible = visibleTabs.length < tabs.length;
    const hasCustomDisclosure = Boolean(disclosureText);

    const classname = classNames(
      styles.Tabs,
      fitted && styles.fitted,
      disclosureActivatorVisible && styles.fillSpace,
      newDesignLanguage && styles.newDesignLanguage,
    );

    const wrapperClassName = classNames(
      styles.Wrapper,
      newDesignLanguage && styles.newDesignLanguage,
    );

    const disclosureTabClassName = classNames(
      styles.DisclosureTab,
      disclosureActivatorVisible && styles['DisclosureTab-visible'],
    );

    const disclosureActivatorClassName = classNames(
      styles.TabContainer,
      newDesignLanguage && styles.newDesignLanguage,
    );

    const disclosureButtonClassName = classNames(
      styles.DisclosureActivator,
      hasCustomDisclosure && styles.Tab,
    );

    const disclosureButtonContentWrapperClassName = classNames(
      styles.Title,
      hasCustomDisclosure && styles.titleWithIcon,
    );

    const disclosureButtonContent = hasCustomDisclosure ? (
      <>
        {disclosureText}
        <Icon source={CaretDownMinor} color="inkLighter" />
      </>
    ) : (
      <Icon source={HorizontalDotsMinor} />
    );

    const disclosureButton = (
      <button
        type="button"
        className={disclosureButtonClassName}
        onClick={this.handleDisclosureActivatorClick}
        aria-label={i18n.translate('Polaris.Tabs.toggleTabsLabel')}
      >
        <span className={disclosureButtonContentWrapperClassName}>
          {disclosureButtonContent}
        </span>
      </button>
    );

    const activator = disclosureText ? (
      <div className={disclosureActivatorClassName}>{disclosureButton}</div>
    ) : (
      disclosureButton
    );

    return (
      <div>
        <div className={wrapperClassName}>
          <ul
            role="tablist"
            className={classname}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={this.handleKeyPress}
          >
            {tabsMarkup}
            <li className={disclosureTabClassName}>
              <Popover
                preferredPosition="below"
                activator={activator}
                active={disclosureActivatorVisible && showDisclosure}
                onClose={this.handleClose}
              >
                <List
                  focusIndex={hiddenTabs.indexOf(tabToFocus)}
                  disclosureTabs={disclosureTabs}
                  onClick={this.handleTabClick}
                  onKeyPress={this.handleKeyPress}
                />
              </Popover>
            </li>
          </ul>
          <TabMeasurer
            tabToFocus={tabToFocus}
            activator={activator}
            selected={selected}
            tabs={tabs}
            siblingTabHasFocus={tabToFocus > -1}
            handleMeasurement={this.handleMeasurement}
          />
        </div>
        {panelMarkup}
      </div>
    );
  }

  private handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    const {tabToFocus, visibleTabs, hiddenTabs, showDisclosure} = this.state;
    const key = event.key;
    const tabsArrayInOrder = showDisclosure
      ? visibleTabs.concat(hiddenTabs)
      : [...visibleTabs];

    let newFocus = tabsArrayInOrder.indexOf(tabToFocus);

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      newFocus += 1;

      if (newFocus === tabsArrayInOrder.length) {
        newFocus = 0;
      }
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      if (newFocus === -1 || newFocus === 0) {
        newFocus = tabsArrayInOrder.length - 1;
      } else {
        newFocus -= 1;
      }
    }

    this.setState({
      tabToFocus: tabsArrayInOrder[newFocus],
    });
  };

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderTabMarkup = (tab: TabDescriptor, index: number) => {
    const {selected} = this.props;
    const {tabToFocus} = this.state;

    return (
      <Tab
        key={`${index}-${tab.id}`}
        id={tab.id}
        siblingTabHasFocus={tabToFocus > -1}
        focused={index === tabToFocus}
        selected={index === selected}
        onClick={this.handleTabClick}
        panelID={tab.panelID || `${tab.id}-panel`}
        accessibilityLabel={tab.accessibilityLabel}
        url={tab.url}
      >
        {tab.content}
      </Tab>
    );
  };

  private handleFocus = (event: React.FocusEvent<HTMLUListElement>) => {
    const {selected, tabs} = this.props;

    // If we are explicitly focusing a non-selected tab, this focuses it
    const target = event.target;

    if (
      target.classList.contains(styles.Tab) ||
      target.classList.contains(styles.Item)
    ) {
      let tabToFocus = -1;

      tabs.every((tab, index) => {
        if (tab.id === target.id) {
          tabToFocus = index;
          return false;
        }

        return true;
      });

      this.setState({tabToFocus});
      return;
    }

    if (target.classList.contains(styles.DisclosureActivator)) {
      return;
    }

    // If we are coming in from somewhere other than another tab, focus the
    // selected tab, and the focus (click) is not on the disclosure activator,
    // focus the selected tab
    if (!event.relatedTarget) {
      this.setState({tabToFocus: selected});
      return;
    }

    const relatedTarget = event.relatedTarget;

    if (
      relatedTarget instanceof HTMLElement &&
      !relatedTarget.classList.contains(styles.Tab) &&
      !relatedTarget.classList.contains(styles.Item) &&
      !relatedTarget.classList.contains(styles.DisclosureActivator)
    ) {
      this.setState({tabToFocus: selected});
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLUListElement>) => {
    // If we blur and the target is not another tab, forget the focus position
    if (event.relatedTarget == null) {
      this.setState({tabToFocus: -1});
      return;
    }

    const target = event.relatedTarget;

    // If we are going to anywhere other than another tab, lose the last focused tab
    if (
      target instanceof HTMLElement &&
      !target.classList.contains(styles.Tab) &&
      !target.classList.contains(styles.Item)
    ) {
      this.setState({tabToFocus: -1});
    }
  };

  private handleDisclosureActivatorClick = () => {
    this.setState(({showDisclosure}) => ({showDisclosure: !showDisclosure}));
  };

  private handleClose = () => {
    this.setState({
      showDisclosure: false,
    });
  };

  private handleMeasurement: TabMeasurerProps['handleMeasurement'] = (
    measurements,
  ) => {
    const {tabs, selected} = this.props;
    const {tabToFocus} = this.state;
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

    this.setState({
      tabToFocus: tabToFocus === -1 ? -1 : selected,
      visibleTabs,
      hiddenTabs,
      disclosureWidth,
      containerWidth,
      tabWidths,
    });
  };

  private handleTabClick = (id: string) => {
    const {tabs, onSelect = noop} = this.props;

    const tab = tabs.find((aTab) => aTab.id === id);
    if (tab == null) {
      return;
    }

    const selectedIndex = tabs.indexOf(tab);
    onSelect(selectedIndex);
  };
}

function noop() {}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}

export function Tabs(props: TabsProps) {
  const i18n = useI18n();
  const features = useFeatures();

  return <TabsInner {...props} i18n={i18n} features={features} />;
}
