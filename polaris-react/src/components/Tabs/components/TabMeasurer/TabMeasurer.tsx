import type {ReactElement} from 'react';
import {memo, useEffect, useRef, useCallback} from 'react';

// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';
import {classNames} from '../../../../utilities/css';
import {useComponentDidMount} from '../../../../utilities/use-component-did-mount';
import type {TabDescriptor} from '../../types';
import {Tab} from '../Tab';
import styles from '../../Tabs.scss';

interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}

export interface TabMeasurerProps {
  tabToFocus: number;
  siblingTabHasFocus: boolean;
  activator: ReactElement;
  selected: number;
  tabs: TabDescriptor[];
  handleMeasurement(measurements: TabMeasurements): void;
}

export const TabMeasurer = memo(function TabMeasurer({
  selected,
  tabs,
  activator,
  tabToFocus,
  siblingTabHasFocus,
  handleMeasurement: handleMeasurementProp,
}: TabMeasurerProps) {
  const containerNode = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  const handleMeasurement = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      if (!containerNode.current) {
        return;
      }

      const containerWidth = containerNode.current.offsetWidth;
      const hiddenTabNodes = containerNode.current.children;
      const hiddenTabNodesArray = Array.from(hiddenTabNodes);
      const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
        return Math.ceil(node.getBoundingClientRect().width);
      });
      const disclosureWidth = hiddenTabWidths.pop() || 0;

      handleMeasurementProp({
        containerWidth,
        disclosureWidth,
        hiddenTabWidths,
      });
    });
  }, [handleMeasurementProp]);

  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, tabs]);

  useComponentDidMount(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(handleMeasurement, 0);
    }
  });

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
    <div className={classname} ref={containerNode}>
      <EventListener event="resize" handler={handleMeasurement} />
      {tabsMarkup}
      {activator}
    </div>
  );
});

function noop() {}
