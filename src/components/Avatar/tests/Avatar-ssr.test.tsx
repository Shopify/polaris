import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Image} from 'components';
import Avatar from '../Avatar';

jest.mock('../../../utilities/target', () => ({
  get isServer() {
    return true;
  },
}));

describe('<Avatar /> Server-side only', () => {
  it('does not render an Image', () => {
    const src = 'image/path/';
    const avatar = mountWithAppProvider(<Avatar source={src} />);
    expect(avatar.find(Image)).toHaveLength(0);
  });
});
