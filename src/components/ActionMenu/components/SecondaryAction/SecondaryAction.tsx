import React, {useEffect, useRef} from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';

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
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current || !newDesignLanguage)
      return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth, newDesignLanguage]);

  return (
    <span
      className={classNames(styles.SecondaryAction, styles.newDesignLanguage)}
      ref={secondaryActionsRef}
    >
      <Button onClick={onAction} {...rest}>
        {children}
      </Button>
    </span>
  );
}
