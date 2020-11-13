import React, {useContext, memo} from 'react';
import {Checkbox as PolarisCheckbox} from '@shopify/polaris';
import {classNames} from '@shopify/css-utilities';
import {useI18n} from '@shopify/react-i18n';

import {RowContext} from '../Row';
import {useIndexValue} from '../../../IndexProvider';

import styles from './Checkbox.scss';

export interface CheckboxProps {}

export const Checkbox = memo(function Checkbox() {
  const [i18n] = useI18n();
  const {resourceName, condensed} = useIndexValue();
  const {itemId, selected, onInteraction} = useContext(RowContext);

  const wrapperClassName = classNames(
    styles.Wrapper,
    condensed ? styles.condensed : styles.expanded,
  );

  return (
    <div className={styles.TableCellContentContainer}>
      <div
        className={wrapperClassName}
        onClick={onInteraction}
        onKeyUp={onInteraction}
        onChange={stopPropagation}
      >
        <PolarisCheckbox
          id={itemId}
          label={i18n.translate('selectItem', {
            resourceName: resourceName.singular,
          })}
          labelHidden
          checked={selected}
        />
      </div>
    </div>
  );
});

function stopPropagation(
  event: React.MouseEvent | React.KeyboardEvent | React.FormEvent,
) {
  event.stopPropagation();
}
