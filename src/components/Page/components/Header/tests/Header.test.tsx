import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {LinkAction} from 'src/types';
import {Breadcrumbs} from 'src/components';
import Header from '../Header';

const breadcrumbs: LinkAction[] = [
  {
    content: 'Products',
    url: 'https://www.google.com',
    target: 'new',
  },
];

describe('<Header />', () => {
  describe('target', () => {
    it('is properly passed down to header', () => {
      const header = mountWithAppProvider(
        <Header title="Test" breadcrumbs={breadcrumbs} />,
      );
      expect(header.find(Breadcrumbs).prop('breadcrumbs')).toBe(breadcrumbs);
    });
  });
});
