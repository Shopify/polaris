import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import DisplayText from '../DisplayText';
import SkeletonDisplayText from '../SkeletonDisplayText';
import SkeletonBodyText from '../SkeletonBodyText';

import * as styles from './SkeletonPage.scss';

export interface Props {
  children?: React.ReactNode,
  fullWidth?: boolean,
  secondaryActions?: number,
  title?: string,
}

export default class SkeletonPage extends React.PureComponent<Props, never> {
  render() {
    const {
      children,
      fullWidth,
      secondaryActions,
      title = '',
    } = this.props;

    const className = classNames(
      styles.Page,
      fullWidth && styles.fullWidth,
    );

    const headerClassName = classNames(
      styles.Header,
      secondaryActions && styles['Header-hasSecondaryActions'],
    );

    const titleMarkup = title !== null
      ? renderTitle(title)
      : null;

    const secondaryActionsMarkup = secondaryActions
      ? renderSecondaryActions(secondaryActions)
      : null;

    const headerMarkup = !this.context.easdk
      ? <div className={headerClassName}>
          {titleMarkup}
          {secondaryActionsMarkup}
        </div>
      : null;

    return (
      <div className={className} role="status" aria-label="Page loading">
        {headerMarkup}
        <div className={styles.Content}>
          {children}
        </div>
      </div>
    );
  }
}

function renderSecondaryActions(actionCount: number) {
  const actions = [];
  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push(<div className={styles.Action} style={{width}} key={i}><SkeletonBodyText lines={1} /></div>);
  }
  return <div className={styles.Actions}>{actions}</div>;
}

function renderTitle(title: string) {
  const titleContent = title === ''
    ? <SkeletonDisplayText size="large" />
    : <DisplayText size="large" element="h1">{title}</DisplayText>;
  return <div className={styles.Title}>{titleContent}</div>;
}
