import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {Label, labelID} from '../Label';

describe('<Label />', () => {
  describe('id', () => {
    it('uses the ID as the for attribute', () => {
      const label = mountWithApp(<Label id="MyThing" />);
      expect(label).toContainReactComponent('label', {
        htmlFor: 'MyThing',
      });
    });

    it('creates an ID for the label from the ID of the connected resource', () => {
      const label = mountWithApp(<Label id="MyThing" />);
      const id = labelID('MyThing');
      expect(label).toContainReactComponent('label', {
        id,
      });
    });
  });
});
