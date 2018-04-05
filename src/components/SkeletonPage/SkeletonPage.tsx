import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import DisplayText from '../DisplayText';
import SkeletonDisplayText from '../SkeletonDisplayText';
import SkeletonBodyText from '../SkeletonBodyText';

import * as styles from './SkeletonPage.scss';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

export interface Props {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Number of secondary page-level actions to display */
  secondaryActions?: number;
  /** Shows a skeleton over the breadcrumb */
  breadcrumbs?: boolean;
  /** The child elements to render in the skeleton page. */
  children?: React.ReactNode;
}

export type CombinedProps = Props & WithAppProviderProps;

export class SkeletonPage extends React.PureComponent<CombinedProps, never> {
  render() {
    const {
      children,
      fullWidth,
      secondaryActions,
      title = '',
      breadcrumbs,
    } = this.props;

    const className = classNames(styles.Page, fullWidth && styles.fullWidth);

    const headerClassName = classNames(
      styles.Header,
      secondaryActions && styles['Header-hasSecondaryActions'],
      breadcrumbs && styles['Header-hasBreadcrumbs'],
    );

    const titleMarkup = title !== null ? renderTitle(title) : null;

    const secondaryActionsMarkup = secondaryActions
      ? renderSecondaryActions(secondaryActions)
      : null;

    const breadcrumbMarkup = breadcrumbs ? renderSecondaryActions(1) : null;

    const headerMarkup = !this.props.polaris.easdk ? (
      <div className={headerClassName}>
        {breadcrumbMarkup}
        {titleMarkup}
        {secondaryActionsMarkup}
      </div>
    ) : null;

    return (
      <div className={className} role="status" aria-label="Page loading">
        {headerMarkup}
        <div className={styles.Content}>{children}</div>
      </div>
    );
  }
}

function renderSecondaryActions(actionCount: number) {
  const actions = [];
  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push(
      <div className={styles.Action} style={{width}} key={i}>
        <SkeletonBodyText lines={1} />
      </div>,
    );
  }
  return <div className={styles.Actions}>{actions}</div>;
}

function renderTitle(title: string) {
  const titleContent =
    title === '' ? (
      <SkeletonDisplayText size="large" />
    ) : (
      <DisplayText size="large" element="h1">
        {title}
      </DisplayText>
    );
  return <div className={styles.Title}>{titleContent}</div>;
}

export default withAppProvider<Props>()(SkeletonPage);
