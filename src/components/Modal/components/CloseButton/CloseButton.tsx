import * as React from 'react';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '@shopify/css-utilities';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import Icon from '../../../Icon';

import styles from './CloseButton.scss';

export interface Props {
  title?: boolean;
  onClick(): void;
}

type CombinedProps = Props & WithAppProviderProps;

function CloseButton({title = true, onClick, polaris: {intl}}: CombinedProps) {
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

export default withAppProvider<Props>()(CloseButton);
