import React, {PureComponent} from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {
  PositionedOverlayProps,
  PositionedOverlay,
} from '../../../PositionedOverlay';
import {useI18n} from '../../../../utilities/i18n';
import styles from '../../Tooltip.scss';

export interface TooltipOverlayProps {
  id: string;
  active: boolean;
  light?: boolean;
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  children?: React.ReactNode;
  activator: HTMLElement;
  accessibilityLabel?: string;
  onClose(): void;
}

type CombinedProps = TooltipOverlayProps & {
  i18n: ReturnType<typeof useI18n>;
};

class TooltipOverlayInner extends PureComponent<CombinedProps, never> {
  render() {
    const markup = this.props.active ? this.renderOverlay() : null;

    return markup;
  }

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderOverlay = () => {
    const {
      active,
      activator,
      preferredPosition = 'below',
      preventInteraction,
    } = this.props;

    return (
      <PositionedOverlay
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        preventInteraction={preventInteraction}
        render={this.renderTooltip}
      />
    );
  };

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderTooltip: PositionedOverlayProps['render'] = (
    overlayDetails,
  ) => {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, light, accessibilityLabel, i18n} = this.props;

    const containerClassName = classNames(
      styles.Tooltip,
      light && styles.light,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove,
    );

    const contentStyles = measuring ? undefined : {minHeight: desiredHeight};

    return (
      <div className={containerClassName} {...layer.props}>
        <div className={styles.Wrapper}>
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
      </div>
    );
  };
}

export function TooltipOverlay(props: TooltipOverlayProps) {
  const i18n = useI18n();

  return <TooltipOverlayInner {...props} i18n={i18n} />;
}
