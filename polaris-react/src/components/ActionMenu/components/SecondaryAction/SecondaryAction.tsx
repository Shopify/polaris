import React, {useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {Tooltip} from '../../../Tooltip';
import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {useFeatures} from '../../../../utilities/features';

import styles from './SecondaryAction.scss';

interface SecondaryAction extends ButtonProps {
  helpText?: React.ReactNode;
  onAction?(): void;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  destructive,
  helpText,
  onAction,
  getOffsetWidth,
  ...rest
}: SecondaryAction) {
  const secondaryActionsRef = useRef<HTMLSpanElement>(null);
  const {polarisSummerEditions2023} = useFeatures();

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  const buttonMarkup = (
    <Button
      onClick={onAction}
      destructive={polarisSummerEditions2023 ? destructive : undefined}
      outline={polarisSummerEditions2023 ? rest.disabled : undefined}
      {...rest}
    >
      {children}
    </Button>
  );

  const actionMarkup = helpText ? (
    <Tooltip content={helpText}>{buttonMarkup}</Tooltip>
  ) : (
    buttonMarkup
  );

  return (
    <span
      className={
        polarisSummerEditions2023
          ? undefined
          : classNames(
              styles.SecondaryAction,
              destructive && styles.destructive,
            )
      }
      ref={secondaryActionsRef}
    >
      {actionMarkup}
    </span>
  );
}
