import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import KeyboardKey from '../KeyboardKey';

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
});
