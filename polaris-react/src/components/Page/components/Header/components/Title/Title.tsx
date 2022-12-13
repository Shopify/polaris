import React, {ReactNode} from 'react';

import {classNames} from '../../../../../../utilities/css';

import styles from './Title.scss';

export interface TitleProps {
  /** Page title, in large type */
  title?: ReactNode;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Important and non-interactive status information shown immediately after the title. */
  titleMetadata?: ReactNode;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
}

export function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle,
}: TitleProps) {
  const className = classNames(
    styles.Title,
    subtitle && styles.TitleWithSubtitle,
  );

  const TitleElement = typeof title === 'string' ? 'h1' : 'div';
  const titleMarkup = title ? (
    <TitleElement className={className}>{title}</TitleElement>
  ) : null;

  const titleMetadataMarkup = titleMetadata ? (
    <div className={styles.TitleMetadata}>{titleMetadata}</div>
  ) : null;

  const wrappedTitleMarkup = titleMetadata ? (
    <div className={styles.TitleWithMetadataWrapper}>
      {titleMarkup}
      {titleMetadataMarkup}
    </div>
  ) : (
    titleMarkup
  );

  const subtitleMarkup = subtitle ? (
    <div
      className={classNames(
        styles.SubTitle,
        compactTitle && styles.SubtitleCompact,
      )}
    >
      <p>{subtitle}</p>
    </div>
  ) : null;

  return (
    <>
      {wrappedTitleMarkup}
      {subtitleMarkup}
    </>
  );
}
