import React from 'react';
import {unstyled} from '../shared';
import {usePolaris} from '../../hooks';

export interface Props extends React.HTMLProps<HTMLAnchorElement> {
  /** A destination to link to */
  url: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  /**	Content to display inside the link */
  children?: React.ReactNode;
  [key: string]: any;
}

export type LinkLikeComponent = React.ComponentType<Props> | undefined;

export default React.memo(function UnstyledLink(props: Props) {
  const polaris = usePolaris();
  if (polaris && polaris.link) {
    const LinkComponent = polaris.link.getLinkComponent();
    if (LinkComponent) {
      return <LinkComponent {...unstyled.props} {...props} />;
    }
  }

  const {external, url, ...rest} = props;
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  return (
    <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
  );
});
