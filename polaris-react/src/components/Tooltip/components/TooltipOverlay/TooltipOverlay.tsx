import React from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {PositionedOverlay} from '../../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';
import type {Width, Padding, BorderRadius} from '../../Tooltip';

import styles from './TooltipOverlay.module.css';

const tailUpPaths = (
  <>
    <path
      d="M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z"
      fill="var(--p-color-tooltip-tail-up-border-experimental)"
    />
    <path
      d="M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z"
      fill="var(--p-color-bg-surface)"
    />
  </>
);

const tailDownPaths = (
  <>
    <path
      d="m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z"
      fill="var(--p-color-tooltip-tail-down-border-experimental)"
    />
    <path
      d="M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z"
      fill="var(--p-color-bg-surface)"
    />
  </>
);

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
  instant?: boolean;
}

export function TooltipOverlay({
  active,
  activator,
  preferredPosition = 'above',
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant,
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
    const {measuring, desiredHeight, positioning, chevronOffset} =
      overlayDetails;

    const containerClassName = classNames(
      styles.TooltipOverlay,
      measuring && styles.measuring,
      !measuring && styles.measured,
      instant && styles.instant,
      positioning === 'above' && styles.positionedAbove,
    );

    const contentClassName = classNames(styles.Content, width && styles[width]);

    const contentStyles = measuring ? undefined : {minHeight: desiredHeight};

    const style = {
      '--pc-tooltip-chevron-x-pos': `${chevronOffset}px`,
      '--pc-tooltip-border-radius': borderRadius
        ? `var(--p-border-radius-${borderRadius})`
        : undefined,
      '--pc-tooltip-padding':
        padding && padding === 'default'
          ? 'var(--p-space-100) var(--p-space-200)'
          : `var(--p-space-${padding})`,
    } as React.CSSProperties;

    return (
      <div style={style} className={containerClassName} {...layer.props}>
        <svg className={styles.Tail} width="19" height="11" fill="none">
          {positioning === 'above' ? tailDownPaths : tailUpPaths}
        </svg>
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
