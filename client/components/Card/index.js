import React, {PropTypes, Children} from 'react';
import styles from './index.css';
import {css} from '../../utilities';

export default function Card(props) {
  const {children} = props;

  return (
    <div className={classNameForCard(props)}>
      {wrapChildrenInSections(children)}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

function wrapChildrenInSections(children) {
  // eslint-disable-next-line no-confusing-arrow
  return Children.map(children, (child, index) => (
    child.type === CardSection ? child : <CardSection key={index}>{child}</CardSection>
  ));
}

function classNameForCard({secondary}) {
  return css([
    styles.Card,
    secondary && styles.secondary,
  ]);
}

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
