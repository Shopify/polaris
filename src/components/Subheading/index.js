import React, {PropTypes} from 'react';
import styles from './index.scss';

export default function Subheading({level, ...rest}) {
  rest.className = styles.Subheading;

  return level === 3
    ? <h3 {...rest} />
    : <h4 {...rest} />;
}

Subheading.propTypes = {
  level: PropTypes.oneOf([3, 4]).isRequired,
  children: PropTypes.node,
};

Subheading.defaultProps = {
  level: 3,
};
