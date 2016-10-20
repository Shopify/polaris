// @flow

import React, {Children} from 'react';

import Heading from '../Heading';
import Subheading from '../Subheading';
import TypeContainer from '../TypeContainer';

import {css} from '../../utilities/styles';

import styles from './index.scss';

type Props = {
  title?: any,
  children?: any,
  tablist?: any,
  secondary?: boolean,
  withoutSectioning?: boolean,
};

export default function Card(props: Props) {
  const {children, title, tablist, withoutSectioning} = props;

  return (
    <div className={classNameForCard(props)} data-quilt-container>
      {tablist}
      {title ? <CardHeader>{title}</CardHeader> : null}
      {withoutSectioning ? children : wrapChildrenInSections(children)}
    </div>
  );
}

function wrapChildrenInSections(children) {
  const isPreSectioned = Children
    .toArray(children)
    .some((child) => child.type && child.type.name === CardSection.name);

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
  const isTextContent = Children
    .toArray(children)
    .every((child) => child.type === 'p');

  return (
    <div className={styles.Section}>
      {title ? <CardSectionHeader>{title}</CardSectionHeader> : null}
      {isTextContent ? <TypeContainer>{children}</TypeContainer> : children}
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
