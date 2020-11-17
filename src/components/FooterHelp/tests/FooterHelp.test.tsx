import React from 'react';
import {QuestionMarkMajor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Icon} from 'components';

import {FooterHelp} from '../FooterHelp';

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
    expect(footerHelp.find(Icon).prop('source')).toBe(QuestionMarkMajor);
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const footerHelp = mountWithApp(<FooterHelp />, {
        features: {newDesignLanguage: true},
      });
      expect(footerHelp).toContainReactComponent('div', {
        className: 'FooterHelp newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled', () => {
      const footerHelp = mountWithApp(<FooterHelp />, {
        features: {newDesignLanguage: false},
      });
      expect(footerHelp).not.toContainReactComponent('div', {
        className: 'FooterHelp newDesignLanguage',
      });
    });
  });
});
