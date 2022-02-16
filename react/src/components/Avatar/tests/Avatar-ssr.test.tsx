import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Image} from '../../Image';
import {Avatar} from '../Avatar';

jest.mock('../../../utilities/use-is-after-initial-mount', () => {
  return {
    useIsAfterInitialMount: () => {
      return false;
    },
  };
});

describe('<Avatar /> Server-side only', () => {
  it('does not render an Image', () => {
    const src = 'image/path/';
    const avatar = mountWithApp(<Avatar source={src} />);
    expect(avatar).not.toContainReactComponent(Image);
  });
});
