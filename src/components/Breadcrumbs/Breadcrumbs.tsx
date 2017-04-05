import * as React from 'react';
import UnstyledLink from '../UnstyledLink';
import * as styles from './Breadcrumbs.scss';

export interface BreadcrumbDescriptor {
  text: string,
  to: string,
}

export interface Props {
  breadcrumbs: BreadcrumbDescriptor[],
}

export default function Breadcrumbs({breadcrumbs}: Props) {
  const breadcrumbsMarkup = breadcrumbs.map(({text, to}) => (
    <UnstyledLink key={text} to={to} className={styles.Breadcrumb}>
      {text}
    </UnstyledLink>
  ));

  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbsMarkup}
    </div>
  );
}
