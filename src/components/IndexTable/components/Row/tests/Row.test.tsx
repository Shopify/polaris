import React, {ReactElement} from 'react';
import {mountWithApp} from 'test-utilities';
import type {DeepPartial, ThenType} from '@shopify/useful-types';

import {IndexTable, IndexTableProps} from '../../../IndexTable';
import {RowHoveredContext} from '../../../../../utilities/index-table';
import {Row} from '../Row';

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

  it(`dispatches a mouse event when the row is clicked and selectMode is false`, () => {
    const spy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    // React uses its own synthetic events that won't be trigger when
    // dispatching events so we need to attach our own handler
    row.find('a')!.domNode!.addEventListener('click', spy, {once: true});

    row.find(Row)!.find('tr')!.trigger('onClick', defaultEvent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`does not dispatch a mouse event when the row is clicked if selectMode is true`, () => {
    const spy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
        </th>
      </Row>,
      {
        indexTableProps: {
          onSelectionChange: () => {},
          selectedItemsCount: 1,
          itemCount: 1,
        },
      },
    );

    // React uses its own synthetic events that won't be trigger when
    // dispatching events so we need to attach our own handler
    row.find('a')!.domNode!.addEventListener('click', spy, {once: true});

    row.find(Row)!.find('tr')!.trigger('onClick', defaultEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it(`opens the primary link elements url in a new tab when ctrl + clicked`, () => {
    const href = '/root';
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href={href} data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, {...defaultEvent, nativeEvent: {ctrlKey: true}});

    expect(windowOpenSpy).toHaveBeenCalledWith(
      `http://localhost${href}`,
      '_blank',
    );
  });

  it(`opens the primary link elements url in a new tab when cmd + clicked`, () => {
    const href = '/root';
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href={href} data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, {...defaultEvent, nativeEvent: {metaKey: true}});

    expect(windowOpenSpy).toHaveBeenCalledWith(
      `http://localhost${href}`,
      '_blank',
    );
  });

  it('can open the same ctrl/cmd + clicked link multiple times', () => {
    const href = '/root';
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href={href} data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 2, {...defaultEvent, nativeEvent: {ctrlKey: true}});

    expect(windowOpenSpy).toHaveBeenCalledTimes(2);
  });

  it('calls onNavigation when opening a new tab', () => {
    const onNavigationSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onNavigation={onNavigationSpy}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, {...defaultEvent, nativeEvent: {ctrlKey: true}});

    expect(onNavigationSpy).toHaveBeenCalledTimes(1);
  });

  it('calls onNavigation when clicked', () => {
    const onNavigationSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onNavigation={onNavigationSpy}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, defaultEvent);

    expect(onNavigationSpy).toHaveBeenCalledTimes(1);
  });

  it('calls handleInteraction when clicked and no primary link child present', () => {
    const onSelectionChangeSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href="/">Child without data-primary-link</a>
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

  it('has an undefined status by default', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <td />
      </Row>,
    );

    expect(row).toHaveReactProps({status: undefined});
  });

  it('applies success status styles when status prop is set to "success"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} status="success">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow statusSuccess',
    });
  });

  it('applies subdued status styles when status prop is set to "subdued"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} status="subdued">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow statusSubdued',
    });
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
