import React from 'react';

import {Box} from '../../../Box';
import {Text} from '../../../Text';
import styles from '../../Layout.scss';
import {BlockStack} from '../../../BlockStack';

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
          <BlockStack gap="2">
            <Text id={id} variant="headingMd" as="h2">
              {title}
            </Text>
            {descriptionMarkup && (
              <Box color="text-subdued">{descriptionMarkup}</Box>
            )}
          </BlockStack>
        </div>

        <div className={styles.AnnotationContent}>{children}</div>
      </div>
    </div>
  );
}
