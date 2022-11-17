import React from 'react';

import {Box} from '../../../Box';
import {Text} from '../../../Text';
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
            <Text id={id} variant="headingMd" as="h2">
              {title}
            </Text>
            {descriptionMarkup && (
              <Box color="text-subdued">{descriptionMarkup}</Box>
            )}
          </TextContainer>
        </div>

        <div className={styles.AnnotationContent}>{children}</div>
      </div>
    </div>
  );
}
