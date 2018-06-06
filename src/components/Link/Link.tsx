import * as React from 'react';

import UnstyledLink from '../UnstyledLink';

import * as styles from './Link.scss';

export interface BaseProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** The content to display inside link */
  children?: React.ReactNode;
  /** Use for a links that open a different site */
  external?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
}

export interface Props extends BaseProps {}

export default function Link({url, children, onClick, external, id}: Props) {
  return url ? (
    <UnstyledLink
      onClick={onClick}
      className={styles.Link}
      url={url}
      external={external}
      id={id}
    >
      {children}
    </UnstyledLink>
  ) : (
    <button onClick={onClick} className={styles.Link} id={id}>
      {children}
    </button>
  );
}
