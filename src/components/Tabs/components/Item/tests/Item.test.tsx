import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import Item from '../Item';
import UnstyledLink from '../../../../UnstyledLink';

describe('<Item />', () => {
  const mockProps = {
    id: 'foo',
    focused: false,
  };

  it('renders UnstyledLink when item has url', () => {
    const url = 'http://shopify.com';

    const item = mountWithAppProvider(<Item {...mockProps} url={url} />);

    expect(item.find(UnstyledLink).exists()).toBe(true);
    expect(item.find('button').exists()).toBe(false);
  });

  it('renders button when item does not have url', () => {
    const item = mountWithAppProvider(<Item {...mockProps} url={undefined} />);

    expect(item.find('button').exists()).toBe(true);
    expect(item.find(UnstyledLink).exists()).toBe(false);
  });
});
