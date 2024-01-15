import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {NoteIcon} from '@shopify/polaris-icons';

import {Thumbnail} from '../Thumbnail';

describe('<Thumbnail />', () => {
  describe('source', () => {
    it('allows icon for source', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source={NoteIcon} />);
      expect(thumbnail).toContainReactComponent(NoteIcon);
    });

    it('creates an image tag when a string is provided', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source="abc.jpg" />);
      expect(thumbnail).toContainReactComponent('img');
    });
  });

  describe('transparent', () => {
    it('adds transparent class when transparent is true', () => {
      const thumbnail = mountWithApp(<Thumbnail alt="" source="abc.jpg" />);

      expect(thumbnail).toContainReactComponent('span', {
        className: 'Thumbnail sizeMedium',
      });

      thumbnail.setProps({transparent: true});

      expect(thumbnail).toContainReactComponent('span', {
        className: 'Thumbnail sizeMedium transparent',
      });
    });
  });
});
