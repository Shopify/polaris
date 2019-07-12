import React from 'react';
import {unstyled} from '../shared';
import {useLink, UnstyledLinkProps} from '../../utilities/link';

// Every components needs a `Props` interface
// for our styleguide to build the props explorer
interface Props extends UnstyledLinkProps {}

function UnstyledLink(props: Props) {
  const link = useLink();
  if (link) {
    const LinkComponent = link.getLinkComponent();
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
}

export default React.memo(UnstyledLink);
