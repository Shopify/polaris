import React, {useEffect, useRef} from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {useSetActionRefs} from '../../../../utilities/action-refs-tracker';

import styles from './SecondaryAction.scss';

interface SecondaryAction extends ButtonProps {
  onAction?(): void;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  onAction,
  getOffsetWidth,
  id,
  ...rest
}: SecondaryAction) {
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);
  const activatorRef = useRef(null);

  useSetActionRefs({
    id,
    actionRef: activatorRef,
  });

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  return (
    <span className={styles.SecondaryAction} ref={secondaryActionsRef}>
      <span ref={activatorRef}>
        <Button onClick={onAction} {...rest}>
          {children}
        </Button>
      </span>
    </span>
  );
}
