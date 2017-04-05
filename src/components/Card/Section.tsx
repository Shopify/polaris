import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Subheading from '../Subheading';

import * as styles from './Card.scss';

export interface Props {
  title?: React.ReactNode,
  children?: React.ReactNode,
  subdued?: boolean,
}

export default function Section({children, title, subdued}: Props) {
  const headerContent = title
    ? (
      <div className={styles.SectionHeader}>
        <Subheading>{title}</Subheading>
      </div>
    )
    : null;

  const className = classNames(styles.Section, subdued && styles.subdued);

  return (
    <div className={className}>
      {headerContent}
      {children}
    </div>
  );
}
