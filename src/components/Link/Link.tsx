import * as React from 'react';
import UnstyledLink from '../UnstyledLink';
import * as styles from './Link.scss';

export interface Props {
  url?: string,
  children?: React.ReactNode,
  external?: boolean,
  onClick?(): void,
}

export default function Link({
  url,
  children,
  onClick,
  external,
}: Props) {
  return url
    ? (
      <UnstyledLink onClick={onClick} className={styles.Link} url={url} external={external}>
        {children}
      </UnstyledLink>
    )
    : (
      <button onClick={onClick} className={styles.Link}>
        {children}
      </button>
    );
}
