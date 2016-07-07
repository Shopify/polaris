// @flow

import React from 'react';
import styles from './Layout.scss';

import Stack from '../Stack';

import {css} from '../../utilities/styles';

type Props = {
  children?: any,
  fullWidth: boolean,
};

export default function Layout(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForLayout(props)}>
      <div className={styles.Content}>
        {children}
      </div>
    </div>
  );
}

Layout.defaultProps = {
  fullWidth: false,
};

function classNameForLayout({fullWidth}) {
  return css([
    styles.Layout,
    fullWidth && styles.fullWidth,
  ]);
}

type SectionProps = {
  children?: any,
  secondary: boolean,
};

function LayoutSection(props: SectionProps) {
  const {children} = props;
  return (
    <div className={classNameForSection(props)}>
      <Stack vertical>{children}</Stack>
    </div>
  );
}

LayoutSection.defaultProps = {secondary: false};
Layout.Section = LayoutSection;

function classNameForSection({secondary}) {
  return css([
    styles.Section,
    secondary && styles.secondary,
  ]);
}
