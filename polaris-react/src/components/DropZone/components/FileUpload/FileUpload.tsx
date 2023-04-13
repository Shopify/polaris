import React, {useContext} from 'react';

import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';
import {Text} from '../../../Text';
import {uploadArrow} from '../../images';
import {DropZoneContext} from '../../context';
import {useI18n} from '../../../../utilities/i18n';
import {createAllowMultipleKey} from '../../utils';
import {VerticalStack} from '../../../VerticalStack';

import styles from './FileUpload.scss';

export interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

export function FileUpload(props: FileUploadProps) {
  const i18n = useI18n();
  const {size, measuring, type, disabled, allowMultiple} =
    useContext(DropZoneContext);

  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);

  const {
    actionTitle = i18n.translate(
      `Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`,
    ),
    actionHint,
  } = props;

  const actionClassNames = classNames(
    styles.Action,
    disabled && styles.disabled,
  );

  const actionMarkup = <div className={actionClassNames}>{actionTitle}</div>;

  const fileUploadClassName = classNames(
    styles.FileUpload,
    measuring && styles.measuring,
    size === 'large' && styles.large,
    size === 'small' && styles.small,
  );

  const actionHintMarkup = actionHint && (
    <Text variant="bodySm" as="p" color="subdued">
      {actionHint}
    </Text>
  );

  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = (
        <VerticalStack inlineAlign="center" gap="2">
          {actionMarkup}
          {actionHintMarkup}
        </VerticalStack>
      );
      break;
    case 'medium':
      viewMarkup = (
        <VerticalStack inlineAlign="center" gap="2">
          {actionMarkup}
          {actionHintMarkup}
        </VerticalStack>
      );
      break;
    case 'small':
      viewMarkup = <img width="20" src={uploadArrow} alt="" />;
      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
