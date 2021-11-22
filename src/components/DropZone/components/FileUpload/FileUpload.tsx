import React, {useContext} from 'react';

import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';
import {Stack} from '../../../Stack';
import {Caption} from '../../../Caption';
import {TextStyle} from '../../../TextStyle';
import {uploadArrow} from '../../images';
import {DropZoneContext} from '../../context';
import {useI18n} from '../../../../utilities/i18n';
import {createAllowMultipleKey} from '../../utils';

import styles from './FileUpload.scss';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

export function FileUpload(props: FileUploadProps) {
  const i18n = useI18n();
  const {size, measuring, type, focused, disabled, allowMultiple} = useContext(
    DropZoneContext,
  );

  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);

  const {
    actionTitle = i18n.translate(
      `Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`,
    ),
    actionHint = i18n.translate(
      `Polaris.DropZone.${allowMultipleKey}.actionHint${typeSuffix}`,
    ),
  } = props;

  const buttonStyles = classNames(
    styles.Button,
    styles.slim,
    focused && styles.focused,
    disabled && styles.disabled,
  );

  const buttonMarkup =
    size === 'large' && buttonStyles ? (
      <div className={buttonStyles}>{actionTitle}</div>
    ) : null;

  const actionTitleClassName = classNames(
    styles.ActionTitle,
    focused && !disabled && styles['ActionTitle-focused'],
    disabled && styles['ActionTitle-disabled'],
  );

  const actionTitleMarkup = (
    <div className={actionTitleClassName}>{actionTitle}</div>
  );

  const fileUploadClassName = classNames(
    styles.FileUpload,
    measuring && styles.measuring,
    size === 'large' && styles.large,
    size === 'small' && styles.small,
  );

  let viewMarkup;
  switch (size) {
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
