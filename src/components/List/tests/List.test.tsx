import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {List} from '../List';

describe('<List />', () => {
  it('renders its children', () => {
    const list = mountWithAppProvider(<List>test</List>);
    expect(list.contains('test')).toBe(true);
  });

  describe('type', () => {
    it('sets the list type to ul when is a bullet list', () => {
      const list = mountWithAppProvider(<List type="bullet">test</List>);
      expect(list.find('ul').exists()).toBeTruthy();
    });

    it('sets the list type to ul when no type is provided', () => {
      const list = mountWithAppProvider(<List>test</List>);
      expect(list.find('ul').exists()).toBeTruthy();
    });

    it('sets the list type to ol when is a number list', () => {
      const list = mountWithAppProvider(<List type="number">test</List>);
      expect(list.find('ol').exists()).toBeTruthy();
    });
  });
});
