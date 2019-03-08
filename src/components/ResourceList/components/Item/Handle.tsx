import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Checkbox} from '@shopify/polaris';

import * as styles from './Item.scss';

interface Props {
  label: string;
  checked: boolean;
  disabled: boolean;
  onClick: (event: React.MouseEvent<any>) => void;
  onChange(event: React.MouseEvent<any>): void;
}

const getUniqueCheckboxID = createUniqueIDFactory('ResourceListItemCheckbox');

const Handle = React.memo(function Handle({
  label,
  checked,
  disabled,
  onClick,
  onChange,
}: Props) {
  const checkboxId = getUniqueCheckboxID();

  return (
    <div
      className={styles.Handle}
      onClick={onClick}
      testID="LargerSelectionArea"
    >
      <div onClick={stopPropagation} className={styles.CheckboxWrapper}>
        <span onChange={onChange}>
          <Checkbox
            testID="Checkbox"
            id={checkboxId}
            label={label}
            labelHidden
            checked={checked}
            disabled={disabled}
          />
        </span>
      </div>
    </div>
  );
});

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

export default Handle;
