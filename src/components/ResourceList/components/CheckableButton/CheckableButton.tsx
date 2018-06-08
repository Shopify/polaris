import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Checkbox} from '../../..';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../components/AppProvider';

import * as styles from './CheckableButton.scss';

export interface Props {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  selectMode?: boolean;
  plain?: boolean;
  measuring?: boolean;
  onToggleAll?(): void;
}
export type CombinedProps = Props & WithAppProviderProps;

function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  selectMode,
  plain,
  measuring,
}: CombinedProps) {
  const className = plain
    ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
    : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
        measuring && styles['CheckableButton-measuring'],
      );

  return (
    <div className={className} onClick={onToggleAll}>
      <div className={styles.Checkbox}>
        <Checkbox label={accessibilityLabel} labelHidden checked={selected} />
      </div>
      <span className={styles.Label}>{label}</span>
    </div>
  );
}

export default withAppProvider<Props>()(CheckableButton);
