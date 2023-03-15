import {mountWithApp} from 'tests/utilities';

import {Banner} from '../../Banner';
import {UnstyledLink} from '../../UnstyledLink';
import {Link} from '../Link';

describe('<Link />', () => {
  it('calls onClick when clicking', () => {
    const spy = jest.fn();
    const link = mountWithApp(<Link url="MyThing" onClick={spy} />);
    link.find('a')!.trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a button if no url is provided', () => {
    const link = mountWithApp(<Link />);
    expect(link).toContainReactComponentTimes('button', 1);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mountWithApp(<Link url="MyThing" />);
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
      const link = mountWithApp(<Link url="https://shopify.com" id={id} />);
      expect(link).toContainReactComponent(UnstyledLink, {id});
    });
  });

  describe('external link', () => {
    it('adds target blank and noopener noreferrer if external', () => {
      const link = mountWithApp(
        <Link url="https://help.shopify.com/" external>
          Shopify Help Center
        </Link>,
      );
      const htmlLink = link.find('a');

      expect(htmlLink?.props.target).toBe('_blank');
      expect(htmlLink?.props.rel).toBe('noopener noreferrer');
    });
  });

  describe('monochrome link', () => {
    it('outputs a monochrome unstyled link if rendered within a banner', () => {
      const link = mountWithApp(
        <Banner>
          <Link url="https://examp.le">Some content</Link>
        </Banner>,
      );

      expect(link).toContainReactComponent(UnstyledLink, {
        className: expect.stringContaining('monochrome'),
      });
    });

    it('does not output a monochrome unstyled link if it is not rendered within a banner', () => {
      const link = mountWithApp(
        <Link url="https://examp.le">Some content</Link>,
      );

      expect(link).not.toContainReactComponent(UnstyledLink, {
        className: expect.stringContaining('monochrome'),
      });
    });

    it('outputs a monochrome button if rendered within a banner', () => {
      const button = mountWithApp(
        <Banner>
          <Link>Some content</Link>
        </Banner>,
      );

      expect(button).toContainReactComponent('button', {
        className: expect.stringContaining('monochrome'),
      });
    });

    it('does not output a monochrome button if it is not rendered within a banner', () => {
      const button = mountWithApp(<Link>Some content</Link>);

      expect(button).not.toContainReactComponent('button', {
        className: expect.stringContaining('monochrome'),
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
          url="https://shopify.com"
          accessibilityLabel={mockAccessibilityLabel}
        />,
      );

      expect(link).toContainReactComponent(UnstyledLink, {
        'aria-label': mockAccessibilityLabel,
      });
    });
  });

  describe('removesUnderline', () => {
    it('adds removeUnderline class to the link', () => {
      const link = mountWithApp(<Link removeUnderline>Test</Link>);

      expect(link).toContainReactComponent('button', {
        className: expect.stringContaining('removeUnderline'),
      });
    });
  });

  describe('dataPrimaryLink', () => {
    it('adds data-primary-link attribute to the link', () => {
      const link = mountWithApp(
        <Link url="https://examp.le" dataPrimaryLink>
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
});
