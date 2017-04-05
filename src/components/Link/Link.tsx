import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import UnstyledLink from '../UnstyledLink';
import * as styles from './Link.scss';

export interface Props {
  to?: string,
  children?: React.ReactNode,
  external?: boolean,
  subdued?: boolean,
  onClick?(): void,
}

export default function Link({
  to,
  children,
  onClick,
  subdued,
  external,
}: Props) {
  const className = classNames(
    styles.Link,
    subdued && styles.subdued,
  );

  return to
    ? (
      <UnstyledLink className={className} to={to} external={external}>
        {children}
      </UnstyledLink>
    )
    : (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
}
