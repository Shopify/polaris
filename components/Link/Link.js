// @flow

import React, {Component} from 'react';

type Props = {
  to: string,
  children?: any,
};

type LinkLikeComponent = Class<Component<void, Props, void>>;

let LinkComponent: LinkLikeComponent;

export default class Link extends Component {
  static setLinkComponent(NewLinkComponent: LinkLikeComponent) {
    LinkComponent = NewLinkComponent;
  }

  props: Props;

  render() {
    if (LinkComponent) {
      return <LinkComponent {...this.props} />;
    }

    return <a {...this.props} href={this.props.to} />;
  }
}
