import React from 'react';

import {mountWithApp} from 'test-utilities';
import {List} from '../List';
import {Manager} from '../../Manager';

const defaultManagerProps = {
  hasItemsSelected: false,
};

describe('List', () => {
  const Child = () => null;

  it('renders children', () => {
    const list = mountWithApp(
      <Manager {...defaultManagerProps}>
        <List>
          <Child />
        </List>
      </Manager>,
    );

    expect(list).toContainReactComponent(Child);
  });

  describe('valid html', () => {
    it('renders an unordered list', () => {
      const list = mountWithApp(
        <Manager {...defaultManagerProps}>
          <List>
            <Child />
          </List>
        </Manager>,
      );

      expect(list).toContainReactComponent('ul');
    });
  });

  describe('accessibility', () => {
    it('uses the aria-live attribute', () => {
      const list = mountWithApp(
        <Manager {...defaultManagerProps}>
          <List>
            <Child />
          </List>
        </Manager>,
      );

      expect(list).toContainReactComponent('ul', {'aria-live': 'polite'});
    });

    it('uses the aria-busy attribute', () => {
      const list = mountWithApp(
        <Manager {...defaultManagerProps}>
          <List>
            <Child />
          </List>
        </Manager>,
      );

      expect(list).toContainReactComponent('ul', {'aria-busy': false});
    });
  });
});
