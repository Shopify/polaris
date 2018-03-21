import * as React from 'react';
import UnstyledLink from '../UnstyledLink';
import * as styles from './Link.scss';

export interface Props {
  /** The url to link to. */
  url?: string;
  /** The content to display inside link */
  children?: React.ReactNode;
  /** Use for a links that open a different site */
  external?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
}

export default function Link({url, children, onClick, external}: Props) {
  return url ? (
    <UnstyledLink
      onClick={onClick}
      className={styles.Link}
      url={url}
      external={external}
    >
      {children}
    </UnstyledLink>
  ) : (
    <button onClick={onClick} className={styles.Link}>
      {children}
    </button>
  );
}
