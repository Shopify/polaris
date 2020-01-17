import React from 'react';
import {getRectForNode} from '@shopify/javascript-utilities/geometry';
import {
  WithAppProviderProps,
  withAppProvider,
} from '../../utilities/with-app-provider';

interface State {
  isSticky: boolean;
  style: object;
}

export type StickyProps = {
  /** Element outlining the fixed position boundaries */
  boundingElement?: HTMLElement | null;
  /** Offset vertical spacing from the top of the scrollable container */
  offset?: boolean;
  /** Should the element remain in a fixed position when the layout is stacked (smaller screens)  */
  disableWhenStacked?: boolean;
} & (
  | {children: React.ReactNode}
  | {children(isSticky: boolean): React.ReactNode}
);

type CombinedProps = StickyProps & WithAppProviderProps;

class StickyInner extends React.Component<CombinedProps, State> {
  state: State = {
    isSticky: false,
    style: {},
  };

  private placeHolderNode: HTMLElement | null = null;
  private stickyNode: HTMLElement | null = null;

  componentDidMount() {
    const {
      boundingElement,
      offset = false,
      disableWhenStacked = false,
      polaris: {stickyManager},
    } = this.props;

    if (!this.stickyNode || !this.placeHolderNode) return;

    stickyManager.registerStickyItem({
      stickyNode: this.stickyNode,
      placeHolderNode: this.placeHolderNode,
      handlePositioning: this.handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked,
    });
  }

  componentWillUnmount() {
    const {stickyManager} = this.props.polaris;
    if (!this.stickyNode) return;
    stickyManager.unregisterStickyItem(this.stickyNode);
  }

  render() {
    const {style, isSticky} = this.state;
    const {children} = this.props;

    const childrenContent = isFunction(children)
      ? children(isSticky)
      : children;

    return (
      <div>
        <div ref={this.setPlaceHolderNode} />
        <div ref={this.setStickyNode} style={style}>
          {childrenContent}
        </div>
      </div>
    );
  }

  private setPlaceHolderNode = (node: HTMLElement | null) => {
    this.placeHolderNode = node;
  };

  private setStickyNode = (node: HTMLElement | null) => {
    this.stickyNode = node;
  };

  private handlePositioning = (
    stick: boolean,
    top = 0,
    left = 0,
    width = 0,
  ) => {
    const {isSticky} = this.state;

    if ((stick && !isSticky) || (!stick && isSticky)) {
      this.adjustPlaceHolderNode(stick);
      this.setState({isSticky: !isSticky});
    }

    const style = stick
      ? {
          position: 'fixed',
          top,
          left,
          width,
        }
      : {};

    this.setState({style});
  };

  private adjustPlaceHolderNode = (add: boolean) => {
    if (this.placeHolderNode && this.stickyNode) {
      this.placeHolderNode.style.paddingBottom = add
        ? `${getRectForNode(this.stickyNode).height}px`
        : '0px';
    }
  };
}

function isFunction(arg: any): arg is Function {
  return typeof arg === 'function';
}

export const Sticky = withAppProvider<StickyProps>()(StickyInner);
