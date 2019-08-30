import React from 'react';
import {unstyled} from '../shared';
import {useLink, LinkLikeComponentProps} from '../../utilities/link';

// Every component needs a `Props` interface for our styleguide to build the props explorer
// It'd be great if we could do `type Props = React.ComponentProps<LinkLikeComponent>`
// but the props explorer isn't smart enough to work that out
export interface UnstyledLinkProps extends LinkLikeComponentProps {}

export const UnstyledLink = React.memo(
  // This does have a display name, but the linting has a bug in it
  // https://github.com/yannickcr/eslint-plugin-react/issues/2324
  // eslint-disable-next-line react/display-name
  React.forwardRef(function UnstyledLink(
    props: UnstyledLinkProps,
    _ref: React.RefObject<unknown>,
  ) {
    const LinkComponent = useLink();
    if (LinkComponent) {
      return <LinkComponent {...unstyled.props} {...props} />;
    }

    const {external, url, ...rest} = props;
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;
    return (
      <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
    );
  }),
);
