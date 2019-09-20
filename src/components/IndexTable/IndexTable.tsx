import React, {useContext, useRef, useLayoutEffect, useState} from 'react';

import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';

import {Button} from '../Button';
import {Checkbox} from '../Checkbox';
import {Icon} from '../Icon';

import {IndexContext, SELECT_ALL_ITEMS} from '../../utilities/index';
import {classNames} from '../../utilities/css';

import * as styles from './IndexTable.scss';

export interface IndexTableHeading {
  title: string;
}

export interface IndexTableProps {
  headings: IndexTableHeading[];
  renderCells(item: any): React.ReactNode[];
}

export function IndexTable({renderCells, headings}: IndexTableProps) {
  const {items, onSelectionChange, selectedItems, bulkSelectState} = useContext(
    IndexContext,
  );

  const [hasMoreLeftColumns, setHasMoreLeftColumns] = useState(false);
  const [hasMoreRightColumns, setHasMoreRightColumns] = useState(false);

  const scrollableContainerElement = useRef(null);
  const tableElement = useRef(null);

  useLayoutEffect(() => {
    calculateScrollColumns();
  }, []);

  const calculateScrollColumns = () => {
    if (!scrollableContainerElement.current) {
      return;
    }

    const availableScrollAmount =
      scrollableContainerElement.current.scrollWidth -
      scrollableContainerElement.current.offsetWidth;

    if (scrollableContainerElement.current.scrollLeft > 0) {
      setHasMoreLeftColumns(true);
    } else {
      setHasMoreLeftColumns(false);
    }

    if (scrollableContainerElement.current.scrollLeft < availableScrollAmount) {
      setHasMoreRightColumns(true);
    } else {
      setHasMoreRightColumns(false);
    }
  };

  const scrollColumnLeft = () => {
    if (
      scrollableContainerElement.current == null ||
      tableElement.current == null
    ) {
      return;
    }

    const tableHeadings = Array.from(
      tableElement.current.querySelectorAll('th'),
    );

    const previousColumns = tableHeadings.filter((tableHeading) => {
      return (
        tableHeading.offsetLeft < scrollableContainerElement.current.scrollLeft
      );
    });

    if (previousColumns.length > 0) {
      const previousColumn = previousColumns.pop();

      scrollableContainerElement.current.scrollTo({
        left: previousColumn.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const scrollColumnRight = () => {
    if (
      scrollableContainerElement.current == null ||
      tableElement.current == null
    ) {
      return;
    }

    const tableHeadings = Array.from(
      tableElement.current.querySelectorAll('th'),
    );

    const rightEdge =
      scrollableContainerElement.current.offsetWidth +
      scrollableContainerElement.current.scrollLeft;

    const nextColumns = tableHeadings.filter((tableHeading) => {
      const tableHeadingEdge =
        tableHeading.offsetLeft + tableHeading.offsetWidth - 16;
      return tableHeadingEdge > rightEdge;
    });

    if (nextColumns.length > 0) {
      const nextColumn = nextColumns[0];
      const nextColumnEdge =
        nextColumn.offsetLeft +
        nextColumn.offsetWidth -
        scrollableContainerElement.current.offsetWidth;

      scrollableContainerElement.current.scrollTo({
        left: nextColumnEdge,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectChange = (checked: boolean, id: string) => {
    if (onSelectionChange == null) {
      return;
    }
    onSelectionChange(checked, id);
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange == null) {
      return;
    }
    onSelectionChange(checked, SELECT_ALL_ITEMS);
  };

  const headingsMarkup = headings.map((heading) => (
    <th className={styles.TableHeading} key={heading.title}>
      {heading.title}
    </th>
  ));

  if (items == null) {
    return;
  }

  const rowsMarkup = items.map((item: any) => {
    const itemSelected =
      selectedItems === 'All' ||
      (selectedItems && selectedItems.includes(`Item-${item.id}`));

    const rowClassName = classNames(
      styles.TableRow,
      itemSelected && styles['TableRow--selected'],
    );

    const cellMarkup = renderCells(item).map((cell, index) => {
      return (
        <td className={styles.TableCell} key={index}>
          {cell}
        </td>
      );
    });

    return (
      <tr key={item.id} className={rowClassName}>
        <td className={styles.TableCell}>
          <Checkbox
            id={`Item-${item.id}`}
            label="Select row"
            labelHidden
            checked={itemSelected}
            onChange={handleSelectChange}
          />
        </td>
        {cellMarkup}
      </tr>
    );
  });

  const leftScrollMarkup = hasMoreLeftColumns ? (
    <div className={styles.ScrollLeft}>
      <Button
        icon={<Icon source={ChevronLeftMinor} />}
        onClick={scrollColumnLeft}
      />
    </div>
  ) : null;

  const rightScrollMarkup = hasMoreRightColumns ? (
    <div className={styles.ScrollRight}>
      <Button
        icon={<Icon source={ChevronRightMinor} />}
        onClick={scrollColumnRight}
      />
    </div>
  ) : null;

  const handleScroll = () => {
    calculateScrollColumns();
  };

  return (
    <div className={styles.IndexTable}>
      {leftScrollMarkup}
      <div
        className={styles.ScrollContainer}
        ref={scrollableContainerElement}
        onScroll={handleScroll}
      >
        <table ref={tableElement} className={styles.Table}>
          <thead>
            <tr>
              <th className={styles.TableHeading}>
                <Checkbox
                  label="Select all rows"
                  labelHidden
                  onChange={handleSelectAll}
                  checked={bulkSelectState}
                />
              </th>
              {headingsMarkup}
            </tr>
          </thead>
          <tbody>{rowsMarkup}</tbody>
        </table>
        {rightScrollMarkup}
      </div>
    </div>
  );
}
