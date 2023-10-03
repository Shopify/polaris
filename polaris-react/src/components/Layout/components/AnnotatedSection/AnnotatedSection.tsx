import React from 'react';

import {Box} from '../../../Box';
import {Text} from '../../../Text';
// eslint-disable-next-line import/no-deprecated
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
    typeof description === 'string' ? (
      <Text as="p" variant="bodyMd">
        {description}
      </Text>
    ) : (
      description
    );

  return (
    <div className={styles.AnnotatedSection}>
      <div className={styles.AnnotationWrapper}>
        <div className={styles.Annotation}>
          <TextContainer spacing="tight">
            <Text id={id} variant="headingMd" as="h2">
              {title}
            </Text>
            {descriptionMarkup && (
              <Box color="text-secondary">{descriptionMarkup}</Box>
            )}
          </TextContainer>
        </div>

        <div className={styles.AnnotationContent}>{children}</div>
      </div>
    </div>
  );
}
