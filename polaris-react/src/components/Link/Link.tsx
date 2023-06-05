import React from 'react';

import {BannerContext} from '../../utilities/banner-context';
import {classNames} from '../../utilities/css';
import {UnstyledLink} from '../UnstyledLink';
import type {Target} from '../../types';

import styles from './Link.scss';

export interface LinkProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Makes the link open in a new tab
   * @deprecated use `target` set to `_blank` instead
   */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Removes text decoration underline to the link*/
  removeUnderline?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Indicates whether or not the link is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
}

export function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink,
}: LinkProps) {
  return (
    <BannerContext.Consumer>
      {(BannerContext) => {
        const shouldBeMonochrome = monochrome || BannerContext;

        const className = classNames(
          styles.Link,
          shouldBeMonochrome && styles.monochrome,
          removeUnderline && styles.removeUnderline,
        );

        return url ? (
          <UnstyledLink
            onClick={onClick}
            className={className}
            url={url}
            external={external}
            target={target}
            id={id}
            aria-label={accessibilityLabel}
            data-primary-link={dataPrimaryLink}
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
          >
            {children}
          </button>
        );
      }}
    </BannerContext.Consumer>
  );
}
