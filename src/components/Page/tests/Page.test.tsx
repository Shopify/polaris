import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Card, DisplayText} from 'components';
import {LinkAction} from 'types';
import {Header} from '../components';
import Page from '../Page';

const breadcrumbs: LinkAction[] = [
  {
    content: 'Products',
    url: 'https://www.google.com',
    target: 'new',
  },
];

const mockProps = {
  title: 'Test',
  breadcrumbs,
};

describe('<Page />', () => {
  it('renders its children', () => {
    const page = mountWithAppProvider(
      <Page {...mockProps}>
        <Card />
      </Page>,
    );
    expect(page.find(Card).exists()).toBe(true);
  });

  it('renders the title and displays the correct title text', () => {
    const page = mountWithAppProvider(<Page {...mockProps} />);
    expect(page.find(DisplayText)).toHaveLength(1);
    expect(page.find(DisplayText).text()).toBe('Test');
  });

  describe('Header', () => {
    it('renders a Header', () => {
      const page = mountWithAppProvider(<Page {...mockProps} />);
      expect(page.find(Header)).toHaveLength(1);
    });

    it('passes breadcrumbs down to Header', () => {
      const page = mountWithAppProvider(<Page {...mockProps} />);
      expect(page.find(Header).prop('breadcrumbs')).toEqual(breadcrumbs);
    });
  });
});
