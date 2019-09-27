import React from 'react';
import {mountWithApp} from 'test-utilities';
import {useFeatures} from '../hooks';

function Component() {
  const features = useFeatures();
  const {foo} = features;

  return foo ? <div /> : null;
}

describe('useFeatures', () => {
  it('returns context', () => {
    const component = mountWithApp(<Component />, {
      features: {foo: true},
    });
    expect(component).toContainReactComponent('div');
  });
});
