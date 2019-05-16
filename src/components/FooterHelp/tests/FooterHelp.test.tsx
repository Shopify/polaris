import React from 'react';
import {QuestionMarkMajorTwotone} from '@shopify/polaris-icons';
import {mountWithAppProvider} from 'test-utilities';
import {Icon} from 'components';
import FooterHelp from '../FooterHelp';

describe('<FooterHelp />', () => {
  let children: string;
  let footerHelp: any;

  beforeAll(() => {
    children = 'Learn more about fulfilling orders';
    footerHelp = mountWithAppProvider(<FooterHelp>{children}</FooterHelp>);
  });

  it('renders its children', () => {
    expect(footerHelp.contains(children)).toBe(true);
  });

  it('renders the help icon', () => {
    expect(footerHelp.find(Icon).prop('source')).toBe(QuestionMarkMajorTwotone);
  });
});
