import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';

import {layer} from '../../../shared';
import PositionedOverlay, {
  OverlayDetails,
  PreferredPosition,
} from '../../../PositionedOverlay';

import * as styles from '../../Tooltip.scss';

export interface Props {
  id: string;
  active: boolean;
  light?: boolean;
  preferredPosition?: PreferredPosition;
  children?: React.ReactNode;
  activator: HTMLElement;
  onClose(): void;
}

export default class TooltipOverlay extends React.PureComponent<Props, never> {
  render() {
    const markup = this.props.active ? this.renderOverlay() : null;

    return markup;
  }

  @autobind
  private renderOverlay() {
    const {active, activator, preferredPosition = 'below'} = this.props;

    return (
      <PositionedOverlay
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderTooltip}
      />
    );
  }

  @autobind
  private renderTooltip(overlayDetails: OverlayDetails) {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, light} = this.props;

    const containerClassName = classNames(
      styles.Tooltip,
      light && styles.light,
      measuring && styles.measuring,
      positioning === 'above' && styles.positionedAbove,
    );

    const contentStyles = measuring ? undefined : {maxHeight: desiredHeight};

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
  }
}
