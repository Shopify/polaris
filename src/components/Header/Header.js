// @flow

import React, {PropTypes} from 'react';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import {css} from '../../utilities/styles';

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

export default function Header(props: Props, {appActions: {toggleSidebar}}: Context) {
  const {children, buttons, icon, withoutSidebarButton} = props;

  const leftButton = withoutSidebarButton
    ? null
    : (
      <div className={styles.LeftButton}>
        <Button onClick={toggleSidebar}>Sidebar</Button>
      </div>
    );

  return (
    <div className={classNameForHeader(props)}>
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

function classNameForHeader({dark, transparent}: Props) {
  return css([
    styles.Header,
    dark && styles.dark,
    transparent && styles.transparent,
  ]);
}
