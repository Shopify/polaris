import React, {ReactElement} from 'react';
import {mountWithApp} from 'test-utilities';

import {IndexProvider, IndexProviderProps} from '../../../../IndexProvider';
import {IndexTable, IndexTableProps} from '../../../IndexTable';
import {Row, RowProps} from '../../Row';
import {Cell} from '../Cell';
import {Checkbox} from '../../Checkbox';

describe('<Cell />', () => {
  let getBoundingClientRectSpy: jest.SpyInstance;

  beforeEach(() => {
    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      'getBoundingClientRect',
    );
    setGetBoundingClientRect(0);
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
  });

  it('renders a table data tag', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).toContainReactComponent('td');
  });

  it('does not render a checkbox by default', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).not.toContainReactComponent(Checkbox);
  });

  it('does not apply sticky styles by default', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).not.toContainReactComponent('td', {
      style: {left: expect.any(Number)},
    });
  });

  it('updates sticky styles when resizing', () => {
    const cell = mountWithTable(<Cell first />);

    expect(cell).toContainReactComponent('td', {
      style: {left: 0},
    });

    setGetBoundingClientRect(5);

    cell.act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(cell).toContainReactComponent('td', {
      style: {left: 5},
    });
  });

  describe('props', () => {
    it('renders a Checkbox when first is true', () => {
      const cell = mountWithTable(<Cell first />);

      expect(cell).toContainReactComponent(Checkbox);
    });

    it('applies sticky markup when first is true', () => {
      const cell = mountWithTable(<Cell first />);

      expect(cell).toContainReactComponent('td', {
        style: {left: expect.any(Number)},
      });
    });
  });

  function setGetBoundingClientRect(width: number) {
    getBoundingClientRectSpy.mockImplementation(() => {
      return {
        width,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON() {},
      };
    });
  }
});

const defaultProviderProps = {
  itemCount: 1,
  selectedItemsCount: 0,
};
const defaultIndexProps = {
  headings: [{title: 'first heading'}],
};
const defaultRowProps = {
  id: 'id',
  selected: false,
  position: 0,
};
function mountWithTable(
  children: ReactElement,
  props: {
    providerProps?: IndexProviderProps;
    indexProps?: IndexTableProps;
    rowProps?: RowProps;
  } = {},
) {
  const {providerProps, indexProps, rowProps} = props;
  const table = mountWithApp(
    <IndexProvider {...defaultProviderProps} {...providerProps}>
      <IndexTable {...defaultIndexProps} {...indexProps}>
        <Row {...defaultRowProps} {...rowProps}>
          {children}
        </Row>
      </IndexTable>
    </IndexProvider>,
  );

  return table;
}
