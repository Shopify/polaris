import * as React from 'react';

import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import * as styles from './Layout.scss';

export interface Props {
  children?: any,
  title?: any,
  description?: any,
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
          <Heading>{title}</Heading>
          <TypeContainer>
            {wrappedDescription}
          </TypeContainer>
        </div>

        <div className={styles.AnnotationContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
