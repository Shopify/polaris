import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import List from '..';

describe('<List />', () => {
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
