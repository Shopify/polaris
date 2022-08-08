import React, {ReactElement} from 'react';
import type {ThenType} from '@shopify/useful-types';
import {mountWithApp} from 'tests/utilities';
import type {Element as ElementType} from '@shopify/react-testing';

import {Checkbox as PolarisCheckbox} from '../../../../Checkbox';
import {IndexTable, IndexTableProps} from '../../../IndexTable';
import {Row, RowProps} from '../../Row';
import {Checkbox, CheckboxWrapper} from '../Checkbox';
import * as setRootPropertyModule from '../../../../../utilities/set-root-property';

const defaultId = 'id';

describe('<Checkbox />', () => {
  let getBoundingClientRectSpy: jest.SpyInstance;
  let setRootPropertySpy: jest.SpyInstance;

  beforeEach(() => {
    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      'getBoundingClientRect',
    );
    setGetBoundingClientRect(0);
    setRootPropertySpy = jest.spyOn(setRootPropertyModule, 'setRootProperty');
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
    setRootPropertySpy.mockRestore();
  });

  it('renders a Checkbox with a id', () => {
    const id = 'id';
    const checkbox = mountWithTable(<Checkbox />, {rowProps: {id}});

    expect(checkbox).toContainReactComponent(PolarisCheckbox, {id});
  });

  it('renders a Checkbox with a label', () => {
    const resourceName = {singular: 'Singular', plural: 'Plural'};
    const checkbox = mountWithTable(<Checkbox />, {
      indexProps: {resourceName},
    });

    expect(checkbox).toContainReactComponent(PolarisCheckbox, {
      label: `Select ${resourceName.singular}`,
    });
  });

  it('renders a Checkbox with a label hidden set to true', () => {
    const checkbox = mountWithTable(<Checkbox />);

    expect(checkbox).toContainReactComponent(PolarisCheckbox, {
      labelHidden: true,
    });
  });

  it('toggles the checkbox value when clicked', () => {
    const onSelectionChange = jest.fn();
    const checkbox = mountWithTable(<Checkbox />, {
      indexProps: {onSelectionChange},
      rowProps: {selected: true},
    });

    triggerCheckboxEvent(checkbox, 'onClick', {
      nativeEvent: {shiftKey: false},
    });

    expect(onSelectionChange).toHaveBeenCalledWith('single', false, defaultId);
  });

  describe('when the row disabled prop is true', () => {
    it('renders a Checkbox with disabled set to true', () => {
      const disabled = true;
      const checkbox = mountWithTable(<Checkbox />, {
        rowProps: {disabled},
      });

      expect(checkbox).toContainReactComponent(PolarisCheckbox, {
        disabled: true,
      });
    });
  });

  describe('when the row disabled prop is false', () => {
    it('renders a Checkbox with disabled set to false', () => {
      const disabled = false;
      const checkbox = mountWithTable(<Checkbox />, {
        rowProps: {disabled},
      });

      expect(checkbox).toContainReactComponent(PolarisCheckbox, {
        disabled: false,
      });
    });
  });

  describe('CheckboxWrapper', () => {
    describe('small screen', () => {
      const defaultTableProps = {
        indexProps: {condensed: true},
      };

      it('does not render', () => {
        const checkbox = mountWithTable(<Checkbox />, defaultTableProps);

        expect(checkbox).not.toContainReactComponent(CheckboxWrapper);
      });
    });

    describe('large screen', () => {
      const defaultTableProps = {
        indexProps: {condensed: false},
      };

      it('renders', () => {
        const checkbox = mountWithTable(<Checkbox />, defaultTableProps);

        expect(checkbox).toContainReactComponent(CheckboxWrapper);
      });

      it('sets `--pc-checkbox-offset` custom property', () => {
        mountWithTable(<Checkbox />, defaultTableProps);

        expect(setRootPropertySpy).toHaveBeenLastCalledWith(
          '--pc-checkbox-offset',
          '0px',
        );
      });

      it('updates `--pc-checkbox-offset` custom property on resize', () => {
        mountWithTable(<Checkbox />, defaultTableProps);
        setGetBoundingClientRect(200);
        window.dispatchEvent(new Event('resize'));

        expect(setRootPropertySpy).toHaveBeenLastCalledWith(
          '--pc-checkbox-offset',
          '200px',
        );
      });

      it('renders table data', () => {
        const checkbox = mountWithTable(<Checkbox />, defaultTableProps);

        expect(checkbox.find(Checkbox)).toContainReactComponent('td');
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

function triggerCheckboxEvent(
  checkbox: ThenType<ReturnType<typeof mountWithTable>>,
  eventType: any,
  event: {[key: string]: any},
) {
  (
    checkbox
      // We're looking for the Checkbox without the table wrapper to avoid deep filtering
      .find(Checkbox)
      ?.findWhere((el: any) =>
        el.prop('className')?.includes('Wrapper'),
      ) as ElementType<any>
  )?.trigger(eventType, {
    stopPropagation: () => {},
    ...event,
  });
}

const defaultIndexProps: IndexTableProps = {
  headings: [{title: 'first heading'}],
  itemCount: 1,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
};
const defaultRowProps = {
  id: defaultId,
  selected: false,
  position: 0,
};
function mountWithTable(
  children: ReactElement,
  props: {
    indexProps?: Partial<IndexTableProps>;
    rowProps?: Partial<RowProps>;
  } = {},
) {
  const {indexProps, rowProps} = props;
  const table = mountWithApp(
    <IndexTable {...defaultIndexProps} {...indexProps}>
      <Row {...defaultRowProps} {...rowProps}>
        {children}
      </Row>
    </IndexTable>,
  );

  return table;
}
