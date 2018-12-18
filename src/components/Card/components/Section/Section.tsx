import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Subheading from '../../../Subheading';

import * as styles from '../../Card.scss';

export interface Props {
  title?: React.ReactNode;
  children?: React.ReactNode;
  subdued?: boolean;
  fullWidth?: boolean;
}

export default function Section({children, title, subdued, fullWidth}: Props) {
  const className = classNames(
    styles.Section,
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
  );

  let headerMarkup = null;
  if (title) {
    const headerContent =
      typeof title === 'string' ? <Subheading>{title}</Subheading> : title;
    headerMarkup = <div className={styles.SectionHeader}>{headerContent}</div>;
  }

  return (
    <div className={className}>
      {headerMarkup}
      {children}
    </div>
  );
}
