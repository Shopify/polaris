import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';
import {unstyled} from '../shared';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  url: string,
  external?: boolean,
  children?: React.ReactNode,
  [key: string]: any,
}

export type LinkLikeComponent = ReactComponent<Props>;

let LinkComponent: LinkLikeComponent;

export default class UnstyledLink extends React.PureComponent<Props, never> {
  static use(NewLinkComponent: LinkLikeComponent) {
    LinkComponent = NewLinkComponent;
  }

  render() {
    if (LinkComponent) {
      return <LinkComponent {...unstyled.props} {...this.props}/>;
    }

    const {external, url, ...rest} = this.props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />;
  }
}
