import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  to: string,
  external?: boolean,
  children?: React.ReactNode,
  [key: string]: any,
}

export type LinkLikeComponent = ReactComponent<Props>;

let LinkComponent: LinkLikeComponent;

export default class UnstyledLink extends React.PureComponent<Props, {}> {
  static use(NewLinkComponent: LinkLikeComponent) {
    LinkComponent = NewLinkComponent;
  }

  render() {
    if (LinkComponent) {
      return <LinkComponent {...this.props} data-quilt-unstyled />;
    }

    const {external, to, ...rest} = this.props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return <a target={target} {...rest} href={to} rel={rel} data-quilt-unstyled />;
  }
}
