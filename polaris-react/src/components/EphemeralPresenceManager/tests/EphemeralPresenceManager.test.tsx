import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {useEphemeralPresenceManager} from '../../../utilities/ephemeral-presence-manager';

const Component = () => {
  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

  function addTooltipPresence() {
    addPresence('tooltip');
  }
  function removeTooltipPresence() {
    removePresence('tooltip');
  }
  return (
    <>
      <button id="ephemeral-presence-manager-add" onClick={addTooltipPresence}>
        Add presence
      </button>
      <button
        id="ephemeral-presence-manager-remove"
        onClick={removeTooltipPresence}
      >
        Remove presence
      </button>
      <div>{presenceList.tooltip}</div>
    </>
  );
};

describe('<EphemeralPresenceManager />', () => {
  it('returns a value of zero on mount', () => {
    const wrapper = mountWithApp(<Component />);

    expect(wrapper.find('div')!.text()).toBe('0');
  });

  it('increments by one when addPresence is called', () => {
    const wrapper = mountWithApp(<Component />);
    const addButton = wrapper.find('button', {
      id: 'ephemeral-presence-manager-add',
    });

    wrapper.act(() => {
      addButton!.trigger('onClick');
    });

    expect(wrapper.find('div')!.text()).toBe('1');
  });

  it('decrements by one when removePresence is called', () => {
    const wrapper = mountWithApp(<Component />);
    const addButton = wrapper.find('button', {
      id: 'ephemeral-presence-manager-add',
    });

    const removeButton = wrapper.find('button', {
      id: 'ephemeral-presence-manager-remove',
    });

    wrapper.act(() => {
      addButton!.trigger('onClick');
    });

    expect(wrapper.find('div')!.text()).toBe('1');

    wrapper.act(() => {
      removeButton!.trigger('onClick');
    });

    expect(wrapper.find('div')!.text()).toBe('0');
  });
});
