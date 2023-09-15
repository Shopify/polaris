import React, {PureComponent, createRef} from 'react';
import {motion} from '@shopify/polaris-tokens';

import {classNames} from '../../../utilities/css';
import {overlay} from '../../shared';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../PositionedOverlay';
import {PortalsManagerContext} from '../../../utilities/portals';
import styles from '../HoverCard.scss';

export enum HoverCardCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface HoverCardOverlayProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  captureOverscroll?: boolean;
}

interface State {
  transitionStatus: TransitionStatus;
}

export class HoverCardOverlay extends PureComponent<
  HoverCardOverlayProps,
  State
> {
  static contextType = PortalsManagerContext;
  context!: React.ContextType<typeof PortalsManagerContext>;

  state: State = {
    transitionStatus: this.props.active
      ? TransitionStatus.Entering
      : TransitionStatus.Exited,
  };

  private contentNode = createRef<HTMLDivElement>();
  private enteringTimer?: number;
  private overlayRef: React.RefObject<PositionedOverlay>;

  constructor(props: HoverCardOverlayProps) {
    super(props);
    this.overlayRef = createRef();
  }

  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }

  changeTransitionStatus(transitionStatus: TransitionStatus, cb?: () => void) {
    this.setState({transitionStatus}, cb);
    // Forcing a reflow to enable the animation
    this.contentNode.current &&
      this.contentNode.current.getBoundingClientRect();
  }

  componentDidMount() {
    if (this.props.active) {
      this.changeTransitionStatus(TransitionStatus.Entered);
    }
  }

  componentDidUpdate(oldProps: HoverCardOverlayProps) {
    if (this.props.active && !oldProps.active) {
      this.changeTransitionStatus(TransitionStatus.Entering, () => {
        this.clearTransitionTimeout();
        this.enteringTimer = window.setTimeout(() => {
          this.setState({transitionStatus: TransitionStatus.Entered});
        }, parseInt(motion['motion-duration-100'], 10));
      });
    }

    if (!this.props.active && oldProps.active) {
      this.clearTransitionTimeout();
      this.setState({transitionStatus: TransitionStatus.Exited});
    }
  }

  componentWillUnmount() {
    this.clearTransitionTimeout();
  }

  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      preferInputActivator = true,
      fixed,
      zIndexOverride,
    } = this.props;
    const {transitionStatus} = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active) return null;

    const className = classNames(
      styles.HoverCardOverlay,
      transitionStatus === TransitionStatus.Entering &&
        styles['HoverCardOverlay-entering'],
      transitionStatus === TransitionStatus.Entered &&
        styles['HoverCardOverlay-open'],
      transitionStatus === TransitionStatus.Exiting &&
        styles['HoverCardOverlay-exiting'],
    );

    return (
      <PositionedOverlay
        ref={this.overlayRef}
        fullWidth={fullWidth}
        active={active}
        activator={activator}
        preferInputActivator={preferInputActivator}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
        render={this.renderHoverCard.bind(this)}
        fixed={fixed}
        classNames={className}
        zIndexOverride={zIndexOverride}
      />
    );
  }

  private clearTransitionTimeout() {
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }
  }

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderHoverCard: PositionedOverlayProps['render'] = (overlayDetails: {
    measuring: boolean;
    desiredHeight: number;
    positioning: string;
  }) => {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, fullWidth, fullHeight, fluidContent} = this.props;

    const className = classNames(
      styles.HoverCard,
      positioning === 'above' && styles.positionedAbove,
      fullWidth && styles.fullWidth,
      measuring && styles.measuring,
    );

    const contentStyles = measuring ? undefined : {height: desiredHeight};

    const contentClassNames = classNames(
      styles.Content,
      fullHeight && styles['Content-fullHeight'],
      fluidContent && styles['Content-fluidContent'],
    );

    return (
      <div className={className} {...overlay.props}>
        <div className={styles.ContentContainer}>
          <div
            id={id}
            className={contentClassNames}
            style={contentStyles}
            ref={this.contentNode}
          >
            {children}
          </div>
        </div>
      </div>
    );
  };
}

export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}
