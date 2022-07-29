import type {ReactNode} from 'react';

import {Heading} from '../../../Heading';
import {TextContainer} from '../../../TextContainer';
import styles from '../../Layout.scss';

export interface AnnotatedSectionProps {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  id?: string;
}
/** @deprecated Annotated sections can be composed. See examples for styling */
export function AnnotatedSection(props: AnnotatedSectionProps) {
  const {children, title, description, id} = props;

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
