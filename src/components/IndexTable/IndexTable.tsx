import React, {useContext, useRef, useLayoutEffect, useState} from 'react';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import {Badge} from '../Badge';
import {Checkbox} from '../Checkbox';
import {EventListener} from '../EventListener';
import {Stack} from '../Stack';
import {Sticky} from '../Sticky';

import {IndexContext, SELECT_ALL_ITEMS} from '../../utilities/index';
import {classNames} from '../../utilities/css';

import {ScrollButton} from './components';

import * as styles from './IndexTable.scss';

export interface IndexTableHeading {
  title: string;
  new?: boolean;
}

export interface IndexTableProps {
  headings: IndexTableHeading[];
  renderCells(item: any): React.ReactNode[];
}

export function IndexTable({renderCells, headings}: IndexTableProps) {
  const {items, onSelectionChange, selectedItems, bulkSelectState} = useContext(
    IndexContext,
  );

  const [onboardingScrollButtons, setOnboardingScrollButtons] = useState(true);
  const [hasMoreLeftColumns, setHasMoreLeftColumns] = useState(false);
  const [hasMoreRightColumns, setHasMoreRightColumns] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [tableHeadingWidths, setTableHeadingWidths] = useState<number[] | null>(
    null,
  );
  const [tablePosition, setTablePosition] = useState({top: 0, left: 0});
  const [hoveringRow, setHoveringRow] = useState<string | null>(null);

  const scrollableContainerElement = useRef(null);
  const tableElement = useRef(null);
  const stickyHeaderElement = useRef(null);

  useLayoutEffect(() => {
    calculateScrollColumns();
    measureTableHeadings();
    measureTablePosition();
  }, []);

  function measureTableHeadings() {
    if (tableElement.current == null) {
      return;
    }

    const tableHeadingWidths = Array.from(
      tableElement.current.querySelectorAll('th'),
    ).map((heading: HTMLElement) => heading.offsetWidth);
    setTableHeadingWidths(tableHeadingWidths);
  }

  function measureTablePosition() {
    if (scrollableContainerElement.current == null) {
      return;
    }

    const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
    setTablePosition({top: boundingRect.top, left: boundingRect.left});
  }

  const handleResize = debounce(
    () => {
      calculateScrollColumns();
      measureTableHeadings();
      measureTablePosition();
    },
    50,
    {trailing: true},
  );

  const handleWindowScroll = throttle(
    () => {
      if (scrollableContainerElement.current == null) {
        return;
      }
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
      const fixedHeader = window.scrollY >= boundingRect.top + scrollTop;
      setHeaderFixed(fixedHeader);
    },
    20,
    {trailing: true},
  );

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

  const handleContainerScroll = () => {
    calculateScrollColumns();
    stickyHeaderElement.current.scrollLeft =
      scrollableContainerElement.current.scrollLeft;
  };

  const handleMouseEnter = (id: string) => {
    setHoveringRow(id);
  };

  const handleMouseLeave = () => {
    setHoveringRow(null);
  };

  const headingsMarkup = headings.map((heading, index) => {
    if (index === 0) {
      const headingClassName = classNames(
        styles.TableHeading,
        styles['TableHeading--first'],
      );
      return (
        <th className={headingClassName}>
          <Stack wrap={false} alignment="center">
            <Checkbox
              label="Select all rows"
              labelHidden
              onChange={handleSelectAll}
              checked={bulkSelectState}
            />
            <Stack.Item>{heading.title}</Stack.Item>
          </Stack>
        </th>
      );
    } else {
      return heading.new ? (
        <th className={styles.TableHeading} key={heading.title}>
          <Stack wrap={false} alignment="center">
            <Stack.Item>{heading.title}</Stack.Item>
            <Badge status="new">New</Badge>
          </Stack>
        </th>
      ) : (
        <th className={styles.TableHeading} key={heading.title}>
          {heading.title}
        </th>
      );
    }
  });

  const stickyHeadingsMarkup = headings.map((heading, index) => {
    const headingStyle =
      tableHeadingWidths && tableHeadingWidths.length > index
        ? {minWidth: tableHeadingWidths[index]}
        : undefined;

    if (index === 0) {
      return (
        <div className={styles.TableHeading} style={headingStyle}>
          <Stack wrap={false} alignment="center">
            <Checkbox
              label="Select all rows"
              labelHidden
              onChange={handleSelectAll}
              checked={bulkSelectState}
            />
            <Stack.Item>{heading.title}</Stack.Item>
          </Stack>
        </div>
      );
    } else {
      return heading.new ? (
        <div
          className={styles.TableHeading}
          key={heading.title}
          style={headingStyle}
        >
          <Stack wrap={false} alignment="center">
            <Stack.Item>{heading.title}</Stack.Item>
            <Badge status="new">New</Badge>
          </Stack>
        </div>
      ) : (
        <div
          className={styles.TableHeading}
          key={heading.title}
          style={headingStyle}
        >
          {heading.title}
        </div>
      );
    }
  });

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
      hoveringRow === item.id && styles['TableRow--hovering'],
    );

    const cellMarkup = renderCells(item).map((cell, index) => {
      if (index === 0) {
        const cellClassName = classNames(
          styles.TableCell,
          styles['TableCell--first'],
        );
        return (
          <td className={cellClassName} key={index}>
            <Stack wrap={false} alignment="center">
              <Checkbox
                id={`Item-${item.id}`}
                label="Select row"
                labelHidden
                checked={itemSelected}
                onChange={handleSelectChange}
              />
              {cell}
            </Stack>
          </td>
        );
      } else {
        return (
          <td className={styles.TableCell} key={index}>
            {cell}
          </td>
        );
      }
    });

    return (
      <tr
        key={item.id}
        className={rowClassName}
        onMouseEnter={handleMouseEnter.bind(null, item.id)}
        onMouseLeave={handleMouseLeave}
      >
        {cellMarkup}
      </tr>
    );
  });

  const columnStyle = headerFixed ? {left: tablePosition.left} : undefined;

  const columnHeaderClasses = classNames(
    styles.FixedColumnHeader,
    headerFixed && styles['FixedColumnHeader--isFixed'],
  );

  const headingStyle =
    tableHeadingWidths && tableHeadingWidths.length > 0
      ? {
          minWidth: tableHeadingWidths[0],
        }
      : undefined;

  const fixedColumnHeaderMarkup = (
    <div className={columnHeaderClasses} style={columnStyle}>
      <div className={styles.TableHeading} style={headingStyle}>
        <Stack wrap={false} alignment="center">
          <Checkbox
            label="Select all rows"
            labelHidden
            onChange={handleSelectAll}
            checked={bulkSelectState}
          />
          <Stack.Item>{headings[0].title}</Stack.Item>
        </Stack>
      </div>
    </div>
  );

  const fixedTableClassNames = classNames(
    styles.FixedTable,
    hasMoreLeftColumns && styles['FixedTable--scrolling'],
  );

  const leftScrollMarkup = hasMoreLeftColumns ? (
    <div className={styles.ScrollLeft}>
      <ScrollButton direction="left" onClick={scrollColumnLeft} />
    </div>
  ) : null;

  const rightScrollClassName = classNames(
    styles.ScrollRight,
    onboardingScrollButtons && styles['ScrollRight--onboarding'],
  );

  const rightScrollMarkup = hasMoreRightColumns ? (
    <div className={rightScrollClassName}>
      <ScrollButton
        direction="right"
        onboarding={onboardingScrollButtons}
        onClick={scrollColumnRight}
      />
    </div>
  ) : null;

  return (
    <div className={styles.IndexTable}>
      <EventListener event="scroll" handler={handleWindowScroll} />
      <EventListener event="resize" handler={handleResize} />
      {leftScrollMarkup}
      {rightScrollMarkup}
      <div
        className={styles.ScrollContainer}
        ref={scrollableContainerElement}
        onScroll={handleContainerScroll}
      >
        <table ref={tableElement} className={styles.Table}>
          <thead>
            <tr className={styles.HeadingRow}>{headingsMarkup}</tr>
          </thead>
          <tbody>{rowsMarkup}</tbody>
        </table>
        <table className={fixedTableClassNames} role="presentation">
          <thead>
            <tr>{headingsMarkup}</tr>
          </thead>
          <tbody>{rowsMarkup}</tbody>
        </table>
        {fixedColumnHeaderMarkup}
        <div className={styles.StickyTable} role="presentation">
          <Sticky>
            {(isSticky: boolean) => {
              const stickyHeaderClassNames = classNames(
                styles.StickyTableHeader,
                isSticky && styles['StickyTableHeader--isSticky'],
              );

              const headerStyle = scrollableContainerElement.current
                ? {
                    width: scrollableContainerElement.current.offsetWidth,
                  }
                : undefined;

              return (
                <div
                  className={stickyHeaderClassNames}
                  style={headerStyle}
                  ref={stickyHeaderElement}
                >
                  {stickyHeadingsMarkup}
                </div>
              );
            }}
          </Sticky>
        </div>
      </div>
    </div>
  );

  function calculateScrollColumns() {
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
      setOnboardingScrollButtons(false);
    }
  }

  function scrollColumnLeft() {
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
  }

  function scrollColumnRight() {
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
        tableHeading.offsetLeft + tableHeading.offsetWidth - 32;
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
  }
}
