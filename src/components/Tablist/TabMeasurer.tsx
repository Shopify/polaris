import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {noop} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';
import autobind from '@shopify/javascript-utilities/autobind';

import EventListener from '../EventListener';
import {TabDescriptor} from './Tablist';
import Tab from './Tab';
import * as styles from './Tablist.scss';

export interface Measurements {
  containerWidth: number,
  disclosureWidth: number,
  hiddenTabWidths: number[],
}

export interface Props {
  tabToFocus: number,
  siblingTabHasFocus: boolean,
  activator: React.ReactElement<{}>,
  selected: number,
  tabs: TabDescriptor[],
  handleMeasurement(measurements: Measurements): void,
};

export default class TabMeasurer extends React.PureComponent<Props, {}> {
  private containerNode: HTMLElement;

  componentDidMount() {
    this.handleMeasurement();
    if (process.env.NODE_ENV === 'development') {
      // We need to defer the calculation in development so the
      // styles have time to be injected.
      setTimeout(this.handleMeasurement, 0);
    }
  }

  render() {
    const {selected, tabs, activator, tabToFocus, siblingTabHasFocus} = this.props;

    const tabsMarkup = tabs.map((tab, index) => {
      return (
        <Tab
          key={`${index}-${tab.id}-hidden`}
          tab={tab}
          siblingTabHasFocus={siblingTabHasFocus}
          focused={index === tabToFocus}
          selected={index === selected}
          onClick={noop}
          to={tab.to}
          panelID={tab.panelID}
          measuring
        >
          {tab.title}
        </Tab>
      );
    });

    const classname = classNames(
      styles.Tablist,
      styles.TabMeasurer,
    );

    return (
      <div className={classname} ref={this.setContainerNode}>
        <EventListener event="resize" handler={this.handleMeasurement} />
        {tabsMarkup}
        {activator}
      </div>
    );
  }

  @autobind
  private setContainerNode(node: HTMLElement) {
    this.containerNode = node;
  }

  @autobind
  private handleMeasurement() {
    const {handleMeasurement} = this.props;
    const containerWidth = this.containerNode.offsetWidth;
    const hiddenTabNodes = findDOMNode(this).children;
    const hiddenTabNodesArray: HTMLElement[] = [].slice.call(hiddenTabNodes);
    const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
      return node.getBoundingClientRect().width;
    });
    const disclosureWidth = hiddenTabWidths.pop() as number;

    handleMeasurement({
      containerWidth,
      disclosureWidth,
      hiddenTabWidths,
    });
  }
}
