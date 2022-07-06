import React, {useEffect, useRef, useState} from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {
  PositionedOverlayProps,
  PositionedOverlay,
} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';
import {getRectForNode} from '../../../../utilities/geometry';
import type {TooltipPosition} from '../../Tooltip';

import styles from './TooltipOverlay.scss';

export interface TooltipOverlayProps {
  id: string;
  active: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  children?: React.ReactNode;
  activator: HTMLElement;
  accessibilityLabel?: string;
  onClose(): void;
  coordinates: TooltipPosition;
}

interface WindowSize {
  width: number;
  height: number;
}

export function TooltipOverlay({
  active,
  activator,
  preferredPosition = 'below',
  id,
  children,
  accessibilityLabel,
  coordinates,
}: TooltipOverlayProps) {
  const i18n = useI18n();
  const [tooltipTransform, setTooltipTransform] = useState<string>('');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const windowSize = useRef<WindowSize | null>(null);

  useEffect(() => {
    function handleWindowResize() {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const tooltipRect = getRectForNode(tooltipRef.current);
    const pushSize: number = tooltipRect.width / 2 + 10;

    const {x, y, cursorX} = coordinates;
    const {width: windowsWidth} = windowSize.current || {width: 0, height: 0};
    const hasHitRightBorder = cursorX + tooltipRect.width + 20 > windowsWidth;
    const transformPositionX = hasHitRightBorder ? x - pushSize : x + pushSize;

    setTooltipTransform(`translate(${transformPositionX}px, ${y}px)`);
  }, [coordinates]);

  const markup = active ? (
    <PositionedOverlay
      active={active}
      activator={activator}
      preferredPosition={preferredPosition}
      render={renderTooltip}
      transform={tooltipTransform}
      preventInteraction
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
      positioning === 'below' && styles.positionedBelow,
    );

    const contentStyles = measuring ? undefined : {minHeight: desiredHeight};

    return (
      <div className={containerClassName} {...layer.props} ref={tooltipRef}>
        <div
          id={id}
          role="tooltip"
          className={styles.Content}
          style={contentStyles}
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
