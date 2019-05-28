import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Image, DisplayText, TextContainer, UnstyledLink} from 'components';
import EmptyState from '../EmptyState';

describe('<EmptyState />', () => {
  let imgSrc =
    'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

  describe('primaryAction', () => {
    it('renders a button with the action content if a primaryAction is provided', () => {
      const emptyState = mountWithAppProvider(
        <EmptyState action={{content: 'Add transfer'}} image={imgSrc} />,
      );
      expect(emptyState.find('button').contains('Add transfer')).toBe(true);
    });

    it('renders does not render button with the action content if no primaryAction is provided', () => {
      const emptyState = mountWithAppProvider(<EmptyState image={imgSrc} />);
      expect(emptyState.find('button').contains('Add transfer')).toBe(false);
    });
  });

  describe('children', () => {
    it('renders children', () => {
      const expectedContent =
        'If you don’t want to add a transfer, you can import your inventory from settings.';
      const children = (
        <p>
          If you don’t want to add a transfer, you can import your inventory
          from settings.
        </p>
      );

      const emptyState = mountWithAppProvider(
        <EmptyState image={imgSrc}>{children}</EmptyState>,
      );

      expect(emptyState.find(TextContainer).text()).toContain(expectedContent);
    });
  });

  describe('img', () => {
    const emptyState = mountWithAppProvider(<EmptyState image={imgSrc} />);

    it('passes the provided source to Image', () => {
      expect(emptyState.find(Image).prop('source')).toBe(imgSrc);
    });

    it('renders an Image with a sourceSet when largeImage is passed', () => {
      imgSrc =
        'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

      const emptyState = mountWithAppProvider(
        <EmptyState image={imgSrc} largeImage={imgSrc} />,
      );

      expect(emptyState.find(Image).props().sourceSet).toStrictEqual([
        {
          descriptor: '568w',
          source:
            'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
        },
        {
          descriptor: '1136w',
          source:
            'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
        },
      ]);
    });
  });

  describe('role', () => {
    const emptyState = mountWithAppProvider(<EmptyState image={imgSrc} />);
    it('passes the presentation role to Image', () => {
      expect(emptyState.find(Image).prop('role')).toBe('presentation');
    });
  });

  describe('alt', () => {
    const emptyState = mountWithAppProvider(<EmptyState image={imgSrc} />);
    it('passes an empty alt to Image', () => {
      expect(emptyState.find(Image).prop('alt')).toBe('');
    });
  });

  describe('heading', () => {
    it('passes the provided heading to DisplayText', () => {
      const expectedHeading = 'Manage your inventory transfers';
      const emptyState = mountWithAppProvider(
        <EmptyState heading={expectedHeading} image={imgSrc} />,
      );
      expect(emptyState.find(DisplayText).prop('size')).toBe('medium');
      expect(emptyState.find(DisplayText).contains(expectedHeading)).toBe(true);
    });
  });

  describe('secondaryAction', () => {
    it('renders secondaryAction if provided', () => {
      const emptyState = mountWithAppProvider(
        <EmptyState
          secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
          }}
          image={imgSrc}
        />,
      );

      expect(emptyState.find(UnstyledLink).text()).toContain('Learn more');
    });
  });

  describe('footerContent', () => {
    const expectedContent =
      'If you don’t want to add a transfer, you can import your inventory from settings';
    const footerContentMarkup = <p>{expectedContent}</p>;

    it('renders footer content', () => {
      const emptyState = mountWithAppProvider(
        <EmptyState footerContent={footerContentMarkup} image={imgSrc} />,
      );
      const footerContentTextContainer = emptyState.find(TextContainer).last();

      expect(footerContentTextContainer.text()).toContain(expectedContent);
    });

    it('does not create a footer when footerContent is not provided', () => {
      const emptyState = mountWithAppProvider(<EmptyState image={imgSrc} />);

      expect(emptyState.find(TextContainer)).toHaveLength(0);
    });
  });
});
