import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';

import Icon from '../Icon';
import Popover from '../Popover';

import {TabDescriptor} from './types';
import {getVisibleAndHiddenTabIndices} from './utilities';

import {List, Panel, Tab, TabMeasurer, TabMeasurements} from './components';

import * as styles from './Tabs.scss';

export interface Props {
  /** Content to display in tabs */
  children?: React.ReactNode;
  /** Index of selected tab */
  selected: number;
  /** List of tabs */
  tabs: TabDescriptor[];
  /** Fit tabs to container */
  fitted?: boolean;
  /** Callback when tab is selected */
  onSelect?(selectedTabIndex: number): void;
}

export interface State {
  disclosureWidth: number;
  tabWidths: number[];
  visibleTabs: number[];
  hiddenTabs: number[];
  containerWidth: number;
  showDisclosure: boolean;
  tabToFocus: number;
}

export default class Tabs extends React.PureComponent<Props, State> {
  static Panel = Panel;

  state: State = {
    disclosureWidth: 0,
    containerWidth: Infinity,
    tabWidths: [],
    visibleTabs: [],
    hiddenTabs: [],
    showDisclosure: false,
    tabToFocus: -1,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    const {selected} = this.props;
    const {disclosureWidth, tabWidths, containerWidth, tabToFocus} = this.state;
    const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(
      nextProps.tabs,
      nextProps.selected,
      disclosureWidth,
      tabWidths,
      containerWidth,
    );

    this.setState({
      visibleTabs,
      hiddenTabs,
      tabToFocus: selected === nextProps.selected ? -1 : tabToFocus,
      showDisclosure: false,
    });
  }

  render() {
    const {tabs, selected, fitted, children} = this.props;
    const {tabToFocus, visibleTabs, hiddenTabs, showDisclosure} = this.state;
    const disclosureTabs = hiddenTabs.map((tabIndex) => tabs[tabIndex]);

    const panelMarkup = children ? (
      <Panel
        id={tabs[selected].panelID || `${tabs[selected].id}-panel`}
        tabID={tabs[selected].id}
      >
        {children}
      </Panel>
    ) : null;

    const tabsMarkup = visibleTabs
      .sort((tabA, tabB) => tabA - tabB)
      .map((tabIndex) => this.renderTabMarkup(tabs[tabIndex], tabIndex));

    const disclosureActivatorVisible = visibleTabs.length < tabs.length;

    const classname = classNames(
      styles.Tabs,
      fitted && styles.fitted,
      disclosureActivatorVisible && styles.fillSpace,
    );

    const disclosureTabClassName = classNames(
      styles.DisclosureTab,
      disclosureActivatorVisible && styles['DisclosureTab-visible'],
    );

    const activator = (
      <button
        tabIndex={-1}
        className={styles.DisclosureActivator}
        onClick={this.handleDisclosureActivatorClick}
      >
        <Icon source="horizontalDots" />
      </button>
    );

    return (
      <div>
        <ul
          role="tablist"
          className={classname}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={this.handleKeyPress}
        >
          {tabsMarkup}
          <li role="presentation" className={disclosureTabClassName}>
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
        {panelMarkup}
      </div>
    );
  }

  @autobind
  private handleKeyPress(event: React.KeyboardEvent<HTMLElement>) {
    const {tabToFocus, visibleTabs, hiddenTabs} = this.state;
    const tabsArrayInOrder = visibleTabs.concat(hiddenTabs);
    const key = event.key;

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
      showDisclosure: hiddenTabs.indexOf(tabsArrayInOrder[newFocus]) > -1,
      tabToFocus: tabsArrayInOrder[newFocus],
    });
  }

  @autobind
  private renderTabMarkup(tab: TabDescriptor, index: number) {
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
  }

  @autobind
  private handleFocus(event: React.FocusEvent<HTMLUListElement>) {
    const {selected, tabs} = this.props;

    // If we are explicitly focusing one of the non-selected tabs, use it
    // move the focus to it
    const target = event.target as HTMLElement;
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

    const relatedTarget = event.relatedTarget as HTMLElement;
    if (
      !relatedTarget.classList.contains(styles.Tab) &&
      !relatedTarget.classList.contains(styles.Item) &&
      !relatedTarget.classList.contains(styles.DisclosureActivator)
    ) {
      this.setState({tabToFocus: selected});
    }
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLUListElement>) {
    // If we blur and the target is not another tab, forget the focus position
    if (event.relatedTarget == null) {
      this.setState({tabToFocus: -1});
      return;
    }

    const target = event.relatedTarget as HTMLElement;

    // If we are going to anywhere other than another tab, lose the last focused tab
    if (
      !target.classList.contains(styles.Tab) &&
      !target.classList.contains(styles.Item)
    ) {
      this.setState({tabToFocus: -1});
    }
  }

  @autobind
  private handleDisclosureActivatorClick() {
    this.setState(({showDisclosure}) => ({showDisclosure: !showDisclosure}));
  }

  @autobind
  private handleClose() {
    this.setState({
      showDisclosure: false,
    });
  }

  @autobind
  private handleMeasurement(measurements: TabMeasurements) {
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
  }

  @autobind
  private handleTabClick(id: string) {
    const {tabs, onSelect = noop} = this.props;

    const tab = tabs.find((aTab) => aTab.id === id);
    if (tab == null) {
      return;
    }

    const selectedIndex = tabs.indexOf(tab);
    onSelect(selectedIndex);
  }
}

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
