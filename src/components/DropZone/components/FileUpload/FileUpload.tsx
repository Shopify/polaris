import React, {useContext} from 'react';
import {DragDropMajorMonotone} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';
import {Icon} from '../../../Icon';
import {Stack} from '../../../Stack';
import {Caption} from '../../../Caption';
import {TextStyle} from '../../../TextStyle';

import {fileUpload, imageUpload} from '../../images';

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
  const {unstableGlobalTheming} = useFeatures();
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

  const imageClasses = classNames(
    styles.Image,
    size && size === 'extraLarge' && styles.sizeExtraLarge,
    size && size === 'large' && styles.sizeLarge,
  );

  const buttonStyles =
    size === 'extraLarge' || size === 'large'
      ? classNames(
          styles.Button,
          unstableGlobalTheming && styles.globalTheming,
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

  const extraLargeView =
    size === 'extraLarge' ? (
      <Stack vertical>
        {type === 'file' && (
          <img className={imageClasses} src={fileUpload} alt="" />
        )}
        {type === 'image' && (
          <img className={imageClasses} src={imageUpload} alt="" />
        )}
        {buttonMarkup}
        <TextStyle variation="subdued">{actionHint}</TextStyle>
      </Stack>
    ) : null;

  const largeView =
    size === 'large' ? (
      <Stack vertical spacing="tight">
        {type === 'file' && (
          <img className={imageClasses} src={fileUpload} alt="" />
        )}
        {type === 'image' && (
          <img className={imageClasses} src={imageUpload} alt="" />
        )}
        {buttonMarkup}
        <Caption>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Caption>
      </Stack>
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

  const mediumView =
    size === 'medium' ? (
      <Stack vertical spacing="tight">
        {actionTitleMarkup}
        <Caption>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Caption>
      </Stack>
    ) : null;

  const smallView =
    size === 'small' ? (
      <Stack vertical spacing="tight">
        <Icon source={DragDropMajorMonotone} color="inkLightest" />
      </Stack>
    ) : null;

  const fileUploadClassName = classNames(
    styles.FileUpload,
    unstableGlobalTheming && styles.globalTheming,
    measuring && styles.measuring,
  );

  return (
    <div className={fileUploadClassName}>
      {smallView}
      {mediumView}
      {largeView}
      {extraLargeView}
    </div>
  );
}
