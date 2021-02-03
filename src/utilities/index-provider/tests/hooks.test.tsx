import React from 'react';
import {mountWithApp, mount} from 'test-utilities';

import {
  IndexRowContext,
  IndexSelectionChangeContext,
  IndexContextType,
  IndexContext,
} from '../context';
import {useIndexRow, useIndexSelectionChange, useIndexValue} from '../hooks';

interface IndexSelectionChangeTypedChildProps {
  onSelectionChange: ReturnType<typeof useIndexSelectionChange>;
}

interface IndexValueTypedChildProps extends IndexContextType {}

describe('useIndexRow', () => {
  it('returns selectMode & condensed', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexRow();
      spy(value);
      return null;
    }

    mountWithApp(
      <IndexRowContext.Provider value={{selectMode: true, condensed: true}}>
        <MockComponent />
      </IndexRowContext.Provider>,
    );

    expect(spy).toHaveBeenCalledWith({selectMode: true, condensed: true});
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
      <IndexSelectionChangeContext.Provider value={contextSpy}>
        <MockComponent />
      </IndexSelectionChangeContext.Provider>,
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
