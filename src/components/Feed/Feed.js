// @flow

import React from 'react';

import Subheading from '../Subheading';
import Stack from '../Stack';

import {wrapWithComponent} from '../../utilities/react';
import {css, variation} from '../../utilities/styles';

import styles from './Feed.scss';

type TopicType = 'updates' | 'advice' | 'insights' | 'blog' | 'account' | 'sales' | 'engagement' | 'growth' | 'social';

type Props = {
  children?: any,
};

export default function Feed({children}: Props) {
  return (
    <div className={styles.Feed}>
      {children}
    </div>
  );
}

type SectionProps = {
  children?: any,
  topic?: TopicType,
  title: any,
};

function Section({children, title, topic}: SectionProps) {
  return (
    <div className={styles.Section}>
      <div className={styles.SectionHeader}>
        <div className={styles.SectionBadge}>{<Badge topic={topic} />}</div>
        {wrapWithComponent(title, Subheading, {subdued: true})}
      </div>

      <div className={styles.SectionContent}>
        <Stack vertical wrap={false}>{children}</Stack>
      </div>
    </div>
  );
}

type MarkerProps = {
  children?: any,
};

function Marker({children}: MarkerProps) {
  return (
    <div className={styles.Marker}>{children}</div>
  );
}

type BadgeProps = {
  topic?: TopicType,
};

function Badge(props: BadgeProps) {
  return (
    <div className={classNameForBadge(props)} />
  );
}

function classNameForBadge({topic}: BadgeProps) {
  return css([
    styles.Badge,
    topic && styles[variation('topic', topic)],
  ]);
}

Feed.Section = Section;
Feed.Badge = Badge;
Feed.Marker = Marker;
