import React, {RefObject} from 'react';
import type {KeyboardEvent, ReactNode} from 'react';
import type {TooltipProps} from '../../Tooltip';
import type {TooltipOverlayProps} from '../TooltipOverlay';
import styles from './IconTooltip.scss';

type PickedOverlayProps = Pick<
  TooltipOverlayProps,
  | 'id'
  | 'preferredPosition'
  | 'activator'
  | 'active'
  | 'accessibilityLabel'
  | 'onClose'
  | 'preventInteraction'
  | 'width'
  | 'padding'
  | 'borderRadius'
>;

export interface IconTooltipProps extends PickedOverlayProps {
  onFocus: () => void;
  onBlur: () => void;
  onMouseLeave: () => void;
  onMouseOver: () => void;
  ref: (node: HTMLElement | null) => void;
  onKeyUp: (event: KeyboardEvent) => void;
  className: string;
  children: ReactNode;
}

export function IconTooltip({children}: IconTooltipProps) {
  console.log('gog');
  return (
    <div className={styles.IconTooltip} data-my-tooltip>
      {children}
    </div>
  );
}
