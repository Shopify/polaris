import React, {useRef} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import type {DisableableAction} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Indicator} from '../../../Indicator';
import {useComponentDidMount} from '../../../../utilities/use-component-did-mount';
import styles from '../../BulkActions.scss';

export type BulkActionButtonProps = {
  disclosure?: boolean;
  indicator?: boolean;
  handleMeasurement?(width: number): void;
} & DisableableAction;

export function BulkActionButton({
  handleMeasurement,
  url,
  external,
  onAction,
  content,
  disclosure,
  accessibilityLabel,
  disabled,
  indicator,
}: BulkActionButtonProps) {
  const bulkActionButton = useRef<HTMLDivElement>(null);

  useComponentDidMount(() => {
    if (handleMeasurement && bulkActionButton.current) {
      const width = bulkActionButton.current.getBoundingClientRect().width;
      handleMeasurement(width);
    }
  });

  return (
    <div className={styles.BulkActionButton} ref={bulkActionButton}>
      <Button
        external={external}
        url={url}
        aria-label={disclosure ? content : accessibilityLabel}
        onClick={onAction}
        disabled={disabled}
        size="slim"
        icon={
          disclosure ? (
            <Icon source={HorizontalDotsMinor} color="base" />
          ) : undefined
        }
      >
        {disclosure ? undefined : content}
      </Button>
      {indicator && <Indicator />}
    </div>
  );
}
