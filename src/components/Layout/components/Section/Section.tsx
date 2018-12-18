import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from '../../Layout.scss';

export interface Props {
  children?: React.ReactNode;
  secondary?: boolean;
  fullWidth?: boolean;
  oneHalf?: boolean;
  oneThird?: boolean;
}

export default function Section({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird,
}: Props) {
  const className = classNames(
    styles.Section,
    secondary && styles['Section-secondary'],
    fullWidth && styles['Section-fullWidth'],
    oneHalf && styles['Section-oneHalf'],
    oneThird && styles['Section-oneThird'],
  );

  return <div className={className}>{children}</div>;
}
