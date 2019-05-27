import React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {classNames} from '@shopify/css-utilities';

import Icon from '../Icon';
import Popover from '../Popover';

import {TabDescriptor} from './types';
import {getVisibleAndHiddenTabIndices} from './utilities';

import {List, Panel, Tab, TabMeasurer, TabMeasurements} from './components';

import styles from './Tabs.scss';

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
}

export default class Tabs extends React.PureComponent<Props, State> {
  static Panel = Panel;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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
  };

  render() {
    const {tabs, selected, fitted, children} = this.props;
    const {visibleTabs, hiddenTabs, showDisclosure} = this.state;
    const disclosureTabs = hiddenTabs.map((tabIndex) => tabs[tabIndex]);

    const panelMarkup = children ? (
      <Panel id={tabs[selected].panelID || `${tabs[selected].id}-panel`}>
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
        className={styles.DisclosureActivator}
        onClick={this.handleDisclosureActivatorClick}
      >
        <Icon source={HorizontalDotsMinor} />
      </button>
    );

    return (
      <div>
        <ul className={classname}>
          {tabsMarkup}
          <li className={disclosureTabClassName}>
            <Popover
              preferredPosition="below"
              activator={activator}
              active={disclosureActivatorVisible && showDisclosure}
              onClose={this.handleClose}
            >
              <List
                disclosureTabs={disclosureTabs}
                onClick={this.handleTabClick}
              />
            </Popover>
          </li>
        </ul>
        <TabMeasurer
          activator={activator}
          selected={selected}
          tabs={tabs}
          handleMeasurement={this.handleMeasurement}
        />
        {panelMarkup}
      </div>
    );
  }

  private renderTabMarkup = (tab: TabDescriptor, index: number) => {
    const {selected} = this.props;

    return (
      <Tab
        key={`${index}-${tab.id}`}
        id={tab.id}
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

  private handleDisclosureActivatorClick = () => {
    this.setState(({showDisclosure}) => ({showDisclosure: !showDisclosure}));
  };

  private handleClose = () => {
    this.setState({
      showDisclosure: false,
    });
  };

  private handleMeasurement = (measurements: TabMeasurements) => {
    const {tabs, selected} = this.props;
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
