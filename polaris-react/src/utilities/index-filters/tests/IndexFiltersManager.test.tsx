import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {IndexFiltersMode} from '../types';
import {IndexFiltersManager} from '../IndexFiltersManager';
import {useSetIndexFiltersMode} from '../hooks';

describe('<IndexFiltersManager />', () => {
  it('renders children with the context value', () => {
    const ChildComponent = () => {
      const {mode, setMode} = useSetIndexFiltersMode();
      return (
        <div>
          <span id="mode">{mode}</span>
          <button
            id="default"
            onClick={() => setMode(IndexFiltersMode.Default)}
          >
            Change Mode to Default
          </button>
          <button
            id="filtering"
            onClick={() => setMode(IndexFiltersMode.Filtering)}
          >
            Change Mode to Filtering
          </button>
          <button
            id="editing-columns"
            onClick={() => setMode(IndexFiltersMode.EditingColumns)}
          >
            Change Mode to Editing Columns
          </button>
        </div>
      );
    };

    const wrapper = mountWithApp(
      <IndexFiltersManager>
        <ChildComponent />
      </IndexFiltersManager>,
    );

    const modeElement = wrapper.find('span', {
      id: 'mode',
    });
    const defaultButton = wrapper.find('button', {
      id: 'default',
    });
    const filteringButton = wrapper.find('button', {
      id: 'filtering',
    });
    const editingButton = wrapper.find('button', {
      id: 'editing-columns',
    });
    expect(modeElement?.text()).toBe(IndexFiltersMode.Default);

    wrapper.act(() => {
      filteringButton?.trigger('onClick');
    });

    expect(modeElement?.text()).toBe(IndexFiltersMode.Filtering);

    wrapper.act(() => {
      editingButton?.trigger('onClick');
    });

    expect(modeElement?.text()).toBe(IndexFiltersMode.EditingColumns);

    wrapper.act(() => {
      defaultButton?.trigger('onClick');
    });

    expect(modeElement?.text()).toBe(IndexFiltersMode.Default);
  });
});
