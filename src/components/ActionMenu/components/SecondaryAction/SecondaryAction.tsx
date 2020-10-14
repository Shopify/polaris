import React, {useEffect, useRef} from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {useFeatures} from '../../../../utilities/features';

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
  const {newDesignLanguage} = useFeatures();
  const secondaryActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current || !newDesignLanguage)
      return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth, newDesignLanguage]);

  return (
    <div className={styles.SecondaryAction} ref={secondaryActionsRef}>
      <Button onClick={onAction} {...rest}>
        {children}
      </Button>
    </div>
  );
}
