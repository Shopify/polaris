import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {FooterHelp} from '../FooterHelp';

describe('<FooterHelp />', () => {
  const children = 'Learn more about fulfilling orders';

  it('renders its children', () => {
    const footerHelp = mountWithApp(<FooterHelp>{children}</FooterHelp>);
    expect(footerHelp).toHaveReactProps({
      children,
    });
  });
});
