import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Scrollable.scss';

export interface Props extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode,
  vertical?: boolean,
  horizontal?: boolean,
  shadow?: boolean,
}

export interface State {
  topShadow: boolean,
  bottomShadow: boolean,
}

export default class Scrollable extends React.Component<Props, State> {
  state: State = {
    topShadow: false,
    bottomShadow: false,
  };

  private scrollArea?: HTMLElement | null;

  componentDidMount() {
    if (this.scrollArea == null) { return; }
    addEventListener(this.scrollArea, 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollArea == null) { return; }
    removeEventListener(this.scrollArea, 'scroll', this.handleScroll);
  }

  render() {
    const {topShadow, bottomShadow} = this.state;
    const {
      children,
      className,
      horizontal,
      vertical = true,
      shadow,
      ...rest,
    } = this.props;

    const finalClassName = classNames(
      className,
      styles.Scrollable,
      vertical && styles.vertical,
      horizontal && styles.horizontal,
      topShadow && styles.hasTopShadow,
      bottomShadow && styles.hasBottomShadow,
    );

    return (
      <div
        data-quilt-scrollable
        className={finalClassName}
        {...rest}
        ref={shadow ? this.setScrollArea : undefined}
      >
        {children}
      </div>
    );
  }

  @autobind
  private setScrollArea(scrollArea: HTMLElement) {
    this.scrollArea = scrollArea;
  }

  @autobind
  private handleScroll() {
    const {scrollArea} = this;
    if (scrollArea == null) { return; }

    const {scrollTop, clientHeight, scrollHeight} = scrollArea;
    const shouldBottomShadow = !(scrollTop + clientHeight >= scrollHeight);
    const shouldTopShadow = scrollTop > 0;

    this.setState({
      topShadow: shouldTopShadow,
      bottomShadow: shouldBottomShadow,
    });
  }
}

