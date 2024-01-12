import React, {useCallback, useRef, useEffect} from 'react';

import type {
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../../../types';
import {useComponentDidMount} from '../../../../../../utilities/use-component-did-mount';
import {useI18n} from '../../../../../../utilities/i18n';
import {SecondaryAction} from '../../../SecondaryAction';
import {useEventListener} from '../../../../../../utilities/use-event-listener';
import styles from '../../Actions.module.scss';

export interface ActionsMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenActionsWidths: number[];
}

export interface ActionsMeasurerProps {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  handleMeasurement(measurements: ActionsMeasurements): void;
}

const ACTION_SPACING = 8;

export function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp,
}: ActionsMeasurerProps) {
  const i18n = useI18n();
  const containerNode = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  const defaultRollupGroup: MenuGroupDescriptor = {
    title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
    actions: [],
  };

  const activator = (
    <SecondaryAction disclosure>{defaultRollupGroup.title}</SecondaryAction>
  );

  const handleMeasurement = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      if (!containerNode.current) {
        return;
      }

      const containerWidth = containerNode.current.offsetWidth - 20 - 28;
      const hiddenActionNodes = containerNode.current.children;
      const hiddenActionNodesArray = Array.from(hiddenActionNodes);
      const hiddenActionsWidths = hiddenActionNodesArray.map((node) => {
        const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
        return buttonWidth + ACTION_SPACING;
      });
      const disclosureWidth = hiddenActionsWidths.pop() || 0;

      handleMeasurementProp({
        containerWidth,
        disclosureWidth,
        hiddenActionsWidths,
      });
    });
  }, [handleMeasurementProp]);

  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);

  useComponentDidMount(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(handleMeasurement, 0);
    }
  });

  const actionsMarkup = actions.map((action) => {
    const {content, onAction, ...rest} = action;

    return (
      <SecondaryAction key={content} onClick={onAction} {...rest}>
        {content}
      </SecondaryAction>
    );
  });

  const groupsMarkup = groups.map((group) => {
    const {title, icon} = group;
    return (
      <SecondaryAction key={title} disclosure icon={icon}>
        {title}
      </SecondaryAction>
    );
  });

  useEventListener('resize', handleMeasurement);

  return (
    <div className={styles.ActionsLayoutMeasurer} ref={containerNode}>
      {actionsMarkup}
      {groupsMarkup}
      {activator}
    </div>
  );
}
