import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';
import {closest} from '@shopify/javascript-utilities/dom';
import {classNames} from '@shopify/react-utilities/styles';

import {scrollable} from '../shared';

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
  static forNode(node: HTMLElement): HTMLElement | Document {
    return (closest(node, scrollable.selector) as HTMLElement | null) || document;
  }

  state: State = {
    topShadow: false,
    bottomShadow: false,
  };

  private scrollArea: HTMLElement | null;

  componentDidMount() {
    if (this.scrollArea == null || !this.props.shadow) { return; }
    addEventListener(this.scrollArea, 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollArea == null || !this.props.shadow) { return; }
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
        className={finalClassName}
        {...scrollable.props}
        {...rest}
        ref={this.setScrollArea}
      >
        {children}
      </div>
    );
  }

  @autobind
  private setScrollArea(scrollArea: HTMLElement | null) {
    this.scrollArea = scrollArea;
  }

  @autobind
  private handleScroll() {
    const {scrollArea} = this;
    if (scrollArea == null || !this.props.shadow) { return; }

    const {scrollTop, clientHeight, scrollHeight} = scrollArea;
    const shouldBottomShadow = !(scrollTop + clientHeight >= scrollHeight);
    const shouldTopShadow = scrollTop > 0;

    this.setState({
      topShadow: shouldTopShadow,
      bottomShadow: shouldBottomShadow,
    });
  }
}
