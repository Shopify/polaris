import React, {useEffect, useRef} from 'react';

import {Tooltip} from '../../../Tooltip';
import type {ButtonProps} from '../../../Button';
import {Button} from '../../../Button';
import {classNames} from '../../../../utilities/css';

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

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  const buttonMarkup = (
    <div
      className={classNames(
        styles.SecondaryAction,
        destructive && styles.destructive,
      )}
    >
      <Button onClick={onAction} {...rest}>
        {children}
      </Button>
    </div>
  );

  const actionMarkup = helpText ? (
    <Tooltip content={helpText}>{buttonMarkup}</Tooltip>
  ) : (
    buttonMarkup
  );

  return <span ref={secondaryActionsRef}>{actionMarkup}</span>;
}
