import React from 'react';

import type {AvatarProps} from '../../../../../Avatar';
import type {ThumbnailProps} from '../../../../../Thumbnail';
import {classNames} from '../../../../../../utilities/css';

import styles from './Title.scss';

export interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Important and non-interactive status information shown immediately after the title. */
  titleMetadata?: React.ReactNode;
  /** thumbnail that precedes the title */
  thumbnail?:
    | React.ReactElement<AvatarProps | ThumbnailProps>
    | React.SFC<React.SVGProps<SVGSVGElement>>;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
}

export function Title({
  title,
  subtitle,
  titleMetadata,
  thumbnail,
  compactTitle,
}: TitleProps) {
  const titleMarkup = title ? <h1 className={styles.Title}>{title}</h1> : null;

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

  const thumbnailMarkup = thumbnail ? <div>{thumbnail}</div> : null;

  const pageTitleClassName = thumbnail ? styles.hasThumbnail : undefined;

  return (
    <div className={pageTitleClassName}>
      {thumbnailMarkup}
      <div className={styles.TitleAndSubtitleWrapper}>
        {wrappedTitleMarkup}
        {subtitleMarkup}
      </div>
    </div>
  );
}
