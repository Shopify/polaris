import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {KeyboardKey} from '../KeyboardKey';

describe('<KeyboardKey />', () => {
  it('renders a kbd element', () => {
    const keyboardKey = mountWithAppProvider(<KeyboardKey>k</KeyboardKey>);
    expect(keyboardKey.find('kbd')).toHaveLength(1);
  });

  it('renders the uppercase version of its children if one character', () => {
    const keyboardKey = mountWithAppProvider(<KeyboardKey>k</KeyboardKey>);
    expect(keyboardKey.find('kbd').contains('K')).toBe(true);
  });

  it('renders the lowercase version of its children if more than one character', () => {
    const keyboardKey = mountWithAppProvider(<KeyboardKey>tab</KeyboardKey>);
    expect(keyboardKey.find('kbd').contains('tab')).toBe(true);
  });

  it('renders an empty string as children when none are provided', () => {
    const keyboardKey = mountWithAppProvider(<KeyboardKey />);
    expect(keyboardKey.text()).toBe('');
  });
});
