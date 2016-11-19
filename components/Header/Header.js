// @flow

import React, {PropTypes} from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import styles from './Header.scss';

type Props = {
  children?: any,
  buttons?: React$Element<*>[],
  icon?: React$Element<*>,
  dark?: boolean,
  transparent?: boolean,
  withoutSidebarButton?: boolean,
};

type Context = {
  appActions: {toggleSidebar: () => void},
};

export default function Header({
  children,
  buttons,
  icon,
  dark,
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

  return (
    <div className={className}>
      {leftButton}

      {icon && (
        <div className={styles.Icon}>
          {icon}
        </div>
      )}

      <div className={styles.Content}>
        {children}
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
