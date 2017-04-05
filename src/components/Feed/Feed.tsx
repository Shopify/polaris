import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import Subheading from '../Subheading';
import TypeStyle from '../TypeStyle';
import Stack from '../Stack';

import * as styles from './Feed.scss';

export type TopicType = 'updates' | 'advice' | 'insights' | 'blog' | 'account' | 'sales' | 'engagement' | 'growth' | 'social';

export interface Props {
  children?: React.ReactNode,
};

export default class Feed extends React.Component<Props, {}> {
  static Section = Section;
  static Badge = Badge;
  static Marker = Marker;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
      <div className={styles.Feed}>
        {children}
      </div>
    );
  }
}

export interface SectionProps {
  children?: React.ReactNode,
  topic?: TopicType,
  title: React.ReactNode,
}

export function Section({children, title, topic}: SectionProps) {
  return (
    <div className={styles.Section}>
      <div className={styles.SectionHeader}>
        <div className={styles.SectionBadge}>{<Badge topic={topic} />}</div>
        <Subheading><TypeStyle variation="subdued">{title}</TypeStyle></Subheading>
      </div>

      <div className={styles.SectionContent}>
        <Stack vertical wrap={false}>{children}</Stack>
      </div>
    </div>
  );
}

export interface MarkerProps {
  children?: React.ReactNode,
};

export function Marker({children}: MarkerProps) {
  return (
    <div className={styles.Marker}>{children}</div>
  );
}

export interface BadgeProps {
  topic?: TopicType,
}

export function Badge({topic}: BadgeProps) {
  const className = classNames(
    styles.Badge,
    topic && styles[variationName('topic', topic)],
  );

  return (
    <div className={className} />
  );
}
