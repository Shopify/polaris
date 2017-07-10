import * as React from 'react';

import Icon from '../Icon';
import UnstyledLink from '../UnstyledLink';
import {LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import * as styles from './Breadcrumbs.scss';

export interface Props {
  breadcrumbs: LinkAction[],
}

export default class Breadcrumbs extends React.PureComponent<Props, never> {
  render() {
    const {breadcrumbs} = this.props;
    const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (breadcrumb == null) { return null; }

    const {content, url} = breadcrumb;

    return (
      <nav role="navigation">
        <UnstyledLink key={content} url={url} className={styles.Breadcrumb} onMouseUp={handleMouseUpByBlurring}>
          <span className={styles.Icon}><Icon source="chevronLeft" /></span>
          <span className={styles.Content}>{content}</span>
        </UnstyledLink>
      </nav>
    );
  }
}
