import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Avatar, Image} from 'components';

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
    const avatar = mountWithAppProvider(<Avatar source={src} />);
    expect(avatar.find(Image)).toHaveLength(0);
  });
});
