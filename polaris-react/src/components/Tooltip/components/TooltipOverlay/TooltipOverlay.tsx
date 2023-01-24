import React from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {
  PositionedOverlayProps,
  PositionedOverlay,
} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';
import type {Width, Padding, BorderRadius} from '../../Tooltip';

import styles from './TooltipOverlay.scss';

export interface TooltipOverlayProps {
  id: string;
  active: boolean;
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  children?: React.ReactNode;
  activator: HTMLElement;
  accessibilityLabel?: string;
  width?: Width;
  padding?: Padding;
  borderRadius?: BorderRadius;
  zIndexOverride?: number;
  onClose(): void;
}

export function TooltipOverlay({
  active,
  activator,
  preferredPosition = 'below',
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
}: TooltipOverlayProps) {
  const i18n = useI18n();
  const markup = active ? (
    <PositionedOverlay
      active={active}
      activator={activator}
      preferredPosition={preferredPosition}
      preventInteraction={preventInteraction}
      render={renderTooltip}
      zIndexOverride={zIndexOverride}
    />
  ) : null;

  return markup;

  function renderTooltip(
    overlayDetails: Parameters<PositionedOverlayProps['render']>[0],
  ) {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const containerClassName = classNames(
      styles.TooltipOverlay,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove,
    );

    const contentClassName = classNames(styles.Content, width && styles[width]);

    const contentStyles = measuring ? undefined : {minHeight: desiredHeight};

    const style = {
      '--pc-tooltip-border-radius': borderRadius
        ? `var(--p-border-radius-${borderRadius})`
        : undefined,
      '--pc-tooltip-padding':
        padding && padding === 'default'
          ? 'var(--p-space-1) var(--p-space-2)'
          : `var(--p-space-${padding})`,
    } as React.CSSProperties;

    return (
      <div style={style} className={containerClassName} {...layer.props}>
        <div
          id={id}
          role="tooltip"
          className={contentClassName}
          style={{...contentStyles, ...style}}
          aria-label={
            accessibilityLabel
              ? i18n.translate('Polaris.TooltipOverlay.accessibilityLabel', {
                  label: accessibilityLabel,
                })
              : undefined
          }
        >
          {children}
        </div>
      </div>
    );
  }
}
