import React from 'react';

import {classNames} from '../../../../../../utilities/css';
import {Bleed} from '../../../../../Bleed';
import {Text} from '../../../../../Text';

import styles from './Title.module.scss';

export interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type */
  subtitle?: string;
  /** Important status information shown immediately after the title. */
  titleMetadata?: React.ReactNode;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
  /** Whether or not to add a max-width to the subtitle. Gets calculated by
   * the presence of either the secondaryActions or actionGroups props on the
   * Header that consumes this component */
  hasSubtitleMaxWidth?: boolean;
}

export function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
  hasSubtitleMaxWidth,
}: TitleProps) {
  const className = classNames(
    styles.Title,
    subtitle && styles.TitleWithSubtitle,
  );

  const titleMarkup = title ? <h1 className={className}>{title}</h1> : null;

  const titleMetadataMarkup = titleMetadata ? (
    <Bleed marginBlock="100">{titleMetadata}</Bleed>
  ) : null;

  const wrappedTitleMarkup = (
    <div className={styles.TitleWrapper}>
      {titleMarkup}
      {titleMetadataMarkup}
    </div>
  );

  const subtitleMarkup = subtitle ? (
    <div
      className={classNames(
        styles.SubTitle,
        compactTitle && styles.SubtitleCompact,
        hasSubtitleMaxWidth && styles.SubtitleMaxWidth,
      )}
    >
      <Text as="p" variant="bodySm">
        {subtitle}
      </Text>
    </div>
  ) : null;

  return (
    <>
      {wrappedTitleMarkup}
      {subtitleMarkup}
    </>
  );
}
