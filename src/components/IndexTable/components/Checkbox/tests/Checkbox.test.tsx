import React, {ReactElement} from 'react';
import type {ThenType} from '@shopify/useful-types';
import {mountWithApp} from 'test-utilities';

import {Checkbox as PolarisCheckbox} from '../../../../Checkbox';
import {IndexProvider, IndexProviderProps} from '../../../../IndexProvider';
import {IndexTable, IndexTableProps} from '../../../IndexTable';
import {Row, RowProps} from '../../Row';
import {Cell} from '../../Cell';
import {Checkbox} from '../Checkbox';

const defaultId = 'id';

describe('<Cell />', () => {
  it('renders a Checkbox with a id', () => {
    const id = 'id';
    const checkbox = mountWithTable(<Checkbox />, {rowProps: {id}});

    expect(checkbox).toContainReactComponent(PolarisCheckbox, {id});
  });

  it('renders a Checkbox with a label', () => {
    const resourceName = {singular: 'Singular', plural: 'Plural'};
    const checkbox = mountWithTable(<Checkbox />, {
      providerProps: {resourceName},
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

  it('prevents onChange propagation', () => {
    let stopPropagationSpy = false;
    const checkbox = mountWithTable(<Checkbox />);

    triggerCheckboxEvent(checkbox, 'onChange', {
      stopPropagation: () => {
        stopPropagationSpy = true;
      },
    });

    expect(stopPropagationSpy).toBe(true);
  });

  it('toggles the checkbox value when clicked', () => {
    const onSelectionChange = jest.fn();
    const checkbox = mountWithTable(<Checkbox />, {
      providerProps: {onSelectionChange},
      rowProps: {selected: true},
    });

    triggerCheckboxEvent(checkbox, 'onClick', {
      nativeEvent: {shiftKey: false},
    });

    expect(onSelectionChange).toHaveBeenCalledWith('single', false, defaultId);
  });

  it('toggles the checkbox when spacebar is pressed', () => {
    const onSelectionChange = jest.fn();
    const checkbox = mountWithTable(<Checkbox />, {
      providerProps: {onSelectionChange},
      rowProps: {selected: true},
    });

    triggerCheckboxEvent(checkbox, 'onKeyUp', {
      key: ' ',
      nativeEvent: {shiftKey: false},
    });

    expect(onSelectionChange).toHaveBeenCalledWith('single', false, defaultId);
  });
});

function triggerCheckboxEvent(
  checkbox: ThenType<ReturnType<typeof mountWithTable>>,
  eventType: any,
  event: {[key: string]: any},
) {
  checkbox
    // We're looking for the Checkbox without the table wrapper to avoid deep filtering
    .find(Checkbox)
    ?.findAll('div')[1]
    ?.trigger(eventType, {
      stopPropagation: () => {},
      ...event,
    });
}

const defaultProviderProps = {
  itemCount: 1,
  selectedItemsCount: 0,
};
const defaultIndexProps = {
  headings: [{title: 'first heading'}],
};
const defaultRowProps = {
  id: defaultId,
  selected: false,
  position: 0,
};
function mountWithTable(
  children: ReactElement,
  props: {
    providerProps?: Partial<IndexProviderProps>;
    indexProps?: Partial<IndexTableProps>;
    rowProps?: Partial<RowProps>;
  } = {},
) {
  const {providerProps, indexProps, rowProps} = props;
  const table = mountWithApp(
    <IndexProvider {...defaultProviderProps} {...providerProps}>
      <IndexTable {...defaultIndexProps} {...indexProps}>
        <Row {...defaultRowProps} {...rowProps}>
          <Cell>{children}</Cell>
        </Row>
      </IndexTable>
    </IndexProvider>,
  );

  return table;
}
