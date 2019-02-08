import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import DisplayText from '../DisplayText';
import SkeletonDisplayText from '../SkeletonDisplayText';
import SkeletonBodyText from '../SkeletonBodyText';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import styles from './SkeletonPage.scss';

export interface Props {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  singleColumn?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
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
      singleColumn,
      primaryAction,
      secondaryActions,
      title = '',
      breadcrumbs,
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
      singleColumn && styles.singleColumn,
    );

    const headerClassName = classNames(
      styles.Header,
      breadcrumbs && styles['Header-hasBreadcrumbs'],
      secondaryActions && styles['Header-hasSecondaryActions'],
    );

    const titleMarkup = title !== null ? renderTitle(title) : null;

    const primaryActionMarkup = primaryAction ? (
      <div className={styles.PrimaryAction}>
        <SkeletonDisplayText size="large" />
      </div>
    ) : null;

    const secondaryActionsMarkup = secondaryActions
      ? renderSecondaryActions(secondaryActions)
      : null;

    const breadcrumbMarkup = breadcrumbs ? (
      <div className={styles.BreadcrumbAction} style={{width: 60}}>
        <SkeletonBodyText lines={1} />
      </div>
    ) : null;

    const headerMarkup = !this.props.polaris.appBridge ? (
      <div className={headerClassName}>
        {breadcrumbMarkup}
        <div className={styles.TitleAndPrimaryAction}>
          {titleMarkup}
          {primaryActionMarkup}
        </div>
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
