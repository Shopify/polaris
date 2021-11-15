import React, {useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';

import styles from './SecondaryAction.scss';

interface SecondaryAction extends ButtonProps {
  onAction?(): void;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  onAction,
  getOffsetWidth,
  ...rest
}: SecondaryAction) {
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  return (
    <span
      className={classNames(
        styles.SecondaryAction,
        rest?.destructive && styles.destructive,
      )}
      ref={secondaryActionsRef}
    >
      <Button onClick={onAction} {...rest}>
        {children}
      </Button>
    </span>
  );
}
