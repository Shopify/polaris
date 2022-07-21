import React from 'react';
import type {ReactNode} from 'react';

import type {ActionTooltip} from '../../types';
import {isInterface} from '../../utilities/is-interface';

import {Tooltip, TooltipProps} from './Tooltip';

export function tooltipFrom(
  tooltip: ReactNode | ActionTooltip,
  button: ReactNode,
) {
  const tooltipProps: TooltipProps =
    isInterface(tooltip) && isMinimalTooltipProps(tooltip)
      ? tooltip
      : {content: tooltip};

  return <Tooltip {...tooltipProps}>{button}</Tooltip>;
}

function isMinimalTooltipProps(input: any): input is TooltipProps {
  return typeof input === 'object' && input?.content != null;
}
