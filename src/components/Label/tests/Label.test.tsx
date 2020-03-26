import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Label, labelID} from '../Label';

describe('<Label />', () => {
  describe('id', () => {
    it('uses the ID as the for attribute', () => {
      const label = mountWithAppProvider(<Label id="MyThing" />);
      expect(label.find('label').prop('htmlFor')).toBe('MyThing');
    });

    it('creates an ID for the label from the ID of the connected resource', () => {
      const label = mountWithAppProvider(<Label id="MyThing" />);
      const id = labelID('MyThing');
      expect(label.find('label').prop('id')).toBe(id);
    });
  });
});
