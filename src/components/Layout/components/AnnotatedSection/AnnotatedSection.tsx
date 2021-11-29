import React from 'react';

import {wrapWithComponent} from '../../../../utilities/components';
import {classNames} from '../../../../utilities/css';
import {Heading} from '../../../Heading';
import {TextContainer} from '../../../TextContainer';
import styles from '../../Layout.scss';

export interface AnnotatedSectionProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  stacked?: boolean;
}

export function AnnotatedSection(props: AnnotatedSectionProps) {
  const {children, title, description, id, stacked} = props;

  const descriptionMarkup =
    typeof description === 'string' ? <p>{description}</p> : description;

  const annotation = (
    <>
      <Heading id={id}>{title}</Heading>
      {descriptionMarkup && (
        <div className={styles.AnnotationDescription}>{descriptionMarkup}</div>
      )}
    </>
  );

  const annotationMarkup = stacked
    ? annotation
    : wrapWithComponent(annotation, TextContainer, {});

  const annotationWrapperClasses = classNames(
    styles.AnnotationWrapperBase,
    stacked ? styles.StackedAnnotationWrapper : styles.AnnotationWrapper,
  );

  return (
    <div className={styles.AnnotatedSection}>
      <div className={annotationWrapperClasses}>
        <div className={styles.Annotation}>{annotationMarkup}</div>
        <div className={styles.AnnotationContent}>{children}</div>
      </div>
    </div>
  );
}
