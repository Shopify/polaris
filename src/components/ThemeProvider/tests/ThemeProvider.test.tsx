import React from 'react';
import {mount} from 'tests/utilities';

import {ThemeProvider} from '../ThemeProvider';
import {colorToHsla} from '../../../utilities/color-transformers';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mount(
      <ThemeProvider>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider).not.toBeNull();
  });
});

function isDark(color: string) {
  const {lightness} = colorToHsla(color);
  return Boolean(lightness < 50);
}
