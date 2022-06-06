import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Image} from '../Image';

jest.mock('../../../utilities/use-is-after-initial-mount', () => {
  return {
    useIsAfterInitialMount: () => {
      return false;
    },
  };
});

describe('<Image /> Server-side only', () => {
  it('does not render an Image', () => {
    const image = mountWithApp(<Image source="image/path" alt="" />);
    expect(image).not.toContainReactComponent('img');
  });
});
