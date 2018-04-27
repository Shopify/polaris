import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import UnstyledLink from '../UnstyledLink';

import * as styles from './Link.scss';

export interface Props {
  /** The url to link to. */
  url?: string;
  /** The content to display inside link */
  children?: React.ReactNode;
  /** Use for a links that open a different site */
  external?: boolean;
  /** Use either 'left' or 'right' to align content of the button the component renders when a url is not provided */
  alignContent?: string;
  /** Callback when a link is clicked */
  onClick?(): void;
}

export default function Link({
  url,
  children,
  external,
  alignContent,
  onClick,
}: Props) {
  const alignLeft = alignContent === 'left';
  const alignRight = alignContent === 'right';

  const buttonClassName = classNames(
    styles.Link,
    alignLeft && styles['Link-alignLeft'],
    alignRight && styles['Link-alignRight'],
  );

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
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
