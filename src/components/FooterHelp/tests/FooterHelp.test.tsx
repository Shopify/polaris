import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import FooterHelp from '..';
import Icon from '../../Icon';

describe('<FooterHelp />', () => {
  const children = 'Learn more about fulfilling orders';
  const footerHelp = mountWithAppProvider(<FooterHelp>{children}</FooterHelp>);

  it('renders its children', () => {
    expect(footerHelp.contains(children)).toBe(true);
  });

  it('renders the help icon', () => {
    expect(footerHelp.find(Icon).prop('source')).toBe('help');
  });
});
