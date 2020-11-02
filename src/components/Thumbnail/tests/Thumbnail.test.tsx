import React from 'react';
import {mountWithApp} from 'test-utilities/react-testing';
import {NoteMajor} from '@shopify/polaris-icons';

import {Thumbnail} from '../Thumbnail';

describe('<Thumbnail />', () => {
  describe('source', () => {
    it('allows icon for source', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source={NoteMajor} />);
      thumbnail.find(NoteMajor);
    });

    it('creates an image tag when a string is provided', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source="abc.jpg" />);
      thumbnail.find('img');
    });
  });
});
