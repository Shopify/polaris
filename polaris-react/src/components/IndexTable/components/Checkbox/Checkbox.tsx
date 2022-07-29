import type {ReactNode} from 'react';
import {
  useContext,
  memo,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from 'react';

import {useI18n} from '../../../../utilities/i18n';
import {classNames} from '../../../../utilities/css';
import {RowContext} from '../../../../utilities/index-table';
import {useIndexValue} from '../../../../utilities/index-provider';
import {Checkbox as PolarisCheckbox} from '../../../Checkbox';
import {setRootProperty} from '../../../../utilities/set-root-property';
import sharedStyles from '../../IndexTable.scss';

import styles from './Checkbox.scss';

export const Checkbox = memo(function Checkbox() {
  const i18n = useI18n();
  const {resourceName, condensed} = useIndexValue();
  const {itemId, selected, onInteraction} = useContext(RowContext);

  const wrapperClassName = classNames(
    styles.Wrapper,
    condensed ? styles.condensed : styles.expanded,
  );

  const Wrapper = condensed ? Fragment : CheckboxWrapper;

  return (
    <Wrapper>
      <div className={styles.TableCellContentContainer}>
        <div
          className={wrapperClassName}
          onClick={onInteraction}
          onKeyUp={noop}
        >
          <PolarisCheckbox
            id={itemId}
            label={i18n.translate('Polaris.IndexTable.selectItem', {
              resourceName: resourceName.singular,
            })}
            labelHidden
            checked={selected}
          />
        </div>
      </div>
    </Wrapper>
  );
});

interface CheckboxWrapperProps {
  children: ReactNode;
}

export function CheckboxWrapper({children}: CheckboxWrapperProps) {
  const checkboxNode = useRef<HTMLTableDataCellElement>(null);

  const handleResize = useCallback(() => {
    if (!checkboxNode.current) return;

    const {width} = checkboxNode.current.getBoundingClientRect();
    setRootProperty('--pc-checkbox-offset', `${width}px`);
  }, []);

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
