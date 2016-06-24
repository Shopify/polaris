import React, {PropTypes} from 'react';
import styles from './Heading.scss';

export default function Heading({level, ...rest}) {
  rest.className = styles.Heading;

  return level === 2
    ? <h2 {...rest} />
    : <h3 {...rest} />;
}

Heading.propTypes = {
  level: PropTypes.oneOf([2, 3]).isRequired,
  children: PropTypes.node,
};

Heading.defaultProps = {
  level: 2,
};
