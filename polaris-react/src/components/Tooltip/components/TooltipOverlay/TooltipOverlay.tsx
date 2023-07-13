import React from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {PositionedOverlay} from '../../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';
import type {Width, Padding, BorderRadius} from '../../Tooltip';
import {useFeatures} from '../../../../utilities/features';

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
  const {polarisSummerEditions2023} = useFeatures();
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
          ? 'var(--p-space-1) var(--p-space-2)'
          : `var(--p-space-${padding})`,
    } as React.CSSProperties;

    return (
      <div style={style} className={containerClassName} {...layer.props}>
        {polarisSummerEditions2023 && (
          <svg className={styles.Tail} width="20" height="9" fill="none">
            <path
              d="M2 0h16L11.13 6.612a2 2 0 0 1-2.83-.055L2 0Z"
              fill="#fff"
            />
            <path
              d="M2 0h16L11.13 6.612a2 2 0 0 1-2.83-.055L2 0Z"
              fill="#fff"
            />
            <path
              d="M.613 0 7.58 7.25a3 3 0 0 0 4.243.083L19.442 0H18L11.13 6.612a2 2 0 0 1-2.83-.055L2 0H.613Z"
              fill="#E3E3E3"
            />
          </svg>
        )}
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
