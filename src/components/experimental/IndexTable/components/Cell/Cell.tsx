import React, {
  useContext,
  useCallback,
  memo,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from 'react';

import {Checkbox} from '../../../../Checkbox';
import {classNames} from '../../../../../utilities/css';
import {useI18n} from '../../../../../utilities/i18n';
import {RowContext} from '../Row';
import {useIndexValue} from '../../../IndexProvider';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  first?: boolean;
  last?: boolean;
  sub?: boolean;
  noPadding?: boolean;
}

export const Cell = memo(function Cell({
  children,
  first,
  last,
  sub,
  noPadding,
}: CellProps) {
  const checkboxNode = useRef<HTMLTableDataCellElement>(null);
  const [checkboxOffset, setCheckboxOffset] = useState<number>(0);

  const handleResize = useCallback(() => {
    if (!checkboxNode.current) return;

    const {width} = checkboxNode.current.getBoundingClientRect();
    setCheckboxOffset(width);
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
    styles.TableCell,
    styles['TableCell--first'],
  );

  const checkboxMarkup =
    first && !sub ? (
      <td className={checkboxClassName} ref={checkboxNode}>
        <IndexCheckbox />
      </td>
    ) : null;

  const cellClassName = classNames(
    styles.TableCell,
    checkboxMarkup && styles['TableCell--second'],
    last && styles['TableCell--last'],
    noPadding && styles['TableCell--noPadding'],
  );

  const stickyPositioningStyle = checkboxMarkup
    ? {left: checkboxOffset}
    : undefined;

  return (
    <React.Fragment>
      {checkboxMarkup}
      <td className={cellClassName} style={stickyPositioningStyle}>
        {children}
      </td>
    </React.Fragment>
  );
});

const IndexCheckbox = memo(function IndexCheckbox() {
  const i18n = useI18n();
  const {resourceName} = useIndexValue();
  const {itemId, selected, onInteraction} = useContext(RowContext);

  return (
    <div className={styles.TableCellContentContainer}>
      <div
        className={styles.CheckboxTarget}
        onClick={onInteraction}
        onKeyUp={onInteraction}
        onChange={stopPropagation}
      >
        <Checkbox
          id={itemId}
          label={i18n.translate('Polaris.IndexTable.selectItem', {
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
