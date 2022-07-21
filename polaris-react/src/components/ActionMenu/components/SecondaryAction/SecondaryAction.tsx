import React, {useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {Button} from '../../../Button';
import {tooltipFrom} from '../../../Tooltip';
import type {ButtonProps} from '../../../Button';
import type {ActionWithTooltip} from '../../../../types';

import styles from './SecondaryAction.scss';

interface SecondaryAction extends ButtonProps, ActionWithTooltip {
  onAction?(): void;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  destructive,
  onAction,
  getOffsetWidth,
  tooltip,
  ...rest
}: SecondaryAction) {
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  let button = (
    <Button onClick={onAction} {...rest}>
      {children}
    </Button>
  );

  if (tooltip != null) {
    button = tooltipFrom(tooltip, button);
  }

  return (
    <span
      className={classNames(
        styles.SecondaryAction,
        destructive && styles.destructive,
      )}
      ref={secondaryActionsRef}
    >
      {button}
    </span>
  );
}
