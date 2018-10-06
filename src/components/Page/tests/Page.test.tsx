import * as React from 'react';
import {shallowWithAppProvider} from 'tests/utilities';
import {LinkAction} from 'src/types';
import {Header} from '../components';
import Page from '../Page';

const breadcrumbs: LinkAction[] = [
  {
    content: 'Products',
    url: 'https://www.google.com',
    target: 'new',
  },
];

describe('<Page />', () => {
  describe('target', () => {
    it('is properly passed down to header', () => {
      const page = shallowWithAppProvider(
        <Page title="Test" breadcrumbs={breadcrumbs} />,
      );
      expect(page.find(Header).prop('breadcrumbs')).toBe(breadcrumbs);
    });
  });
});
