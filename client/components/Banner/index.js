import React, {PropTypes} from 'react';
import styles from './index.css';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import * as Statuses from '../shared/statuses';
import {css} from '../../utilities';

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

const STATUSES = [
  Statuses.info,
  Statuses.success,
  Statuses.warning,
  Statuses.critical,
];

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(STATUSES),
  children: PropTypes.node,
};

Banner.defaultProps = {

};

function classNameForBanner({status}) {
  return css([
    styles.Banner,
    status && styles[`status${status[0].toUpperCase()}${status.substring(1)}`],
  ]);
}
