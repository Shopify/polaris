import React from 'react';
import {mountWithApp} from 'test-utilities';

import {ListBoxContext} from '../../../../../../../utilities/list-box';
import {Loading} from '../Loading';

const listBoxContext = {
  addNavigableOption: noop,
  updateNavigableOption: noop,
  removeNavigableOption: noop,
  onOptionSelect: noop,
  setLoading: noop,
};

describe('Loading', () => {
  const defaultProps = {accessibilityLabel: 'accessibility label'};

  it('throws if not inside a listBox Context', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithApp(<Loading {...defaultProps} />)).toThrow(
      'No ListBox was provided. ListBox components must be wrapped in a Listbox',
    );

    consoleErrorSpy.mockRestore();
  });

  it('calls setLoading on context with the default loading text if there is no accessibilityLabel', () => {
    const accessibilityLabel = 'label';
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    mountWithApp(
      <ListBoxContext.Provider value={contextValue}>
        <Loading accessibilityLabel={accessibilityLabel} />
      </ListBoxContext.Provider>,
    );

    expect(setLoadingSpy).toHaveBeenCalledWith(accessibilityLabel);
  });

  it('calls setLoading on context with the accessibilityLabel', () => {
    const accessibilityLabel = 'label';
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    mountWithApp(
      <ListBoxContext.Provider value={contextValue}>
        <Loading accessibilityLabel={accessibilityLabel} />
      </ListBoxContext.Provider>,
    );

    expect(setLoadingSpy).toHaveBeenCalledWith(accessibilityLabel);
  });

  it('calls setLoading with undefined when it unmounts', () => {
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    const listbox = mountWithApp(
      <ListBoxContext.Provider value={contextValue}>
        <Loading {...defaultProps} />
      </ListBoxContext.Provider>,
    );

    listbox.find(Loading)!.root.unmount();

    expect(setLoadingSpy).toHaveBeenCalledWith(undefined);
  });
});

function noop() {}
