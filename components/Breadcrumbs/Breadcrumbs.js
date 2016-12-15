// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Link from '../Link';

import styles from './Breadcrumbs.scss';

export type BreadcrumbDescriptor = {
  text: string,
  to?: string,
};

type Props = {
  breadcrumbs: BreadcrumbDescriptor[],
};

export default function Breadcrumbs({breadcrumbs}: Props) {
  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map(({text, to}) => (
        <Breadcrumb key={text} to={to}>{text}</Breadcrumb>
      ))}
    </div>
  );
}

type BreadcrumbProps = {
  children?: string,
  to?: string,
};

function Breadcrumb({to, children}: BreadcrumbProps) {
  if (to) {
    return (
      <Link to={to} className={classNames(styles.Breadcrumb, styles.link)}>
        {children}
      </Link>
    );
  }

  return <div className={styles.Breadcrumb}>{children}</div>;
}
