import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {UnstyledLink} from '../../UnstyledLink';
import {Link} from '../Link';

describe('<Link />', () => {
  it('calls onClick when clicking', () => {
    const spy = jest.fn();
    const link = mountWithApp(<Link href="MyThing" onClick={spy} />);
    link.find('a')!.trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a button if no url is provided', () => {
    const link = mountWithApp(<Link />);
    expect(link).toContainReactComponentTimes('button', 1);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mountWithApp(<Link href="MyThing" />);
    expect(link).toContainReactComponentTimes('a', 1);
  });

  describe('id', () => {
    it('is passed down to an underlying button', () => {
      const id = 'MyID';
      const link = mountWithApp(<Link id={id} />);
      expect(link).toContainReactComponent('button', {id});
    });

    it('is passed down to an underlying UnstyledLink', () => {
      const id = 'MyID';
      const link = mountWithApp(<Link href="https://shopify.com" id={id} />);
      expect(link).toContainReactComponent(UnstyledLink, {id});
    });
  });

  describe('target', () => {
    it('adds target blank and noopener noreferrer', () => {
      const link = mountWithApp(
        <Link href="https://help.shopify.com/" target="_blank">
          Shopify Help Center
        </Link>,
      );
      const htmlLink = link.find('a');

      expect(htmlLink?.props.target).toBe('_blank');
      expect(htmlLink?.props.rel).toBe('noopener noreferrer');
    });
  });

  describe('monochrome link', () => {
    it('outputs a monochrome link', () => {
      const link = mountWithApp(
        <Link href="https://examp.le" tone="inherit">
          Some content
        </Link>,
      );

      expect(link).toContainReactComponent(UnstyledLink, {
        className: expect.stringContaining('inherit'),
      });
    });

    it('outputs a monochrome button', () => {
      const button = mountWithApp(<Link tone="inherit">Some content</Link>);

      expect(button).toContainReactComponent('button', {
        className: expect.stringContaining('inherit'),
      });
    });
  });

  describe('accessibilityLabel', () => {
    it('passes prop to the button url is not provided', () => {
      const mockAccessibilityLabel = 'mock accessibility label';
      const link = mountWithApp(
        <Link accessibilityLabel={mockAccessibilityLabel} />,
      );

      expect(link).toContainReactComponent('button', {
        'aria-label': mockAccessibilityLabel,
      });
    });

    it('passes the accessibilityLabel to UnstyledLink when url is present', () => {
      const mockAccessibilityLabel = 'mock accessibility label';

      const link = mountWithApp(
        <Link
          href="https://shopify.com"
          accessibilityLabel={mockAccessibilityLabel}
        />,
      );

      expect(link).toContainReactComponent(UnstyledLink, {
        'aria-label': mockAccessibilityLabel,
      });
    });
  });

  describe('underline always', () => {
    it('adds underline class to the link', () => {
      const link = mountWithApp(<Link underline="always">Test</Link>);

      expect(link).toContainReactComponent('button', {
        className: expect.stringContaining('underline'),
      });
    });
  });

  describe('dataPrimaryLink', () => {
    it('adds data-primary-link attribute to the link', () => {
      const link = mountWithApp(
        <Link href="https://examp.le" dataPrimaryLink>
          Test
        </Link>,
      );

      const selector: any = {
        'data-primary-link': true,
      };
      expect(link).toContainReactComponent('a', selector);
    });

    it('adds data-primary-link attribute to the button', () => {
      const link = mountWithApp(<Link dataPrimaryLink>Test</Link>);

      const selector: any = {
        'data-primary-link': true,
      };
      expect(link).toContainReactComponent('button', selector);
    });
  });

  describe('language', () => {
    it('language is passed down', () => {
      const link = mountWithApp(
        <Link href="https://help.shopify.com/" language="it">
          Centro assistenza Shopify
        </Link>,
      );
      const htmlLink = link.find('a');

      expect(htmlLink?.props.lang).toBe('it');
    });
  });
});
