import React, {PropTypes} from 'react';
import styles from './index.css';

import Icon from '../Icon';
import Heading from '../Heading';
import TypeContainer from '../TypeContainer';

import {Status} from '../shared';
import {css} from '../../utilities/styles';

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
  Status.info,
  Status.success,
  Status.warning,
  Status.critical,
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
