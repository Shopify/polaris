import React, {PropTypes} from 'react';
import styles from './Banner.scss';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import {Status} from '../shared';
import {css, variation} from '../../utilities/styles';

export default function Banner(props) {
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

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    Status.info,
    Status.success,
    Status.warning,
    Status.critical,
  ]),
  children: PropTypes.node,
};

function classNameForBanner({status}) {
  return css([
    styles.Banner,
    status && styles[variation('status', status)],
  ]);
}
