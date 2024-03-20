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

  it('overrides custom properties if they are passed in', () => {
    const footerHelp = mountWithApp(
      <FooterHelp align="start">{children}</FooterHelp>,
    );

    expect(footerHelp).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--p-footer-help-align': 'start',
      }) as React.CSSProperties,
    });
  });
});
