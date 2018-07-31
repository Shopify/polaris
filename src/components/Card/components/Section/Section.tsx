import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Subheading from '../../../Subheading';

import * as styles from '../../Card.scss';

export interface Props {
  title?: string;
  children?: React.ReactNode;
  subdued?: boolean;
  fullWidth?: boolean;
}

export default function Section({children, title, subdued, fullWidth}: Props) {
  const headerContent = title ? (
    <div className={styles.SectionHeader}>
      <Subheading>{title}</Subheading>
    </div>
  ) : null;

  const className = classNames(
    styles.Section,
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
  );

  return (
    <div className={className}>
      {headerContent}
      {children}
    </div>
  );
}
