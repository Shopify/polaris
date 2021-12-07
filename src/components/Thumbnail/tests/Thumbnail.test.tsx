import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {NoteMajor} from '@shopify/polaris-icons';

import {Thumbnail} from '../Thumbnail';

describe('<Thumbnail />', () => {
  describe('source', () => {
    it('allows icon for source', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source={NoteMajor} />);
      expect(thumbnail).toContainReactComponent(NoteMajor);
    });

    it('creates an image tag when a string is provided', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source="abc.jpg" />);
      expect(thumbnail).toContainReactComponent('img');
    });
  });
});
