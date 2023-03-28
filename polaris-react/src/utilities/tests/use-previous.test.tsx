import React from 'react';
import {mount} from 'tests/utilities';

import {usePrevious} from '../use-previous';

describe('usePrevious', () => {
  function Score({value}: {value: number}) {
    const previousValue = usePrevious(value);
    const newRecord =
      previousValue && value > previousValue ? (
        <p>We have a new record!</p>
      ) : null;

    return (
      <>
        <p>Current score: {value}</p>
        {newRecord}
      </>
    );
  }

  it('returns undefined initially', () => {
    const value = 100;

    const wrapper = mount(<Score value={value} />);

    expect(wrapper).toContainReactText(`Current score: ${value}`);
    expect(wrapper).not.toContainReactText('We have a new record!');
  });

  it('displays previous value after updating value', () => {
    const value = 100;
    const nextValue = 200;

    const wrapper = mount(<Score value={value} />);

    wrapper.setProps({value: nextValue});

    expect(wrapper).toContainReactText(`Current score: ${nextValue}`);
    expect(wrapper).toContainReactText('We have a new record!');
  });
});
