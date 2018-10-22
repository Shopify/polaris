import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {nodeContainsDescendant} from '@shopify/javascript-utilities/dom';
import {write} from '@shopify/javascript-utilities/fastdom';
import {classNames} from '@shopify/react-utilities/styles';
import {isElementOfType, wrapWithComponent} from '@shopify/react-utilities';
import {Transition} from 'react-transition-group';
import {Keys} from 'types';
import {overlay, Duration} from 'components/shared';
import {EventListener, KeypressListener} from 'components';
import PositionedOverlay, {
  OverlayDetails,
  PreferredPosition,
  PreferredAlignment,
} from 'components/PositionedOverlay';
import Pane, {Props as PaneProps} from '../Pane';
import * as styles from '../../Popover.scss';

export enum CloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface Props {
  children?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  active: boolean;
  id: string;
  activator: HTMLElement;
  preventAutofocus?: boolean;
  sectioned?: boolean;
  fixed?: boolean;
  onClose(source: CloseSource): void;
}

export default class PopoverOverlay extends React.PureComponent<Props, never> {
  private contentNode = React.createRef<HTMLDivElement>();
  private transitionStatus: TransitionStatus | null = null;

  componentDidMount() {
    if (this.props.active) {
      this.focusContent();
    }
  }

  componentDidUpdate(oldProps: Props) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();
    }
  }

  render() {
    const {active} = this.props;
    return (
      <Transition
        in={active}
        timeout={Duration.Fast}
        mountOnEnter
        unmountOnExit
      >
        {this.renderOverlay}
      </Transition>
    );
  }

  private focusContent() {
    if (this.props.preventAutofocus) {
      return;
    }
    if (this.contentNode == null) {
      return;
    }

    write(() => {
      if (this.contentNode.current == null) {
        return;
      }

      this.contentNode.current.focus();
    });
  }

  @autobind
  private renderOverlay(transitionStatus: TransitionStatus) {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      fixed,
    } = this.props;

    return (
      <PositionedOverlay
        testID="positionedOverlay"
        fullWidth={fullWidth}
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
        // eslint-disable-next-line react/jsx-no-bind
        render={this.renderPopover.bind(this, transitionStatus)}
        fixed={fixed}
        onScrollOut={this.handleScrollOut}
      />
    );
  }

  @autobind
  private renderPopover(
    transitionStatus: TransitionStatus,
    overlayDetails: OverlayDetails,
  ) {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, sectioned, fullWidth, fullHeight} = this.props;

    const className = classNames(
      styles.Popover,
      transitionStatus && animationVariations(transitionStatus),
      positioning === 'above' && styles.positionedAbove,
      fullWidth && styles.fullWidth,
      measuring && styles.measuring,
    );

    this.transitionStatus = transitionStatus;

    const contentStyles = measuring ? undefined : {height: desiredHeight};

    const contentClassNames = classNames(
      styles.Content,
      fullHeight && styles['Content-fullHeight'],
    );

    const content = (
      <div
        id={id}
        tabIndex={-1}
        className={contentClassNames}
        style={contentStyles}
        ref={this.contentNode}
      >
        {renderPopoverContent(children, {sectioned})}
      </div>
    );

    return (
      <div className={className} {...overlay.props}>
        <EventListener event="click" handler={this.handleClick} />
        <EventListener event="touchstart" handler={this.handleClick} />
        <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleEscape} />
        <div
          className={styles.FocusTracker}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={this.handleFocusFirstItem}
        />
        <div className={styles.Wrapper}>{content}</div>
        <div
          className={styles.FocusTracker}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={this.handleFocusLastItem}
        />
      </div>
    );
  }

  @autobind
  private handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const {
      contentNode,
      props: {activator, onClose},
    } = this;
    const isDescendant =
      contentNode.current != null &&
      nodeContainsDescendant(contentNode.current, target);
    const isActivatorDescendant = nodeContainsDescendant(activator, target);
    if (
      isDescendant ||
      isActivatorDescendant ||
      this.transitionStatus !== 'entered'
    ) {
      return;
    }
    onClose(CloseSource.Click);
  }

  @autobind
  private handleScrollOut() {
    this.props.onClose(CloseSource.ScrollOut);
  }

  @autobind
  private handleEscape() {
    this.props.onClose(CloseSource.EscapeKeypress);
  }

  @autobind
  private handleFocusFirstItem() {
    this.props.onClose(CloseSource.FocusOut);
  }

  @autobind
  private handleFocusLastItem() {
    this.props.onClose(CloseSource.FocusOut);
  }
}

function renderPopoverContent(
  children: React.ReactNode,
  props?: Partial<PaneProps>,
) {
  const childrenArray = React.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) {
    return childrenArray;
  }
  return wrapWithComponent(childrenArray, Pane, props);
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case 'exiting':
      return styles.exiting;
    default:
      return null;
  }
}
