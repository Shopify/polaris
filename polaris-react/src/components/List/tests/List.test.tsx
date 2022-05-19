import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {List} from '../List';

describe('<List />', () => {
  it('renders its children', () => {
    const list = mountWithApp(<List>test</List>);
    expect(list).toContainReactText('test');
  });

  describe('type', () => {
    it('sets the list type to ul when is a bullet list', () => {
      const list = mountWithApp(<List type="bullet">test</List>);
      expect(list).toContainReactComponent('ul');
    });

    it('sets the list type to ul when no type is provided', () => {
      const list = mountWithApp(<List>test</List>);
      expect(list).toContainReactComponent('ul');
    });

    it('sets the list type to ol when is a number list', () => {
      const list = mountWithApp(<List type="number">test</List>);
      expect(list).toContainReactComponent('ol');
    });
  });
});
