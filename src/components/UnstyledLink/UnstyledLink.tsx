import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';
import {unstyled} from '../shared';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import compose from '../../utilities/react-compose';
import withRef from '../WithRef';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  /** A destination to link to */
  url: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /**	Content to display inside the link */
  children?: React.ReactNode;
  [key: string]: any;
}

export type LinkLikeComponent = ReactComponent<Props> | undefined;
export type CombinedProps = Props & WithAppProviderProps;

export class UnstyledLink extends React.PureComponent<CombinedProps, never> {
  render() {
    const {polaris, external, url, ...rest} = this.props;
    if (polaris && polaris.link) {
      const LinkComponent = polaris.link.getLinkComponent();
      if (LinkComponent) {
        const {polaris, ...rest} = this.props;
        return <LinkComponent {...unstyled.props} {...rest} />;
      }
    }

    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return (
      <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
    );
  }
}

export default compose<Props>(
  withAppProvider<Props>(),
  withRef<Props>(),
)(UnstyledLink);
