import React, {
  useCallback,
  memo,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from 'react';
import {classNames} from '../../../../utilities/css';

import {Checkbox} from '../Checkbox';
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
    styles['TableCell-first'],
  );

  const checkboxMarkup =
    first && !sub ? (
      <td className={checkboxClassName} ref={checkboxNode}>
        <Checkbox />
      </td>
    ) : null;

  const cellClassName = classNames(
    styles.TableCell,
    checkboxMarkup && styles['TableCell-second'],
    last && styles['TableCell-last'],
    noPadding && styles['TableCell-noPadding'],
  );

  const stickyPositioningStyle = checkboxMarkup
    ? {left: checkboxOffset}
    : undefined;

  return (
    <>
      {checkboxMarkup}
      <td className={cellClassName} style={stickyPositioningStyle}>
        {children}
      </td>
    </>
  );
});
