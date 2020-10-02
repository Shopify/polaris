import React, {useContext} from 'react';

import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';
import {Stack} from '../../../Stack';
import {Caption} from '../../../Caption';
import {TextStyle} from '../../../TextStyle';
import {uploadArrow} from '../../images';
import {DropZoneContext} from '../../context';
import {useI18n} from '../../../../utilities/i18n';
import {useFeatures} from '../../../../utilities/features';

import styles from './FileUpload.scss';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

export function FileUpload(props: FileUploadProps) {
  const i18n = useI18n();
  const {newDesignLanguage} = useFeatures();
  const {size, measuring, type, focused, disabled} = useContext(
    DropZoneContext,
  );
  const suffix = capitalize(type);
  const {
    actionTitle = i18n.translate(
      `Polaris.DropZone.FileUpload.actionTitle${suffix}`,
    ),
    actionHint = i18n.translate(
      `Polaris.DropZone.FileUpload.actionHint${suffix}`,
    ),
  } = props;

  const buttonStyles =
    size === 'extraLarge' || size === 'large'
      ? classNames(
          styles.Button,
          newDesignLanguage && styles.newDesignLanguage,
          size && size !== 'extraLarge' && styles.slim,
          focused && styles.focused,
          disabled && styles.disabled,
        )
      : null;

  const buttonMarkup =
    (size === 'extraLarge' || size === 'large') && buttonStyles ? (
      <div testID="Button" className={buttonStyles}>
        {actionTitle}
      </div>
    ) : null;

  const actionTitleClassName = classNames(
    styles.ActionTitle,
    focused && !disabled && styles['ActionTitle-focused'],
    disabled && styles['ActionTitle-disabled'],
  );

  const actionTitleMarkup = (
    <div testID="Link" className={actionTitleClassName}>
      {actionTitle}
    </div>
  );

  const fileUploadClassName = classNames(
    styles.FileUpload,
    newDesignLanguage && styles.newDesignLanguage,
    measuring && styles.measuring,
    size === 'small' && styles.FileUploadSmallView,
  );

  let viewMarkup;
  switch (size) {
    case 'extraLarge':
      viewMarkup = (
        <Stack vertical>
          <img width="40" src={uploadArrow} alt="" />
          {buttonMarkup}
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Stack>
      );
      break;
    case 'large':
      viewMarkup = (
        <Stack vertical spacing="tight">
          <img width="40" src={uploadArrow} alt="" />
          {buttonMarkup}
          <Caption>
            <TextStyle variation="subdued">{actionHint}</TextStyle>
          </Caption>
        </Stack>
      );
      break;
    case 'medium':
      viewMarkup = (
        <Stack vertical spacing="tight">
          {actionTitleMarkup}
          <Caption>
            <TextStyle variation="subdued">{actionHint}</TextStyle>
          </Caption>
        </Stack>
      );
      break;
    case 'small':
      viewMarkup = <img width="20" src={uploadArrow} alt="" />;
      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
