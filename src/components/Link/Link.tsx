import * as React from 'react';

import {classNames} from '@shopify/react-utilities';
import {ExternalSmallMinor} from '@shopify/polaris-icons';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import UnstyledLink from '../UnstyledLink';
import Icon from '../Icon';

import styles from './Link.scss';

export interface BaseProps {
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

export interface Props extends BaseProps {}
export type CombinedProps = Props & WithAppProviderProps;

function Link({
  url,
  children,
  onClick,
  external,
  id,
  monochrome,
  polaris,
}: CombinedProps) {
  const className = classNames(styles.Link, monochrome && styles.monochrome);
  let childrenMarkup = children;

  if (external && typeof children === 'string') {
    const iconLabel = polaris.intl.translate(
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

  return url ? (
    <UnstyledLink
      onClick={onClick}
      className={className}
      url={url}
      external={external}
      id={id}
      polaris={polaris}
    >
      {childrenMarkup}
    </UnstyledLink>
  ) : (
    <button type="button" onClick={onClick} className={className} id={id}>
      {childrenMarkup}
    </button>
  );
}

export default withAppProvider<Props>()(Link);
