// @flow

import React, {PropTypes} from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Breadcrumbs from '../Breadcrumbs';
import type {BreadcrumbDescriptor} from '../Breadcrumbs';

import styles from './Header.scss';

type Props = {
  children?: any,
  buttons?: React$Element<*>[],
  icon?: React$Element<*>,
  dark?: boolean,
  transparent?: boolean,
  withoutSidebarButton?: boolean,
  breadcrumbs?: BreadcrumbDescriptor[],
};

type Context = {
  appActions: {toggleSidebar: () => void},
};

export default function Header({
  children,
  buttons,
  icon,
  dark,
  breadcrumbs,
  transparent,
  withoutSidebarButton,
}: Props, {
  appActions: {toggleSidebar},
}: Context) {
  const leftButton = withoutSidebarButton
    ? null
    : (
      <div className={styles.LeftButton}>
        <Button onClick={toggleSidebar}>Sidebar</Button>
      </div>
    );

  const className = classNames(
    styles.Header,
    dark && styles.dark,
    transparent && styles.transparent,
  );

  const content = breadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : children;

  return (
    <div className={className}>
      {leftButton}

      {icon && (
        <div className={styles.Icon}>
          {icon}
        </div>
      )}

      <div className={styles.Content}>
        {content}
      </div>

      {buttons && (
        <div className={styles.Buttons}>
          <ButtonGroup>{buttons}</ButtonGroup>
        </div>
      )}
    </div>
  );
}

Header.contextTypes = {
  appActions: PropTypes.shape({
    toggleSidebar: PropTypes.func,
  }),
};
