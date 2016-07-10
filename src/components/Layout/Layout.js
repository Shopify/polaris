// @flow

import React from 'react';
import styles from './Layout.scss';

import Stack from '../Stack';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import {css} from '../../utilities/styles';
import {wrapWithComponent} from '../../utilities/react';

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

type AnnotatedSectionProps = {
  children?: any,
  title?: any,
  description?: any,
};

function AnnotatedSection(props: AnnotatedSectionProps) {
  const {children, title, description} = props;
  const wrappedDescription = typeof description === 'string'
    ? <p>{description}</p>
    : description;

  return (
    <div className={styles.AnnotatedSection}>
      <div className={styles.AnnotationWrapper}>
        <div className={styles.Annotation}>
          {wrapWithComponent(title, Heading)}
          {wrapWithComponent(wrappedDescription, TypeContainer, {subdued: true})}
        </div>

        <div className={styles.AnnotationContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

Layout.AnnotatedSection = AnnotatedSection;

function classNameForSection({secondary}) {
  return css([
    styles.Section,
    secondary && styles.secondary,
  ]);
}
