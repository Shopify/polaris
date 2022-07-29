import {useRef} from 'react';

import type {DisableableAction} from '../../../../types';
import {Button} from '../../../Button';
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
        aria-label={accessibilityLabel}
        onClick={onAction}
        disabled={disabled}
        disclosure={disclosure}
      >
        {content}
      </Button>
      {indicator && <Indicator />}
    </div>
  );
}
