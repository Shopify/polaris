import React from 'react';
import {mountWithApp} from 'test-utilities';
import {useSettings} from '../hooks';

function Component() {
  const settings = useSettings();
  const featureFoo = settings != null ? settings.featureFoo : false;

  return featureFoo ? <div /> : null;
}

describe('useSettings', () => {
  it('returns context', () => {
    const component = mountWithApp(<Component />, {
      settings: {featureFoo: true},
    });
    expect(component).toContainReactComponent('div');
  });
});
