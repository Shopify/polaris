import React, {useRef} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import type {DisableableAction} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Indicator} from '../../../Indicator';
import {useComponentDidMount} from '../../../../utilities/use-component-did-mount';
import styles from '../../BulkActions.module.scss';

export type BulkActionButtonProps = {
  disclosure?: boolean;
  indicator?: boolean;
  handleMeasurement?(width: number): void;
  showContentInButton?: boolean;
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
  showContentInButton,
}: BulkActionButtonProps) {
  const bulkActionButton = useRef<HTMLDivElement>(null);

  useComponentDidMount(() => {
    if (handleMeasurement && bulkActionButton.current) {
      const width = bulkActionButton.current.getBoundingClientRect().width;
      handleMeasurement(width);
    }
  });

  const buttonContent =
    disclosure && !showContentInButton ? undefined : content;

  return (
    <div className={styles.BulkActionButton} ref={bulkActionButton}>
      <Button
        external={external}
        url={url}
        accessibilityLabel={
          disclosure && !showContentInButton ? content : accessibilityLabel
        }
        disclosure={disclosure && showContentInButton}
        onClick={onAction}
        disabled={disabled}
        size="slim"
        icon={
          disclosure && !showContentInButton ? (
            <Icon source={HorizontalDotsMinor} color="base" />
          ) : undefined
        }
      >
        {buttonContent}
      </Button>
      {indicator && <Indicator />}
    </div>
  );
}
