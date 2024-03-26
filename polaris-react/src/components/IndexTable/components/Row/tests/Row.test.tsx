import React from 'react';
import type {ReactElement} from 'react';
import {mountWithApp} from 'tests/utilities';
import type {DeepPartial} from '@shopify/useful-types';

import {IndexTable} from '../../../IndexTable';
import type {IndexTableProps} from '../../../IndexTable';
import {RowHoveredContext} from '../../../../../utilities/index-table';
import {SelectionType} from '../../../../../utilities/index-provider';
import {Row} from '../Row';
import {Checkbox} from '../../Checkbox';
import {Button} from '../../../../Button';
import {Link} from '../../../../Link';
import {Checkbox as PolarisCheckbox} from '../../../../Checkbox';
import styles from '../../../IndexTable.module.css';
import type {Range} from '../../../../../utilities/index-provider';

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

  it('renders checkboxes by default when selectable not specified in IndexTable', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>Child</th>
      </Row>,
    );

    expect(row).toContainReactComponent(Checkbox);
  });

  it('renders checkboxes when selectable set to true in IndexTable', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>Child</th>
      </Row>,
      {indexTableProps: {selectable: true}},
    );

    expect(row).toContainReactComponent(Checkbox);
  });

  it('does not render checkboxes when selectable is set to false in IndexTable', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>Child</th>
      </Row>,
      {indexTableProps: {selectable: false}},
    );

    expect(row).not.toContainReactComponent(Checkbox);
  });

  it('renders a RowHoveredContext provider', () => {
    const row = mountWithTable(
      <Row id="id" selected position={1}>
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent(RowHoveredContext.Provider);
  });

  it('applies the styles.TableRow class to the table row element', () => {
    const row = mountWithTable(
      <Row id="id" selected position={1}>
        <td />
      </Row>,
    );

    expect(row.find(Row)?.find('tr')?.prop('className')).toContain(
      styles.TableRow,
    );
  });

  describe('rowType', () => {
    describe('when a `rowType` of `subheader` is set', () => {
      it('applies the .TableRow-subheader class to the table row element', () => {
        const row = mountWithTable(
          <Row id="id" selected rowType="subheader" position={1}>
            <td />
          </Row>,
        );

        expect(row.find(Row)?.find('tr')?.prop('className')).toContain(
          styles['TableRow-subheader'],
        );
      });

      it('calls onSelectionChange with the `selectionRange` when present and the row checkbox cell is clicked', () => {
        const onSelectionChangeSpy = jest.fn();
        const range: Range = [0, 1];
        const row = mountWithTable(
          <Row {...defaultProps} rowType="subheader" selectionRange={range}>
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

        row.find('div', {className: 'Wrapper'})!.triggerKeypath('onClick', {
          stopPropagation: noop,
          key: ' ',
          nativeEvent: {},
        });

        expect(onSelectionChangeSpy).toHaveBeenCalledTimes(1);
        expect(onSelectionChangeSpy).toHaveBeenCalledWith(
          SelectionType.Range,
          true,
          range,
        );
      });

      it('does not call onSelectionChange with the `selectionRange` when present and the row is clicked', () => {
        const onSelectionChangeSpy = jest.fn();
        const range: Range = [0, 1];
        const row = mountWithTable(
          <Row {...defaultProps} rowType="subheader" selectionRange={range}>
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

        expect(onSelectionChangeSpy).not.toHaveBeenCalled();
      });
    });

    describe('when a `rowType` of `child` is set', () => {
      it('applies the .TableRow-child class to the table row element', () => {
        const row = mountWithTable(
          <Row id="id" selected rowType="child" position={1}>
            <td />
          </Row>,
        );

        expect(row.find(Row)?.find('tr')?.prop('className')).toContain(
          styles['TableRow-child'],
        );
      });
    });
  });

  it('allows the checkbox to be indeterminate', () => {
    const row = mountWithTable(
      <Row id="id" selected="indeterminate" position={1}>
        <td />
      </Row>,
    );

    expect(row.find(Row)?.find(PolarisCheckbox)?.prop('checked')).toBe(
      'indeterminate',
    );
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

  it.each([
    ['<Link>', () => <Link url="/" dataPrimaryLink />],
    ['<Button>', () => <Button url="/" dataPrimaryLink />],
  ])(
    'calls onNavigation when clicked %s',
    (_: string, renderElement: () => JSX.Element) => {
      const onNavigationSpy = jest.fn();
      const row = mountWithTable(
        <Row {...defaultProps} onNavigation={onNavigationSpy}>
          <th>{renderElement()}</th>
        </Row>,
      );

      triggerOnClick(row, 1, defaultEvent);

      expect(onNavigationSpy).toHaveBeenCalledTimes(1);
    },
  );

  it('calls onClick when clicked', () => {
    const onClickSpy = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onClick={onClickSpy}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
        </th>
      </Row>,
    );

    triggerOnClick(row, 1, defaultEvent);

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not execute further functionality when onClick is present', () => {
    const onClickSpy = jest.fn();
    const onSelectionChangeSpy = jest.fn();

    const row = mountWithTable(
      <Row {...defaultProps} onClick={onClickSpy}>
        <th>
          <a href="/" data-primary-link>
            Child
          </a>
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
    expect(onSelectionChangeSpy).toHaveBeenCalledTimes(0);
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

  it('does not fire onClick handler when row is clicked and no primary link child present and table is not selectable', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <th>
          <a href="/">Child without data-primary-link</a>
        </th>
      </Row>,
      {
        indexTableProps: {
          itemCount: 1,
          selectable: false,
        },
      },
    );

    const onClick = () => {
      row.find(Row)!.find('tr')!.trigger('onClick');
    };

    expect(onClick).toThrow(
      'Attempted to call prop onClick but it was not defined.',
    );
  });

  it('fires onClick handler when row has an onclick and is clicked despite no primary link child present and the table not being selectable', () => {
    const mockOnClick = jest.fn();
    const row = mountWithTable(
      <Row {...defaultProps} onClick={mockOnClick}>
        <th>
          <a href="/">Child without data-primary-link</a>
        </th>
      </Row>,
      {
        indexTableProps: {
          itemCount: 1,
          selectable: false,
        },
      },
    );

    triggerOnClick(row, 1, defaultEvent);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('has an undefined tone by default', () => {
    const row = mountWithTable(
      <Row {...defaultProps}>
        <td />
      </Row>,
    );

    expect(row).toHaveReactProps({tone: undefined});
  });

  it('applies subdued tone styles when tone prop is set to "subdued"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} tone="subdued">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow toneSubdued',
    });
  });

  it('applies success tone styles when tone prop is set to "success"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} tone="success">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow toneSuccess',
    });
  });

  it('applies warning tone styles when tone prop is set to "warning"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} tone="warning">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow toneWarning',
    });
  });

  it('applies critical tone styles when tone prop is set to "critical"', () => {
    const row = mountWithTable(
      <Row {...defaultProps} tone="critical">
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow toneCritical',
    });
  });

  it('applies disabled styles when disabled prop is set to true', () => {
    const row = mountWithTable(
      <Row {...defaultProps} disabled>
        <td />
      </Row>,
    );

    expect(row).toContainReactComponent('tr', {
      className: 'TableRow TableRow-disabled',
    });
  });
});

function triggerOnClick(
  row: Awaited<ReturnType<typeof mountWithTable>>,
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
