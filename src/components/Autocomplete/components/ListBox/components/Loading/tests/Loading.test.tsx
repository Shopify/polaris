import React from 'react';
import {mountWithAppContext} from 'tests/modern';
import {mockI18n} from '@shopify/react-i18n-next';
import {noop} from '@web-utilities/other';

import {ListBoxContext} from '../../../utilities/context/list-box';
import translations from '../../../translations/en.json';
import {Loading} from '../Loading';

const listBoxContext = {
  addNavigableOption: noop,
  updateNavigableOption: noop,
  removeNavigableOption: noop,
  onOptionSelect: noop,
  setLoading: noop,
};

describe('Loading', () => {
  const i18n = mockI18n([translations]);

  it('throws if not inside a listBox Context', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithAppContext(<Loading />)).toThrow(
      'No ListBox was provided. ListBox components must be wrapped in a Listbox',
    );

    consoleErrorSpy.mockRestore();
  });

  it('calls setLoading on context with the default loading text if there is no accessibilityLabel', async () => {
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    await mountWithAppContext(
      <ListBoxContext.Provider value={contextValue}>
        <Loading />
      </ListBoxContext.Provider>,
      {
        translations: [translations],
      },
    );

    expect(setLoadingSpy).toHaveBeenCalledWith(
      i18n.translate('ListBox.Loading.label'),
    );
  });

  it('calls setLoading on context with the accessibilityLabel', async () => {
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    await mountWithAppContext(
      <ListBoxContext.Provider value={contextValue}>
        <Loading accessibilityLabel="Loading..." />
      </ListBoxContext.Provider>,
      {
        translations: [translations],
      },
    );

    expect(setLoadingSpy).toHaveBeenCalledWith('Loading...');
  });

  it('calls setLoading with undefined when it unmounts', async () => {
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listBoxContext,
      setLoading: setLoadingSpy,
    };
    const listbox = await mountWithAppContext(
      <ListBoxContext.Provider value={contextValue}>
        <Loading accessibilityLabel="Loading..." />
      </ListBoxContext.Provider>,
      {
        translations: [translations],
      },
    );

    listbox.find(Loading)!.root.unmount();

    expect(setLoadingSpy).toHaveBeenCalledWith(undefined);
  });
});
