import React from 'react';
import {ExternalSmallMinor} from '@shopify/polaris-icons';

import {BannerContext} from '../../utilities/banner-context';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import UnstyledLink from '../UnstyledLink';
import Icon from '../Icon';

import styles from './Link.scss';

export interface Props {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  /** The content to display inside link */
  children?: React.ReactNode;
  /** Use for a links that open a different site */
  external?: boolean;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
}

export default function Link({
  url,
  children,
  onClick,
  external,
  id,
  monochrome,
}: Props) {
  const intl = useI18n();
  let childrenMarkup = children;

  if (external && typeof children === 'string') {
    const iconLabel = intl.translate(
      'Polaris.Common.newWindowAccessibilityHint',
    );

    childrenMarkup = (
      <React.Fragment>
        {children}
        <span className={styles.IconLockup}>
          <span className={styles.IconLayout}>
            <Icon accessibilityLabel={iconLabel} source={ExternalSmallMinor} />
          </span>
        </span>
      </React.Fragment>
    );
  }

  return (
    <BannerContext.Consumer>
      {(BannerContext) => {
        const shouldBeMonochrome = monochrome || BannerContext;

        const className = classNames(
          styles.Link,
          shouldBeMonochrome && styles.monochrome,
        );

        return url ? (
          <UnstyledLink
            onClick={onClick}
            className={className}
            url={url}
            external={external}
            id={id}
          >
            {childrenMarkup}
          </UnstyledLink>
        ) : (
          <button type="button" onClick={onClick} className={className} id={id}>
            {childrenMarkup}
          </button>
        );
      }}
    </BannerContext.Consumer>
  );
}
