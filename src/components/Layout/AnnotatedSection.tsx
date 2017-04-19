import * as React from 'react';
import Heading from '../Heading';
import TextContainer from '../TextContainer';
import * as styles from './Layout.scss';

export interface Props {
  children?: React.ReactNode,
  title?: string,
  description?: React.ReactNode,
}

export default function AnnotatedSection(props: Props) {
  const {children, title, description} = props;
  const wrappedDescription = typeof description === 'string'
    ? <p>{description}</p>
    : description;

  return (
    <div className={styles.AnnotatedSection}>
      <div className={styles.AnnotationWrapper}>
        <div className={styles.Annotation}>
          <TextContainer>
            <Heading>{title}</Heading>
            {wrappedDescription}
          </TextContainer>
        </div>

        <div className={styles.AnnotationContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
