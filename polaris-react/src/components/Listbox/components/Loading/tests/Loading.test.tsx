import {mountWithApp} from 'tests/utilities';

import {ListboxContext} from '../../../../../utilities/listbox';
import {Loading} from '../Loading';
import {Spinner} from '../../../../Spinner';

const listboxContext = {
  addNavigableOption: noop,
  updateNavigableOption: noop,
  removeNavigableOption: noop,
  onOptionSelect: noop,
  setLoading: noop,
};

describe('Loading', () => {
  const defaultProps = {accessibilityLabel: 'accessibility label'};

  it('throws if not inside a listbox Context', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithApp(<Loading {...defaultProps} />)).toThrow(
      'No Listbox was provided. Listbox components must be wrapped in a Listbox',
    );

    consoleErrorSpy.mockRestore();
  });

  it('renders children instead of default spinner when passed', () => {
    const accessibilityLabel = 'label';
    const customLoadingState = 'customLoadingState';
    const loading = mountWithApp(
      <ListboxContext.Provider value={listboxContext}>
        <Loading accessibilityLabel={accessibilityLabel}>
          <div>{customLoadingState}</div>
        </Loading>
      </ListboxContext.Provider>,
    );

    expect(loading).toContainReactComponent('div', {
      children: customLoadingState,
    });
    expect(loading).not.toContainReactComponent(Spinner);
  });

  it('calls setLoading on context with the default loading text if there is no accessibilityLabel', () => {
    const accessibilityLabel = 'label';
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listboxContext,
      setLoading: setLoadingSpy,
    };
    mountWithApp(
      <ListboxContext.Provider value={contextValue}>
        <Loading accessibilityLabel={accessibilityLabel} />
      </ListboxContext.Provider>,
    );

    expect(setLoadingSpy).toHaveBeenCalledWith(accessibilityLabel);
  });

  it('calls setLoading on context with the accessibilityLabel', () => {
    const accessibilityLabel = 'label';
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listboxContext,
      setLoading: setLoadingSpy,
    };
    mountWithApp(
      <ListboxContext.Provider value={contextValue}>
        <Loading accessibilityLabel={accessibilityLabel} />
      </ListboxContext.Provider>,
    );

    expect(setLoadingSpy).toHaveBeenCalledWith(accessibilityLabel);
  });

  it('calls setLoading with undefined when it unmounts', () => {
    const setLoadingSpy = jest.fn();
    const contextValue = {
      ...listboxContext,
      setLoading: setLoadingSpy,
    };
    const listbox = mountWithApp(
      <ListboxContext.Provider value={contextValue}>
        <Loading {...defaultProps} />
      </ListboxContext.Provider>,
    );

    listbox.find(Loading)!.root.unmount();

    expect(setLoadingSpy).toHaveBeenCalledWith(undefined);
  });
});

function noop() {}
