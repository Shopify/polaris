// @flow

import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import styles from './Banner.scss';

type Props = {
  title: string,
  status?: 'success' | 'subdued' | 'info' | 'success' | 'attention' | 'warning' | 'critical',
  children?: any,
};

export default function Banner({title, children, status}: Props) {
  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
  );

  return (
    <div className={className}>
      <div className={styles.BannerRibbon}>
        <Icon />
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
