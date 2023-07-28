import React from 'react';

import {Box} from '../../../Box';
import {Text} from '../../../Text';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../../../TextContainer';
import {useFeatures} from '../../../../utilities/features';
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
  const {polarisSummerEditions2023} = useFeatures();
  const descriptionMarkup =
    // eslint-disable-next-line no-nested-ternary
    typeof description === 'string' ? (
      polarisSummerEditions2023 ? (
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      ) : (
        <p>{description}</p>
      )
    ) : (
      description
    );

  return (
    <div className={styles.AnnotatedSection}>
      <div className={styles.AnnotationWrapper}>
        <div className={styles.Annotation}>
          <TextContainer
            spacing={polarisSummerEditions2023 ? 'tight' : undefined}
          >
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
