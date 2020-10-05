import React from 'react';

import {DisplayText} from '../../../../../DisplayText';
import {TextStyle} from '../../../../../TextStyle';
import type {AvatarProps} from '../../../../../Avatar';
import type {ThumbnailProps} from '../../../../../Thumbnail';
import {classNames} from '../../../../../../utilities/css';
import {useFeatures} from '../../../../../../utilities/features';
import {useMediaQuery} from '../../../../../../utilities/media-query';

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
}

export function Title({title, subtitle, titleMetadata, thumbnail}: TitleProps) {
  const {newDesignLanguage} = useFeatures();
  const {isNavigationCollapsed} = useMediaQuery();
  const displaySize = isNavigationCollapsed ? 'large' : 'small';
  const titleMarkup = title ? (
    <div className={styles.Title}>
      <DisplayText
        size={newDesignLanguage ? displaySize : 'large'}
        element="h1"
      >
        <TextStyle variation="strong">{title}</TextStyle>
      </DisplayText>
    </div>
  ) : null;

  const titleMetadataMarkup = titleMetadata ? (
    <div
      className={classNames(
        styles.TitleMetadata,
        newDesignLanguage && styles.newDesignLanguage,
      )}
    >
      {titleMetadata}
    </div>
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
    <div className={styles.SubTitle}>
      <p>{subtitle}</p>
    </div>
  ) : null;

  const thumbnailMarkup = thumbnail ? <div>{thumbnail}</div> : null;

  const pageTitleClassName = thumbnail
    ? classNames(styles.hasThumbnail)
    : undefined;

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
