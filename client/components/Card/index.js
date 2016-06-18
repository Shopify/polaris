import React, {PropTypes} from 'react';
import styles from './index.css';
import {css} from '../../utilities';

export default function Card(props) {
  const {children} = props;

  return (
    <div className={classNameForCard(props)}>
      <CardSection>
        {children}
      </CardSection>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

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
