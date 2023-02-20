import React from 'react';
import type {ReactElement} from 'react';

import {Tooltip} from '../Tooltip';

export interface DisabledInfo {
  isDisabled?: boolean;
  tooltipMessage?: string;
}

interface DisabledTooltipWrapperProps {
  /** Content that activates the Tooltip */
  children: ReactElement;
  /** Interface that determines whether to render the Tooltip, and what message to show */
  disabled?: DisabledInfo;
}

export function DisabledTooltipWrapper({
  children,
  disabled,
  ...rest
}: DisabledTooltipWrapperProps) {
  const {isDisabled, tooltipMessage} = disabled || {};

  if (!isDisabled || !tooltipMessage) {
    return children;
  }

  return (
    <Tooltip
      content={tooltipMessage}
      activatorWrapper="div"
      width="wide"
      {...rest}
    >
      {children}
    </Tooltip>
  );
}
