// @flow

import React from 'react';

import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import {css} from '../../utilities/styles';
import {wrapWithComponent, isElementOfType, elementChildren} from '../../utilities/react';

import styles from './Layout.scss';

type Props = {
  children?: any,
  fullWidth?: boolean,
};

const SECTION_COMPONENTS = [LayoutSection, AnnotatedSection];

export default function Layout(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForLayout(props)}>
      <div className={styles.Content}>
        {elementChildren(children).map((child) => {
          if (isElementOfType(child, SECTION_COMPONENTS)) {
            return child;
          } else {
            return <LayoutSection>{child}</LayoutSection>;
          }
        })}
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
  secondary?: boolean,
};

function LayoutSection(props: SectionProps) {
  const {children} = props;
  return (
    <div className={classNameForSection(props)}>
      {children}
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
