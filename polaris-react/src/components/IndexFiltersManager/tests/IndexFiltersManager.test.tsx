import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  useIndexFiltersManager,
  IndexFiltersMode,
} from '../../../utilities/index-filters';

function Component() {
  const {mode, setMode} = useIndexFiltersManager();

  return (
    <>
      <button onClick={() => setMode(IndexFiltersMode.Default)} id="default">
        Set default
      </button>
      <button
        onClick={() => setMode(IndexFiltersMode.Filtering)}
        id="filtering"
      >
        Set filtering
      </button>
      <button
        onClick={() => setMode(IndexFiltersMode.EditingColumns)}
        id="editing-columns"
      >
        Set editing columns
      </button>
      <div data-mode={mode}>{mode}</div>
    </>
  );
}

describe('<IndexFiltersManager />', () => {
  it('returns a value of Default on mount', () => {
    const wrapper = mountWithApp(<Component />);
    expect(wrapper).toContainReactComponent('div', {
      children: IndexFiltersMode.Default,
    });
  });
});
