import React, {useCallback, useRef, useEffect} from 'react';

import {useI18n} from '../../../../utilities/i18n';
import {BulkActionButton} from '../BulkActionButton';
import {useEventListener} from '../../../../utilities/use-event-listener';
import styles from '../../BulkActions.module.scss';
import type {BulkActionsProps} from '../../BulkActions';
import {
  instanceOfMenuGroupDescriptor,
  instanceOfBulkActionListSection,
  isNewBadgeInBadgeActions,
  getActionSections,
} from '../../utilities';

export interface ActionsMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenActionsWidths: number[];
}

export interface ActionsMeasurerProps {
  /** Collection of page-level secondary actions */
  actions?: BulkActionsProps['actions'];
  /** Collection of page-level action groups */
  promotedActions?: BulkActionsProps['promotedActions'];
  disabled?: BulkActionsProps['disabled'];
  buttonSize?: BulkActionsProps['buttonSize'];
  handleMeasurement(measurements: ActionsMeasurements): void;
}

const ACTION_SPACING = 8;

export function BulkActionsMeasurer({
  actions = [],
  promotedActions = [],
  disabled,
  buttonSize,
  handleMeasurement: handleMeasurementProp,
}: ActionsMeasurerProps) {
  const i18n = useI18n();
  const containerNode = useRef<HTMLDivElement>(null);
  const actionSections = getActionSections(actions);

  const activatorLabel = i18n.translate(
    'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
  );

  const activator = (
    <BulkActionButton
      disclosure
      // showContentInButton={!promotedActionsMarkup}
      // onAction={this.togglePopover}
      content={activatorLabel}
      // disabled={disabled}
      // indicator={this.isNewBadgeInBadgeActions()}
      // size={buttonSize}
    />
  );

  const handleMeasurement = useCallback(() => {
    if (!containerNode.current) {
      return;
    }

    const containerWidth = containerNode.current.offsetWidth;
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
  }, [handleMeasurementProp]);

  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, promotedActions]);

  const promotedActionsMarkup = promotedActions.map((action, index) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      return (
        <BulkActionButton
          key={index}
          disclosure
          showContentInButton
          content={action.title}
          indicator={isNewBadgeInBadgeActions(actionSections)}
          size={buttonSize}
        />
      );
    }
    return (
      <BulkActionButton
        key={index}
        disabled={disabled}
        {...action}
        size={buttonSize}
      />
    );
  });

  const actionsMarkup = actions.map((action, index) => {
    if (
      instanceOfBulkActionListSection(action) &&
      typeof action.title === 'string'
    ) {
      return (
        <BulkActionButton
          key={index}
          disclosure
          showContentInButton
          content={action.title}
          indicator={isNewBadgeInBadgeActions(actionSections)}
          size={buttonSize}
        />
      );
    }
    return (
      <BulkActionButton
        key={index}
        disabled={disabled}
        {...action}
        size={buttonSize}
      />
    );
  });

  useEventListener('resize', handleMeasurement);

  return (
    <div className={styles.BulkActionsLayoutMeasurer} ref={containerNode}>
      {promotedActionsMarkup}
      {actionsMarkup}
      {activator}
    </div>
  );
}
