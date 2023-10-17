import React, {useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {Tooltip} from '../../../Tooltip';
import type {ButtonProps} from '../../../Button';
import {Button} from '../../../Button';
import type {MenuActionDescriptor} from '../../../../types';

import styles from './SecondaryAction.scss';

interface SecondaryAction
  extends ButtonProps,
    Omit<MenuActionDescriptor, 'icon' | 'tone' | 'variant'> {
  helpText?: React.ReactNode;
  getOffsetWidth?(width: number): void;
}

export function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  getOffsetWidth,
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
      tone={rest.destructive ? 'critical' : undefined}
      variant={rest.plain || rest.outline ? 'plain' : undefined}
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
