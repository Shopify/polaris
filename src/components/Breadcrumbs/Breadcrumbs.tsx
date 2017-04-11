import * as React from 'react';
import UnstyledLink from '../UnstyledLink';
import {LinkAction} from '../types';
import * as styles from './Breadcrumbs.scss';

export interface Props {
  breadcrumbs: LinkAction[],
}

export default function Breadcrumbs({breadcrumbs}: Props) {
  const breadcrumbsMarkup = breadcrumbs.map(({content, url}) => (
    <UnstyledLink key={content} url={url} className={styles.Breadcrumb}>
      {content}
    </UnstyledLink>
  ));

  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbsMarkup}
    </div>
  );
}
