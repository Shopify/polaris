import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import * as styles from './Banner.scss';

export type Status = 'success' | 'subdued' | 'info' | 'success' | 'attention' | 'warning' | 'critical';

export interface Props {
  title: string,
  status?: Status,
  children?: React.ReactNode,
}

export default function Banner({title, children, status}: Props) {
  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
  );

  return (
    <div className={className}>
      <div className={styles.BannerRibbon}>
        <Icon source="placeholder" />
      </div>
      <div className={styles.BannerContent}>
        <TypeContainer>
          <Heading>{title}</Heading>
          {children}
        </TypeContainer>
      </div>
    </div>
  );
}
