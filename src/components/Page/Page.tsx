import React from 'react';

import {classNames} from '../../utilities/css';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';

import {Header, HeaderProps} from './components';
import styles from './Page.scss';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
}

export type ComposedProps = PageProps & WithAppProviderProps;

class Page extends React.PureComponent<ComposedProps, never> {
  render() {
    const {children, fullWidth, narrowWidth, ...rest} = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
      narrowWidth && styles.narrowWidth,
    );

    const headerMarkup =
      this.hasHeaderContent() === false ? null : <Header {...rest} />;

    return (
      <div className={className}>
        {headerMarkup}
        <div className={styles.Content}>{children}</div>
      </div>
    );
  }

  private hasHeaderContent(): boolean {
    const {
      title,
      primaryAction,
      secondaryActions,
      actionGroups,
      breadcrumbs,
    } = this.props;

    return (
      (title != null && title !== '') ||
      primaryAction != null ||
      (secondaryActions != null && secondaryActions.length > 0) ||
      (actionGroups != null && actionGroups.length > 0) ||
      (breadcrumbs != null && breadcrumbs.length > 0)
    );
  }
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<PageProps>()(Page);
