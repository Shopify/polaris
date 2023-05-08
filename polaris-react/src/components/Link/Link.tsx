import React from 'react';

import {classNames} from '../../utilities/css';
import {UnstyledLink} from '../UnstyledLink';
import type {Target} from '../../types';

import styles from './Link.scss';

export interface LinkProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  href?: string;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Where to display the url */
  target?: Target;
  /** Sets the link color the same as the current text color */
  tone?: 'inherit' | 'critical';
  /** Sets text decoration underline on the link
   * @default 'always'
   */
  underline?: 'always' | 'hover' | 'none';
  /** Callback when a link is clicked */
  onClick?(): void;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Indicates whether or not the link is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
  /**
   * Indicate the text language. Useful when the text is in a different language than the rest of the page.
   * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
   * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label) */
  language?: string;
}

export function Link({
  href,
  children,
  onClick,
  target,
  id,
  accessibilityLabel,
  dataPrimaryLink,
  tone,
  underline = 'always',
  language,
}: LinkProps) {
  const className = classNames(
    styles.Link,
    tone === 'inherit' && styles.inherit,
    tone === 'critical' && styles.critical,
    underline === 'always' && styles.underline,
  );

  return href ? (
    <UnstyledLink
      onClick={onClick}
      className={className}
      url={href}
      target={target}
      id={id}
      aria-label={accessibilityLabel}
      data-primary-link={dataPrimaryLink}
      lang={language}
    >
      {children}
    </UnstyledLink>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={className}
      id={id}
      aria-label={accessibilityLabel}
      data-primary-link={dataPrimaryLink}
      lang={language}
    >
      {children}
    </button>
  );
}
