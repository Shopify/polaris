import React, {ReactElement} from 'react';
import {mountWithApp} from 'test-utilities';
import type {DeepPartial, ThenType} from '@shopify/useful-types';

import {IndexTable, IndexTableProps} from '../../../IndexTable';
import {RowHoveredContext} from '../../../../../utilities/index-table';
import {Row} from '../Row';
import {Link} from '../../Link'

const defaultEvent = {
  preventDefault: noop,
  stopPropagation: noop,
  nativeEvent: {
    shiftKey: false,
  },
  type: 'click',
};
const defaultProps = {
  id: 'id',
  selected: false,
  position: 0,
};
const defaultIndexTableProps: IndexTableProps = {
  headings: [{title: 'first heading'}],
  itemCount: 1,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
};

describe('<Row />', () => {
  let windowOpenSpy: jest.SpyInstance;

  beforeEach(() => {
    windowOpenSpy = jest.spyOn(window, 'open');
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('renders a RowHoveredContext provider', () => {
    const row = mountWithTable(
      <Row id="id" selected position={1}>
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent(RowHoveredContext.Provider);
  });

  it('calls onNavigation when opening a new tab', () => {
    const onNavigationSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onNavigation={onNavigationSpy}>
        <th>
          <Link url="/">
            Child
          </Link>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, {...defaultEvent, nativeEvent: {ctrlKey: true}});

    expect(onNavigationSpy).toHaveBeenCalledTimes(1);
  });

  it('calls onNavigation on row click', () => {
    const onNavigationSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onNavigation={onNavigationSpy}>
        <th>
          <Link url="/">
            Child
          </Link>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, defaultEvent);

    expect(onNavigationSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleInteraction on row click', () => {
    const onSelectionChangeSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <Link url="/">Child without data-primary-link</Link>
        </th>
      </Row>,
      {
        indexTableProps: {
          itemCount: 50,
          selectedItemsCount: 0,
          onSelectionChange: onSelectionChangeSpy,
        },
      },
    );

    triggerOnClick(row, 1, defaultEvent);

    expect(onSelectionChangeSpy).toHaveBeenCalledTimes(1);
  });
});

function triggerOnClick(
  row: ThenType<ReturnType<typeof mountWithTable>>,
  times = 1,
  event: DeepPartial<React.MouseEvent>,
) {
  // React uses its own synthetic events that won't be trigger when
  // dispatching events so we need to attach our own handler
  row.find('a')!.domNode!.addEventListener('click', noop, {once: true});

  for (let i = 0; i < times; i++) {
    row.find(Row)!.find('tr')!.trigger('onClick', event);
  }
}

function mountWithTable(
  children: ReactElement,
  props: {
    indexTableProps?: Partial<IndexTableProps>;
  } = {},
) {
  const {indexTableProps} = props;
  const table = mountWithApp(
    <IndexTable {...defaultIndexTableProps} {...indexTableProps}>
      {children}
    </IndexTable>,
  );

  return table;
}

function noop() {}
