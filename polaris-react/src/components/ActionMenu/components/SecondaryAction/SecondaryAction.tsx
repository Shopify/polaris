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
  destructive,
  onAction,
  getOffsetWidth,
  ...rest
}: SecondaryAction) {
  return (
    <SecondaryActionWrapper
      destructive={destructive}
      getOffsetWidth={getOffsetWidth}
    >
      <Button onClick={onAction} {...rest}>
        {children}
      </Button>
    </SecondaryActionWrapper>
  );
}

export function SecondaryActionWrapper({
  children,
  destructive,
  getOffsetWidth,
}: any) {
  const secondaryActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;
    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  return (
    <div
      className={classNames(
        styles.SecondaryAction,
        destructive && styles.destructive,
      )}
      ref={secondaryActionsRef}
    >
      {children}
    </div>
  );
}
