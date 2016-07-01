// @flow

import React from 'react';
import styles from './Banner.scss';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import {css, variation} from '../../utilities/styles';

type Props = {
  title: string,
  status?: 'success' | 'subdued' | 'info' | 'success' | 'attention' | 'warning' | 'critical',
  children?: any,
};

export default function Banner(props: Props) {
  const {title, children} = props;

  return (
    <div className={classNameForBanner(props)}>
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

function classNameForBanner({status}) {
  return css([
    styles.Banner,
    status && styles[variation('status', status)],
  ]);
}
