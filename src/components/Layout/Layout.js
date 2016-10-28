// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent, isElementOfType, elementChildren} from '@shopify/react-utilities/components';

import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import styles from './Layout.scss';

type Props = {
  children?: any,
  fullWidth?: boolean,
};

const SECTION_COMPONENTS = [LayoutSection, AnnotatedSection];

export default function Layout({children, fullWidth}: Props) {
  const className = classNames(
    styles.Layout,
    fullWidth && styles.fullWidth,
  );

  return (
    <div className={className}>
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

type SectionProps = {
  children?: any,
  secondary?: boolean,
};

function LayoutSection({children, secondary}: SectionProps) {
  const className = classNames(
    styles.Section,
    secondary && styles.secondary,
  );

  return (
    <div className={className}>
      {children}
    </div>
  );
}

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
