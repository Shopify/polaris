import React from 'react';

import {Heading} from '../../../Heading';
import {TextContainer} from '../../../TextContainer';
import styles from '../../Layout.scss';

export interface AnnotatedSectionProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
}

export function AnnotatedSection({
  children,
  title,
  description,
  id,
}: AnnotatedSectionProps) {
  const descriptionMarkup =
    typeof description === 'string' ? <p>{description}</p> : description;

  return (
    <div className={styles.AnnotatedSection}>
      <div className={styles.AnnotationWrapper}>
        <div className={styles.Annotation}>
          <TextContainer>
            <Heading id={id}>{title}</Heading>
            {descriptionMarkup && (
              <div className={styles.AnnotationDescription}>
                {descriptionMarkup}
              </div>
            )}
          </TextContainer>
        </div>

        <div className={styles.AnnotationContent}>{children}</div>
      </div>
    </div>
  );
}
