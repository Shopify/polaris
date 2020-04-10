import React from 'react';

import {classNames} from '../../../../utilities/css';
import {layer} from '../../../shared';
import {
  PositionedOverlayProps,
  PositionedOverlay,
} from '../../../PositionedOverlay';
import styles from '../../Tooltip.scss';

export interface TooltipOverlayProps {
  id: string;
  active: boolean;
  light?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  children?: React.ReactNode;
  activator: HTMLElement;
  onClose(): void;
}

export class TooltipOverlay extends React.PureComponent<
  TooltipOverlayProps,
  never
> {
  render() {
    const markup = this.props.active ? this.renderOverlay() : null;

    return markup;
  }

  private renderOverlay = () => {
    const {active, activator, preferredPosition = 'below'} = this.props;

    return (
      <PositionedOverlay
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderTooltip}
      />
    );
  };

  private renderTooltip: PositionedOverlayProps['render'] = (
    overlayDetails,
  ) => {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, light} = this.props;

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
          >
            {children}
          </div>
        </div>
      </div>
    );
  };
}
