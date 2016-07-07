// @flow

import React, {Children} from 'react';
import styles from './index.scss';

import Heading from '../Heading';
import Subheading from '../Subheading';

import {css} from '../../utilities/styles';

type Props = {
  title?: any,
  children?: any,
  tablist?: any,
  secondary?: boolean,
};

export default function Card(props: Props) {
  const {children, title, tablist} = props;

  return (
    <div className={classNameForCard(props)} data-quilt-container>
      {tablist}
      {title ? <CardHeader>{title}</CardHeader> : null}
      {wrapChildrenInSections(children)}
    </div>
  );
}

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

type CardHeaderProps = {
  children?: any,
};

function CardHeader({children}: CardHeaderProps) {
  return (
    <div className={styles.Header}>
      <Heading>{children}</Heading>
    </div>
  );
}

type CardSectionProps = {
  title?: any,
  children?: any,
};

function CardSection({children, title}: CardSectionProps) {
  return (
    <div className={styles.Section}>
      {title ? <CardSectionHeader>{title}</CardSectionHeader> : null}
      {children}
    </div>
  );
}

Card.Section = CardSection;

type CardSectionHeaderProps = {
  children?: any,
};

function CardSectionHeader({children}: CardSectionHeaderProps) {
  return (
    <div className={styles.SectionHeader}>
      <Subheading>{children}</Subheading>
    </div>
  );
}
