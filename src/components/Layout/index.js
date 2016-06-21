import React, {PropTypes} from 'react';
import styles from './index.css';

import Stack from '../Stack';

import {css} from '../../utilities/styles';

export default function Layout(props) {
  const {children} = props;

  return (
    <div className={classNameForLayout(props)}>
      <div className={styles.Content}>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool.isRequired,
};

Layout.defaultProps = {
  fullWidth: false,
};

function classNameForLayout({fullWidth}) {
  return css([
    styles.Layout,
    fullWidth && styles.fullWidth,
  ]);
}

function LayoutSection(props) {
  const {children} = props;
  return (
    <div className={classNameForSection(props)}>
      <Stack vertical>{children}</Stack>
    </div>
  );
}

Layout.Section = LayoutSection;

LayoutSection.propTypes = {children: PropTypes.node};

function classNameForSection({secondary}) {
  return css([
    styles.Section,
    secondary && styles.secondary,
  ]);
}
