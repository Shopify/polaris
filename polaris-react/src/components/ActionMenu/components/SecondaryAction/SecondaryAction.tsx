import React from 'react';

import {classNames} from '../../../../utilities/css';
import {Tooltip} from '../../../Tooltip';
import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';

import styles from './SecondaryAction.module.css';

interface SecondaryAction extends ButtonProps {
  helpText?: React.ReactNode;
  destructive?: boolean;
  onAction?(): void;
}

export function SecondaryAction({
  children,
  tone,
  helpText,
  onAction,
  destructive,
  ...rest
}: SecondaryAction) {
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
    >
      {actionMarkup}
    </div>
  );
}
