import * as React from 'react';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Breadcrumbs.scss';

export interface Props {
  /** Collection of breadcrumbs */
  breadcrumbs: Array<CallbackAction | LinkAction>;
}

export default class Breadcrumbs extends React.PureComponent<Props, never> {
  render() {
    const {breadcrumbs} = this.props;
    const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (breadcrumb == null) {
      return null;
    }

    const {content} = breadcrumb;

    const contentMarkup = (
      <React.Fragment>
        <span className={styles.Icon}>
          <Icon source="chevronLeft" />
        </span>
        <span className={styles.Content}>{content}</span>
      </React.Fragment>
    );

    const breadcrumbMarkup =
      'url' in breadcrumb ? (
        <UnstyledLink
          key={content}
          url={breadcrumb.url}
          className={styles.Breadcrumb}
          onMouseUp={handleMouseUpByBlurring}
        >
          {contentMarkup}
        </UnstyledLink>
      ) : (
        <button
          key={content}
          className={styles.Breadcrumb}
          onClick={breadcrumb.onAction}
          onMouseUp={handleMouseUpByBlurring}
          type="button"
        >
          {contentMarkup}
        </button>
      );

    return <nav role="navigation">{breadcrumbMarkup}</nav>;
  }
}
