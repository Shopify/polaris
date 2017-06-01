import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {noop} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';
import autobind from '@shopify/javascript-utilities/autobind';

import EventListener from '../EventListener';

import {TabDescriptor} from './Tabs';
import Tab from './Tab';
import * as styles from './Tabs.scss';

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
}

export default class TabMeasurer extends React.PureComponent<Props, never> {
  private containerNode: HTMLElement;

  componentDidMount() {
    this.handleMeasurement();

    if (process.env.NODE_ENV === 'development') {
      // We need to defer the calculation in development so the
      // styles have time to be injected.
      setTimeout(this.handleMeasurement, 0);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tabs !== this.props.tabs) {
      this.handleMeasurement();
    }
  }

  render() {
    const {selected, tabs, activator, tabToFocus, siblingTabHasFocus} = this.props;

    const tabsMarkup = tabs.map((tab, index) => {
      return (
        <Tab
          measuring
          key={`${index}${tab.id}Hidden`}
          id={`${tab.id}Measurer`}
          siblingTabHasFocus={siblingTabHasFocus}
          focused={index === tabToFocus}
          selected={index === selected}
          onClick={noop}
          url={tab.url}
        >
          {tab.title}
        </Tab>
      );
    });

    const classname = classNames(
      styles.Tabs,
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
