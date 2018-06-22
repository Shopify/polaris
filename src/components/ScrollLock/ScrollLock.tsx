import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './ScrollLock.scss';

export interface Props {
  children?: React.ReactNode;
  constrained?: boolean;
}

interface State {
  touchStartY: number;
  touchEndY: number;
  touchUp: boolean;
}

export default class ScrollLock extends React.PureComponent<Props, State> {
  state: State = {
    touchStartY: 0,
    touchEndY: 0,
    touchUp: false,
  };

  render() {
    const {constrained} = this.props;

    return (
      <div
        className={classNames(
          styles.Container,
          constrained ? styles.Constrained : styles.FullHeight,
        )}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleScrolling}
        onWheel={this.handleScrolling}
      >
        {this.props.children}
      </div>
    );
  }

  @autobind
  private handleScrolling(event: any) {
    const pane = event.currentTarget;
    const touchMove = event.type === 'touchmove';
    const [height, scrollHeight, scrollTop] = [
      pane.offsetHeight,
      pane.scrollHeight,
      pane.scrollTop,
    ];

    const delta = touchMove
      ? this.state.touchStartY - event.touches[0].pageY
      : event.deltaY;
    const up = touchMove ? this.state.touchUp : delta < 0;

    const scrollingUpPastTop = up && -delta > scrollTop;
    const scrollingDownPastBottom =
      !up && delta > scrollHeight - height - scrollTop;

    event.stopPropagation();

    if (touchMove) {
      this.setState({touchEndY: event.changedTouches[0].screenY});
      this.swipeDirection();
    }

    if (scrollingUpPastTop) {
      pane.scrollTop = 0;
      preventScrolling();
    }

    if (scrollingDownPastBottom) {
      pane.scrollTop = scrollHeight;
      preventScrolling();
    }

    function preventScrolling() {
      event.preventDefault();
    }
  }

  @autobind
  private handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    this.setState({touchStartY: event.changedTouches[0].screenY});
  }

  @autobind
  private swipeDirection() {
    const {touchStartY, touchEndY} = this.state;
    this.setState({touchUp: touchEndY >= touchStartY});
  }
}
