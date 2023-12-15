import React, {useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {Tooltip} from '../../../Tooltip';
import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';

import styles from './SecondaryAction.module.scss';

interface SecondaryAction extends ButtonProps {
  helpText?: React.ReactNode;
  destructive?: boolean;
  onAction?(): void;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  getOffsetWidth,
  destructive,
  ...rest
}: SecondaryAction) {
  const secondaryActionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;

    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);

  const buttonMarkup = (
    <Button
      onClick={onAction}
      tone={destructive ? 'critical' : undefined}
      {...rest}
    >
      {children}
    </Button>
  );

  const actionMarkup = helpText ? (
    <Tooltip preferredPosition="below" content={helpText}>
      {buttonMarkup}
    </Tooltip>
  ) : (
    buttonMarkup
  );

  return (
    <div
      className={classNames(
        styles.SecondaryAction,
        tone === 'critical' && styles.critical,
      )}
      ref={secondaryActionsRef}
    >
      {actionMarkup}
    </div>
  );
}
