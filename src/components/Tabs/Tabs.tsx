import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';

import Icon from '../Icon';
import Popover from '../Popover';

import List from './List';
import Tab from './Tab';
import TabMeasurer from './TabMeasurer';
import {Measurements} from './TabMeasurer';
import Panel from './Panel';
import * as styles from './Tabs.scss';

export interface TabDescriptor {
  id: string,
  url?: string,
  title: string,
  panelID?: string,
}

export interface Props {
  selected: number,
  tabs: TabDescriptor[],
  fitted?: boolean,
  children?: React.ReactNode,
  onSelect?(selectedTabIndex: number): void,
}

export interface State {
  disclosureWidth: number,
  tabWidths: number[],
  visibleTabs: number[],
  hiddenTabs: number[],
  containerWidth: number,
  showDisclosure: boolean,
  tabToFocus: number,
}

export default class Tabs extends React.PureComponent<Props, State> {
  static panel = Panel;

  state: State = {
    disclosureWidth: 0,
    containerWidth: Infinity,
    tabWidths: [],
    visibleTabs: [],
    hiddenTabs: [],
    showDisclosure: false,
    tabToFocus: -1,
  };

  componentWillReceiveProps(nextProps: Props) {
    const {tabs} = this.props;
    const {disclosureWidth, tabWidths, containerWidth} = this.state;
    const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(tabs, nextProps.selected, disclosureWidth, tabWidths, containerWidth);
    this.setState({
      visibleTabs,
      hiddenTabs,
      tabToFocus: nextProps.selected,
      showDisclosure: false,
    });
  }

  render() {
    const {tabs, selected, fitted, children} = this.props;
    const {tabToFocus, visibleTabs, hiddenTabs, showDisclosure} = this.state;
    const disclosureTabs = hiddenTabs.map((tabIndex) => tabs[tabIndex]);

    const panelMarkup = children
      ? (
        <Panel
          id={`${selected}-${tabs[selected].id}-panel`}
          tabID={tabs[selected].id}
        >
          {children}
        </Panel>
      )
      : null;

    const tabsMarkup = visibleTabs.sort().map((tabIndex) => this.renderTabMarkup(tabs[tabIndex], tabIndex));

    const disclosureActivatorVisible = visibleTabs.length < tabs.length;

    const classname = classNames(
      styles.Tabs,
      fitted && styles.fitted,
      disclosureActivatorVisible && styles.fillSpace,
    );

    const disclosureTabClassName = classNames(
      styles.DisclosureTab,
      disclosureActivatorVisible && styles.visible,
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
          <li role="tab" className={disclosureTabClassName}>
            <Popover
              preventAutofocus
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
      newFocus -= 1;
    if (newFocus === -1) {
        newFocus = tabsArrayInOrder.length - 1;
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
        tab={tab}
        siblingTabHasFocus={tabToFocus > -1}
        focused={index === tabToFocus}
        selected={index === selected}
        onClick={this.handleTabClick}
        panelID={tab.panelID}
        url={tab.url}
      >
        {tab.title}
      </Tab>
    );
  }

  @autobind
  private handleFocus(event: React.FocusEvent<HTMLUListElement>) {
    const {tabToFocus} = this.state;
    const {selected} = this.props;

    if (event.relatedTarget) {
      const className = (event.relatedTarget as HTMLElement).className;
      if (!(className.includes(styles.Tab) || className.includes(styles.Item))) {
        return this.setState({tabToFocus: selected});
      }
    }

    if (event.target && tabToFocus === -1) {
      const className = (event.target as HTMLElement).className;
      if (className.includes(styles.Tab)) {
        return this.setState({tabToFocus: selected});
      }
    }
  }

  @autobind
  private handleBlur(event: React.FocusEvent<HTMLUListElement>) {
    if (event.relatedTarget) {
      const className = (event.relatedTarget as HTMLElement).className;
      if (!(className.includes(styles.Tab) || className.includes(styles.TabContainer) || className.includes(styles.Item))) {
         this.setState({tabToFocus: -1});
      }
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
  private handleMeasurement(measurements: Measurements) {
    const {tabs, selected} = this.props;
    const {tabToFocus} = this.state;
    const {hiddenTabWidths: tabWidths, containerWidth, disclosureWidth} = measurements;
    const {visibleTabs, hiddenTabs} = getVisibleAndHiddenTabIndices(tabs, selected, disclosureWidth, tabWidths, containerWidth);

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
  private handleTabClick(tab: TabDescriptor) {
    const {tabs, onSelect = noop} = this.props;
    const selectedIndex = tabs.indexOf(tab);
    onSelect(selectedIndex);
  }
}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}

function getVisibleAndHiddenTabIndices(
  tabs: TabDescriptor[],
  selected: number,
  disclosureWidth: number,
  tabWidths: number[],
  containerWidth: number,
) {
  const sumTabWidths = tabWidths.reduce((sum, width) => sum + width, 0);

  const arrayOfTabIndices = Array.from(tabs.keys());

  const visibleTabs: number[] = [];
  const hiddenTabs: number[] = [];

  if (containerWidth > sumTabWidths) {
    visibleTabs.push(...arrayOfTabIndices);
  } else {
    visibleTabs.push(selected);
    let newTabWidth: number = tabWidths[selected];

    arrayOfTabIndices.forEach((index) => {
      if (index !== selected) {
        if (newTabWidth + tabWidths[index] > containerWidth - disclosureWidth) {
          hiddenTabs.push(index);
          return;
        }
        visibleTabs.push(index);
        newTabWidth += tabWidths[index];
      }
    });
  }

  return {
    visibleTabs,
    hiddenTabs,
  };
}
