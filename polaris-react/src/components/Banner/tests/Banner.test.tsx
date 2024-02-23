import React, {useEffect, useRef} from 'react';
import {
  PlusCircleIcon,
  CheckIcon,
  AlertTriangleIcon,
  InfoIcon,
  AlertDiamondIcon,
} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';
import {setMatchMedia} from 'tests/setup/tests';

import {Button} from '../../Button';
import {Card} from '../../Card';
import {Modal} from '../../Modal';
import {Text} from '../../Text';
import {Icon} from '../../Icon';
import {Spinner} from '../../Spinner';
import {UnstyledButton} from '../../UnstyledButton';
import {UnstyledLink} from '../../UnstyledLink';
import {BannerContext} from '../../../utilities/banner-context';
import {WithinContentContext} from '../../../utilities/within-content-context';
import {
  Banner,
  DefaultBanner,
  InlineIconBanner,
  WithinContentContainerBanner,
} from '../Banner';
import type {BannerTone} from '../Banner';
import type {BannerHandles} from '../utilities';

setMatchMedia();

describe('<Banner />', () => {
  it('renders a title', () => {
    const banner = mountWithApp(<Banner title="Banner title" />);
    expect(
      banner.find(Text, {as: 'h2', variant: 'headingSm'}),
    ).toContainReactText('Banner title');
  });

  it('passes the provided icon source to Icon', () => {
    const banner = mountWithApp(<Banner icon={PlusCircleIcon} />);
    expect(banner).toContainReactComponent(Icon, {source: PlusCircleIcon});
  });

  it('disables aria-live when stopAnnouncements is enabled', () => {
    const politeBanner = mountWithApp(<Banner />);
    const quietBanner = mountWithApp(<Banner stopAnnouncements />);

    expect(politeBanner.find('div')).toHaveReactProps({'aria-live': 'polite'});
    expect(quietBanner.find('div')).toHaveReactProps({'aria-live': 'off'});
  });

  describe('action', () => {
    it('renders an unstyled button', () => {
      const bannerWithAction = mountWithApp(
        <Banner
          title="Test"
          action={{
            content: 'Primary action',
          }}
        >
          Hello World
        </Banner>,
      );

      expect(bannerWithAction.find(UnstyledButton)).toContainReactText(
        'Primary action',
      );
    });

    it('renders a Spinner when loading', () => {
      const bannerWithAction = mountWithApp(
        <Banner
          title="Test"
          action={{
            content: 'Primary action',
            loading: true,
          }}
        >
          Hello World
        </Banner>,
      );

      expect(bannerWithAction).toContainReactComponent(Spinner);
    });

    it('renders a disabled button when loading', () => {
      const bannerWithAction = mountWithApp(
        <Banner
          title="Test"
          action={{
            content: 'Primary action',
            loading: true,
          }}
        >
          Hello World
        </Banner>,
      );

      expect(bannerWithAction).toContainReactComponent('button', {
        'aria-disabled': true,
        'aria-busy': true,
      });
    });
  });

  describe('secondaryAction', () => {
    it('renders when a primary action is provided', () => {
      const bannerWithActions = mountWithApp(
        <Banner
          title="Test"
          action={{
            content: 'Primary action',
          }}
          secondaryAction={{
            content: 'Secondary external link',
            url: 'https://test.com',
            external: true,
          }}
        >
          Hello World
        </Banner>,
      );

      expect(bannerWithActions.find(UnstyledLink)).toContainReactText(
        'Secondary external link',
      );
    });

    it('renders when a primary action is not provided', () => {
      const bannerWithActions = mountWithApp(
        <Banner
          title="Test"
          secondaryAction={{
            content: 'Secondary external link',
            url: 'https://test.com',
            external: true,
          }}
        >
          Hello World
        </Banner>,
      );

      expect(bannerWithActions.find(UnstyledLink)).toContainReactText(
        'Secondary external link',
      );
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is clicked', () => {
      const spy = jest.fn();
      const banner = mountWithApp(<Banner onDismiss={spy} />);
      banner.find(Button)!.trigger('onClick');

      expect(spy).toHaveBeenCalled();
    });
  });

  it('creates an external link and adds the noopener and noreferrer accessibility attributes to external link in secondaryAction', () => {
    const bannerWithSecondaryAction = mountWithApp(
      <Banner
        title="Test"
        action={{
          content: 'Primary action',
        }}
        secondaryAction={{
          content: 'Secondary external link',
          url: 'https://test.com',
          external: true,
        }}
      >
        Hello World
      </Banner>,
    );

    const unstyledLink = bannerWithSecondaryAction
      .find(UnstyledLink)!
      .find('a');

    expect(unstyledLink).toHaveReactProps({
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });

  it('creates a link with custom target in secondaryAction', () => {
    const bannerWithSecondaryAction = mountWithApp(
      <Banner
        title="Test"
        action={{
          content: 'Primary action',
        }}
        secondaryAction={{
          content: 'Secondary external link',
          url: 'https://test.com',
          target: '_top',
        }}
      >
        Hello World
      </Banner>,
    );

    const unstyledLink = bannerWithSecondaryAction
      .find(UnstyledLink)!
      .find('a');

    expect(unstyledLink).toHaveReactProps({
      target: '_top',
      rel: undefined,
    });
  });

  it('renders an unstyled button with contentContext', () => {
    const bannerWithContentContext = mountWithApp(
      <WithinContentContext.Provider value>
        <Banner
          action={{
            content: 'Primary action',
          }}
        >
          Some content
        </Banner>
      </WithinContentContext.Provider>,
    );

    expect(bannerWithContentContext).toContainReactComponent(UnstyledButton);
  });

  describe('focus', () => {
    it('exposes a function that allows the banner to be programmatically focused', () => {
      function Test() {
        const banner = useRef<BannerHandles>(null);

        useEffect(() => {
          banner.current && banner.current.focus();
        }, []);

        return <Banner ref={banner} tone="critical" />;
      }

      const testComponent = mountWithApp(<Test />);

      expect(document.activeElement).toBe(
        testComponent.find('div', {tabIndex: 0})!.domNode,
      );
    });

    describe('Focus className', () => {
      it('adds a keyFocused class to the banner on keyUp', () => {
        const banner = mountWithApp(<Banner />);

        const bannerDiv = banner.find('div', {
          className: 'Banner withinPage',
        });

        bannerDiv!.trigger('onKeyUp', {
          target: bannerDiv!.domNode as HTMLDivElement,
        });

        expect(banner).toContainReactComponent('div', {
          className: 'Banner keyFocused withinPage',
        });
      });

      it('does not add a keyFocused class onMouseUp', () => {
        const banner = mountWithApp(<Banner />);

        const bannerDiv = banner.find('div', {
          className: 'Banner withinPage',
        });

        bannerDiv!.trigger('onMouseUp', {
          currentTarget: bannerDiv!.domNode as HTMLDivElement,
        });

        expect(banner).toContainReactComponent('div', {
          className: 'Banner withinPage',
        });
      });
    });
  });

  describe('context and variants', () => {
    it('passes the within banner context', () => {
      const Child: React.FunctionComponent = (_props) => {
        return (
          <BannerContext.Consumer>
            {(BannerContext) => {
              return BannerContext ? <div /> : null;
            }}
          </BannerContext.Consumer>
        );
      };

      const banner = mountWithApp(
        <Banner>
          <Child />
        </Banner>,
      );

      expect(banner.find(Child)).toContainReactComponent('div');
    });

    it('shows the WithinContentContainerBanner variant inside a Card', () => {
      const card = mountWithApp(
        <Card>
          <Banner title="Banner title" />
        </Card>,
        {},
      );
      expect(card).toContainReactComponent(WithinContentContainerBanner);
    });

    it('shows the WithinContentContainerBanner variant inside a Modal', () => {
      const modal = mountWithApp(
        <Modal open title="" onClose={() => {}}>
          <Banner title="Banner title" />
        </Modal>,
        {},
      );
      expect(modal).toContainReactComponent(WithinContentContainerBanner);
    });

    it('shows the DefaultBanner variant by default', () => {
      const banner = mountWithApp(<Banner title="Banner title" />);
      expect(banner).toContainReactComponent(DefaultBanner);
    });

    it('shows the InlineIconBanner variant by default when there is no title and it is not in a content container', () => {
      const banner = mountWithApp(<Banner />);
      expect(banner).toContainReactComponent(InlineIconBanner);
    });

    it('shows the WithinContentContainerBanner variant by default when there is no title and it is in a content container', () => {
      const card = mountWithApp(
        <Card>
          <Banner />
        </Card>,
        {},
      );
      expect(card).toContainReactComponent(WithinContentContainerBanner);
    });
  });

  describe('aria role', () => {
    it.each([
      ['success', 'status'],
      ['info', 'status'],
      ['warning', 'alert'],
      ['critical', 'alert'],
    ])('aria role when status is %s', (tone: BannerTone, role: 'string') => {
      const banner = mountWithApp(<Banner tone={tone} />);

      expect(banner).toContainReactComponent('div', {role});
    });
  });

  describe('icon', () => {
    it.each([
      ['success', CheckIcon],
      ['info', InfoIcon],
      ['warning', AlertTriangleIcon],
      ['critical', AlertDiamondIcon],
    ])('icon when status is %s', (tone: BannerTone, icon: any) => {
      const banner = mountWithApp(<Banner tone={tone} />);

      expect(banner).toContainReactComponent(Icon, {
        source: icon,
      });
    });
  });
});
