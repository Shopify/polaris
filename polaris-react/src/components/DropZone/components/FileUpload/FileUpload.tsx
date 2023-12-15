import React, {useContext} from 'react';
import {UploadMajor} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';
import {Text} from '../../../Text';
import {DropZoneContext} from '../../context';
import {useI18n} from '../../../../utilities/i18n';
import {createAllowMultipleKey} from '../../utils';
import {BlockStack} from '../../../BlockStack';

import styles from './FileUpload.module.scss';

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
    <Text variant="bodySm" as="p" tone="subdued">
      {actionHint}
    </Text>
  );

  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = (
        <BlockStack inlineAlign="center" gap="200">
          {actionMarkup}
          {actionHintMarkup}
        </BlockStack>
      );
      break;
    case 'medium':
      viewMarkup = (
        <BlockStack inlineAlign="center" gap="200">
          {actionMarkup}
          {actionHintMarkup}
        </BlockStack>
      );
      break;
    case 'small':
      viewMarkup = (
        <div
          className={classNames(styles.UploadIcon, disabled && styles.disabled)}
        >
          <Icon source={UploadMajor} />
        </div>
      );

      break;
  }

  return <div className={fileUploadClassName}>{viewMarkup}</div>;
}
