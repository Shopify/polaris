import React from 'react';
import {mountWithApp, mount} from 'tests/utilities';

import {IndexRowContext, IndexSelectionContext, IndexContext} from '../context';
import type {IndexContextType} from '../context';
import {SelectionType} from '../types';
import type {
  BulkSelectionDataOptions,
  HandleBulkSelectionOptions,
} from '../types';
import {
  useIndexRow,
  useIndexSelectionChange,
  useIndexValue,
  useBulkSelectionData,
  useHandleBulkSelection,
} from '../hooks';

interface IndexSelectionChangeTypedChildProps {
  onSelectionChange: ReturnType<typeof useIndexSelectionChange>;
}

interface IndexValueTypedChildProps extends IndexContextType {}

interface BulkSelectionDataTypedChildProps
  extends ReturnType<typeof useBulkSelectionData> {}

interface HandleBulkSelectionTypedChildProps {
  onSelectionChange: ReturnType<typeof useHandleBulkSelection>;
}

describe('useIndexRow', () => {
  it('returns selectMode, condensed, & selectable', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexRow();
      spy(value);
      return null;
    }

    mountWithApp(
      <IndexRowContext.Provider
        value={{selectMode: true, condensed: true, selectable: true}}
      >
        <MockComponent />
      </IndexRowContext.Provider>,
    );

    expect(spy).toHaveBeenCalledWith({
      selectMode: true,
      condensed: true,
      selectable: true,
    });
  });

  it('throws when IndexProvider is not being used', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    function callback() {
      function MockComponent() {
        useIndexRow();
        return null;
      }

      mount(<MockComponent />);
    }

    expect(callback).toThrow(`Missing IndexProvider context`);

    consoleErrorSpy.mockRestore();
  });
});

describe('useIndexSelectionChange', () => {
  function TypedChild(_: IndexSelectionChangeTypedChildProps) {
    return null;
  }
  function MockComponent() {
    const onSelectionChange = useIndexSelectionChange();

    return <TypedChild onSelectionChange={onSelectionChange} />;
  }

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('throws when IndexSelectionChangeContext is missing', () => {
    function throwMissingContext() {
      mount(<MockComponent />);
    }

    expect(throwMissingContext).toThrow('Missing IndexProvider context');
  });

  it('returns onSelectionChange', () => {
    const contextSpy = jest.fn();
    const mockComponent = mount(
      <IndexSelectionContext.Provider value={contextSpy}>
        <MockComponent />
      </IndexSelectionContext.Provider>,
    );

    expect(mockComponent).toContainReactComponent(TypedChild, {
      onSelectionChange: contextSpy,
    });
  });
});

describe('useIndexValue', () => {
  function TypedChild(_: IndexValueTypedChildProps) {
    return null;
  }
  function MockComponent() {
    const contextValues = useIndexValue();

    return <TypedChild {...contextValues} />;
  }

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('throws when IndexContext is missing', () => {
    function throwMissingContext() {
      mount(<MockComponent />);
    }

    expect(throwMissingContext).toThrow('Missing IndexProvider context');
  });

  it('returns index context values', () => {
    const contextValues = {
      resourceName: {singular: 'singular', plural: 'plural'},
      selectedItemsCount: 0,
      selectMode: false,
      itemCount: 3,
    };
    const mockComponent = mount(
      <IndexContext.Provider value={contextValues}>
        <MockComponent />
      </IndexContext.Provider>,
    );

    expect(mockComponent).toContainReactComponent(TypedChild, contextValues);
  });
});

describe('useBulkSelectionData', () => {
  function TypedChild(_: BulkSelectionDataTypedChildProps) {
    return null;
  }
  function MockComponent(options: Partial<BulkSelectionDataOptions>) {
    const contextValues = useBulkSelectionData({
      selectedItemsCount: 0,
      itemCount: 4,
      hasMoreItems: true,
      resourceName: {
        singular: 'test',
        plural: 'tests',
      },
      ...options,
    });

    return <TypedChild {...contextValues} />;
  }

  it('returns paginated select all text when all resources are selected', () => {
    const itemCount = 4;
    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
    const paginatedSelectAllText = `All ${itemCount}+ ${resourceName.plural} are selected`;
    const mockComponent = mountWithApp(
      <MockComponent
        selectedItemsCount="All"
        hasMoreItems
        itemCount={itemCount}
        resourceName={resourceName}
      />,
    );

    expect(mockComponent).toContainReactComponent(TypedChild, {
      paginatedSelectAllText,
    });
  });
});

describe('useHandleBulkSelection', () => {
  function TypedChild(_: HandleBulkSelectionTypedChildProps) {
    return null;
  }
  function MockComponent(options: HandleBulkSelectionOptions) {
    const contextValue = useHandleBulkSelection(options);

    return <TypedChild onSelectionChange={contextValue} />;
  }

  it('selects ranges with shift key selection', () => {
    const onSelectionChangeSpy = jest.fn();
    const mockComponent = mount(
      <MockComponent onSelectionChange={onSelectionChangeSpy} />,
    );

    const typedChild = mockComponent.find(TypedChild)!;

    // First selection cannot be multi
    typedChild.trigger(
      'onSelectionChange',
      SelectionType.Multi,
      true,
      undefined,
      3,
    );

    typedChild.trigger(
      'onSelectionChange',
      SelectionType.Multi,
      true,
      undefined,
      4,
    );

    expect(onSelectionChangeSpy).toHaveBeenLastCalledWith(
      SelectionType.Multi,
      true,
      [3, 4],
    );
  });

  it('selects ranges with subheader selection', () => {
    const onSelectionChangeSpy = jest.fn();
    const mockComponent = mount(
      <MockComponent onSelectionChange={onSelectionChangeSpy} />,
    );

    const typedChild = mockComponent.find(TypedChild)!;

    typedChild.trigger('onSelectionChange', SelectionType.Range, true, [1, 3]);

    expect(onSelectionChangeSpy).toHaveBeenLastCalledWith(
      SelectionType.Range,
      true,
      [1, 3],
    );
  });
});
