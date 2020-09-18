import React, {useEffect, useRef} from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {useFeatures} from '../../../../utilities/features';

import styles from './SecondaryAction.scss';

interface SecondaryAction extends ButtonProps {
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  getOffsetWidth,
  ...rest
}: SecondaryAction) {
  const {newDesignLanguage} = useFeatures();
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current || !newDesignLanguage)
      return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth, newDesignLanguage]);

  return (
    <span className={styles.SecondaryAction} ref={secondaryActionsRef}>
      <Button {...rest}>{children}</Button>
    </span>
  );
}
