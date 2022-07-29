import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {
  PositionedOverlayProps,
  PositionedOverlay,
} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';

import styles from './TooltipOverlay.scss';

export interface TooltipOverlayProps {
  id: string;
  active: boolean;
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  children?: ReactNode;
  activator: HTMLElement;
  accessibilityLabel?: string;
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
}: TooltipOverlayProps) {
  const i18n = useI18n();
  const markup = active ? (
    <PositionedOverlay
      active={active}
      activator={activator}
      preferredPosition={preferredPosition}
      preventInteraction={preventInteraction}
      render={renderTooltip}
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

    const contentStyles = measuring ? undefined : {minHeight: desiredHeight};

    return (
      <div className={containerClassName} {...layer.props}>
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
