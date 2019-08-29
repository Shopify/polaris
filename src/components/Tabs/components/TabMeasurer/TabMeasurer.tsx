import React from 'react';
import {classNames} from '../../../../utilities/css';
import EventListener from '../../../EventListener';

import {TabDescriptor} from '../../types';
import Tab from '../Tab';
import styles from '../../Tabs.scss';

export interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}

export interface Props {
  tabToFocus: number;
  siblingTabHasFocus: boolean;
  activator: React.ReactElement<{}>;
  selected: number;
  tabs: TabDescriptor[];
  handleMeasurement(measurements: TabMeasurements): void;
}

export default class TabMeasurer extends React.PureComponent<Props, never> {
  private containerNode: React.RefObject<HTMLDivElement> = React.createRef();
  private animationFrame: number | null = null;

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
    const {
      selected,
      tabs,
      activator,
      tabToFocus,
      siblingTabHasFocus,
    } = this.props;

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
          {tab.content}
        </Tab>
      );
    });

    const classname = classNames(styles.Tabs, styles.TabMeasurer);

    return (
      <div className={classname} ref={this.containerNode}>
        <EventListener event="resize" handler={this.handleMeasurement} />
        {tabsMarkup}
        {activator}
      </div>
    );
  }

  private handleMeasurement = () => {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      if (!this.containerNode.current) {
        return;
      }

      const {handleMeasurement} = this.props;
      const containerWidth = this.containerNode.current.offsetWidth;
      const hiddenTabNodes = this.containerNode.current.children;
      const hiddenTabNodesArray = Array.from(hiddenTabNodes);
      const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
        return node.getBoundingClientRect().width;
      });
      const disclosureWidth = hiddenTabWidths.pop() as number;

      handleMeasurement({
        containerWidth,
        disclosureWidth,
        hiddenTabWidths,
      });
    });
  };
}

function noop() {}
