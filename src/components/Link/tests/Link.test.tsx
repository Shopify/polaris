import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {UnstyledLink} from 'components';
import Link from '../Link';

describe('<Link />', () => {
  it('calls onClick when clicking', () => {
    const spy = jest.fn();
    const link = mountWithAppProvider(<Link url="MyThing" onClick={spy} />);
    link.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a button if no url is provided', () => {
    const link = mountWithAppProvider(<Link />);
    const button = link.find('button').first();
    expect(button.exists()).toBe(true);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mountWithAppProvider(<Link url="MyThing" />);
    const anchor = link.find(UnstyledLink).first();
    expect(anchor.exists()).toBe(true);
  });

  describe('id', () => {
    it('is passed down to an underlying button', () => {
      const id = 'MyID';
      const link = mountWithAppProvider(<Link id={id} />);
      expect(link.find('button').prop('id')).toBe(id);
    });

    it('is passed down to an underlying UnstyledLink', () => {
      const id = 'MyID';
      const link = mountWithAppProvider(
        <Link url="https://shopify.com" id={id} />,
      );
      expect(link.find(UnstyledLink).prop('id')).toBe(id);
    });
  });
});
