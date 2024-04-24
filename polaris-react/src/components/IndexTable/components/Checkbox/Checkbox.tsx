import React, {useContext, memo, useEffect, useRef, useCallback} from 'react';
import type {ReactNode} from 'react';

import {debounce} from '../../../../utilities/debounce';
import {useI18n} from '../../../../utilities/i18n';
import {classNames} from '../../../../utilities/css';
import {RowContext} from '../../../../utilities/index-table';
import {useIndexValue} from '../../../../utilities/index-provider';
import {Checkbox as PolarisCheckbox} from '../../../Checkbox';
import {setRootProperty} from '../../../../utilities/set-root-property';
import sharedStyles from '../../IndexTable.module.css';

import styles from './Checkbox.module.css';

interface CheckboxProps {
  accessibilityLabel?: string;
}

export const Checkbox = memo(function Checkbox({
  accessibilityLabel,
}: CheckboxProps) {
  const i18n = useI18n();
  const {resourceName} = useIndexValue();
  const {itemId, selected, disabled, onInteraction} = useContext(RowContext);

  const label = accessibilityLabel
    ? accessibilityLabel
    : i18n.translate('Polaris.IndexTable.selectItem', {
        resourceName: resourceName.singular,
      });

  return (
    <CheckboxWrapper>
      <div className={styles.Wrapper} onClick={onInteraction} onKeyUp={noop}>
        <PolarisCheckbox
          id={`Select-${itemId}`}
          label={label}
          labelHidden
          checked={selected}
          disabled={disabled}
        />
      </div>
    </CheckboxWrapper>
  );
});

interface CheckboxWrapperProps {
  children: ReactNode;
}

export function CheckboxWrapper({children}: CheckboxWrapperProps) {
  const {position} = useContext(RowContext);
  const checkboxNode = useRef<HTMLTableDataCellElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    debounce(() => {
      if (position !== 0 || !checkboxNode.current) return;

      const {width} = checkboxNode.current.getBoundingClientRect();
      setRootProperty('--pc-checkbox-offset', `${width}px`);
    }),
    [position],
  );

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    if (!checkboxNode.current) return;
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const checkboxClassName = classNames(
    sharedStyles.TableCell,
    sharedStyles['TableCell-first'],
  );

  return (
    <td className={checkboxClassName} ref={checkboxNode}>
      {children}
    </td>
  );
}

function noop() {}
