import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Breadcrumbs} from 'components';
import {LinkAction} from '../../../../../types';
import Header from '../Header';

const breadcrumbs: LinkAction[] = [
  {
    content: 'Products',
    url: 'https://www.google.com',
    target: 'REMOTE',
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
