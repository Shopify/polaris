import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
import {Image} from '../../Image';
import {Stack} from '../../Stack';
import {Text} from '../../Text';
import {UnstyledLink} from '../../UnstyledLink';
import {WithinContentContext} from '../../../utilities/within-content-context';
import {EmptyState} from '../EmptyState';

describe('<EmptyState />', () => {
  let imgSrc =
    'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

  describe('action', () => {
    it('renders a button with the action content if action is set', () => {
      const emptyState = mountWithApp(
        <EmptyState action={{content: 'Add transfer'}} image={imgSrc} />,
      );
      expect(emptyState.find('button')).toContainReactText('Add transfer');
    });

    it('does not render a button when no action is set', () => {
      const emptyState = mountWithApp(<EmptyState image={imgSrc} />);

      expect(emptyState).not.toContainReactComponent('button');
    });

    it('renders a medium size primary button by default', () => {
      const emptyState = mountWithApp(
        <EmptyState image={imgSrc} action={{content: 'Add transfer'}} />,
      );

      expect(emptyState).toContainReactComponent(Button, {
        size: 'medium',
        primary: true,
      });
    });

    it('renders a medium button when in a content context', () => {
      const emptyStateInContentContext = mountWithApp(
        <WithinContentContext.Provider value>
          <EmptyState image={imgSrc} action={{content: 'Upload files'}} />
        </WithinContentContext.Provider>,
      );

      expect(emptyStateInContentContext).toContainReactComponent(Button, {
        size: 'medium',
      });
    });

    it('adds center distribution and tight spacing to Stack', () => {
      const emptyState = mountWithApp(
        <EmptyState image={imgSrc} action={{content: 'Add transfer'}} />,
      );

      expect(emptyState).toContainReactComponent(Stack, {
        spacing: 'tight',
        distribution: 'center',
      });
    });

    it('does not render a plain link as a secondaryAction', () => {
      const emptyState = mountWithApp(
        <EmptyState
          image={imgSrc}
          secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
          }}
        />,
      );

      expect(emptyState).toContainReactComponent(UnstyledLink, {
        plain: undefined,
      });
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

      const emptyState = mountWithApp(
        <EmptyState image={imgSrc}>{children}</EmptyState>,
      );

      expect(emptyState.find(Text)).toContainReactText(expectedContent);
    });
  });

  describe('img', () => {
    it('passes the provided source to Image', () => {
      const emptyState = mountWithApp(<EmptyState image={imgSrc} />);
      expect(emptyState).toContainReactComponent(Image, {source: imgSrc});
    });

    it('renders an Image with a sourceSet when largeImage is passed', () => {
      imgSrc =
        'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

      const emptyState = mountWithApp(
        <EmptyState image={imgSrc} largeImage={imgSrc} />,
      );

      expect(emptyState).toContainReactComponent(Image, {
        sourceSet: [
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
        ],
      });
    });
  });

  describe('role', () => {
    it('passes the presentation role to Image', () => {
      const emptyState = mountWithApp(<EmptyState image={imgSrc} />);
      expect(emptyState).toContainReactComponent(Image, {role: 'presentation'});
    });
  });

  describe('alt', () => {
    it('passes an empty alt to Image', () => {
      const emptyState = mountWithApp(<EmptyState image={imgSrc} />);
      expect(emptyState).toContainReactComponent(Image, {alt: ''});
    });
  });

  describe('heading', () => {
    it('passes the provided heading to Text', () => {
      const expectedHeading = 'Manage your inventory transfers';
      const emptyState = mountWithApp(
        <EmptyState heading={expectedHeading} image={imgSrc} />,
      );
      const text = emptyState.find(Text)!;

      expect(text).toHaveReactProps({variant: 'headingXl'});
      expect(text).toContainReactText(expectedHeading);
    });

    it('renders a headingLg Text when in a content context', () => {
      const emptyStateInContentContext = mountWithApp(
        <WithinContentContext.Provider value>
          <EmptyState heading="Heading" image={imgSrc} />
        </WithinContentContext.Provider>,
      );

      expect(emptyStateInContentContext).toContainReactComponent(Text, {
        variant: 'headingLg',
      });
    });
  });

  describe('secondaryAction', () => {
    it('renders secondaryAction if provided', () => {
      const emptyState = mountWithApp(
        <EmptyState
          secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
          }}
          image={imgSrc}
        />,
      );

      expect(emptyState.find(UnstyledLink)).toContainReactText('Learn more');
    });
  });

  describe('footerContent', () => {
    const expectedContent =
      'If you don’t want to add a transfer, you can import your inventory from settings';
    const footerContentMarkup = <p>{expectedContent}</p>;

    it('renders footer content', () => {
      const emptyState = mountWithApp(
        <EmptyState footerContent={footerContentMarkup} image={imgSrc} />,
      );
      expect(emptyState).toContainReactComponent(Text, {
        children: footerContentMarkup,
      });
    });

    it('does not create a footer when footerContent is not provided', () => {
      const emptyState = mountWithApp(<EmptyState image={imgSrc} />);

      expect(emptyState).not.toContainReactComponent(Text);
    });
  });
});
