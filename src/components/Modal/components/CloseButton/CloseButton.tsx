import React from 'react';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';

import Icon from '../../../Icon';

import styles from './CloseButton.scss';

export interface Props {
  title?: boolean;
  onClick(): void;
}

export default function CloseButton({title = true, onClick}: Props) {
  const intl = useI18n();

  const className = classNames(
    styles.CloseButton,
    !title && styles.withoutTitle,
  );

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={intl.translate('Polaris.Common.close')}
    >
      <Icon source={MobileCancelMajorMonotone} color="inkLighter" />
    </button>
  );
}
