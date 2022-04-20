import React from 'react';

import {Heading} from '../../../Heading';
import {TextContainer} from '../../../TextContainer';
import styles from '../../Layout.scss';
import {Section} from '../Section';

export interface AnnotatedSectionProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
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
    <>
      <Section secondary>
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
      </Section>

      <Section>{children}</Section>
    </>
  );
}
