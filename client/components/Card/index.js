import React, {PropTypes, Children} from 'react';
import styles from './index.css';

import Heading from '../Heading';
import {css} from '../../utilities';

export default function Card(props) {
  const {children, title} = props;

  return (
    <div className={classNameForCard(props)}>
      {title ? <CardHeader>{title}</CardHeader> : null}
      {wrapChildrenInSections(children)}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

function wrapChildrenInSections(children) {
  const isPreSectioned = Children
    .toArray(children)
    .some((child) => child.type === CardSection);

  // eslint-disable-next-line no-confusing-arrow
  return isPreSectioned ? children : <CardSection>{children}</CardSection>;
}

function classNameForCard({secondary}) {
  return css([
    styles.Card,
    secondary && styles.secondary,
  ]);
}

function CardHeader({children}) {
  return (
    <div className={styles.Header}>
      <Heading>{children}</Heading>
    </div>
  );
}

CardHeader.propTypes = {children: PropTypes.node};

function CardSection({children}) {
  return (
    <div className={styles.Section}>
      {children}
    </div>
  );
}

Card.Section = CardSection;

CardSection.propTypes = {
  children: PropTypes.node,
};
