import React, {useEffect, useRef} from 'react';
import {
  CirclePlusMinor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  DiamondAlertMajor,
  TickMinor,
  RiskMinor,
  InfoMinor,
  DiamondAlertMinor,
} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

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
import {Banner} from '../Banner';
import type {BannerHandles, BannerStatus} from '../Banner';
// eslint-disable-next-line @shopify/strict-component-boundaries -- se23 test will eventaully be beside component
import {
  DefaultBanner,
  InlineIconBanner,
  WithinContentContainerBanner,
} from '../components/BannerExperimental/BannerExperimental';

describe('<Banner />', () => {
  it('renders a title', () => {
    const banner = mountWithApp(<Banner title="Banner title" />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(
      banner.find(Text, {as: 'h2', variant: 'headingMd'}),
    ).toContainReactText('Banner title');
  });

  it('passes an h2 element to Heading', () => {
    const banner = mountWithApp(<Banner title="Banner title" />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(banner).toContainReactComponent(Text, {as: 'h2'});
  });

  it('passes the provided icon source to Icon', () => {
    const banner = mountWithApp(<Banner icon={CirclePlusMinor} />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(banner).toContainReactComponent(Icon, {source: CirclePlusMinor});
  });

  it('uses a success circleCheckMark if status is success and sets a status aria role', () => {
    const banner = mountWithApp(<Banner status="success" />, {
      features: {polarisSummerEditions2023: false},
    });

    expect(banner).toContainReactComponent(Icon, {
      source: CircleTickMajor,
      color: 'success',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
  });

  it('uses a highlight circleInformation if status is info and sets a status aria role', () => {
    const banner = mountWithApp(<Banner status="info" />, {
      features: {polarisSummerEditions2023: false},
    });

    expect(banner).toContainReactComponent(Icon, {
      source: CircleInformationMajor,
      color: 'highlight',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
  });

  it('uses a warning circleAlert if status is warning and sets an alert aria role', () => {
    const banner = mountWithApp(<Banner status="warning" />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(banner).toContainReactComponent(Icon, {
      source: CircleAlertMajor,
      color: 'warning',
    });
    expect(banner).toContainReactComponent('div', {role: 'alert'});
  });

  it('uses a critical circleBarred if status is critical and sets an alert aria role', () => {
    const banner = mountWithApp(<Banner status="critical" />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(banner).toContainReactComponent(Icon, {
      source: DiamondAlertMajor,
      color: 'critical',
    });
    expect(banner).toContainReactComponent('div', {role: 'alert'});
  });

  it('uses a default icon and aria role', () => {
    const banner = mountWithApp(<Banner />, {
      features: {polarisSummerEditions2023: false},
    });
    expect(banner).toContainReactComponent(Icon, {
      source: CircleInformationMajor,
      color: 'base',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
  });

  it('disables aria-live when stopAnnouncements is enabled', () => {
    const politeBanner = mountWithApp(<Banner />, {
      features: {polarisSummerEditions2023: false},
    });
    const quietBanner = mountWithApp(<Banner stopAnnouncements />, {
      features: {polarisSummerEditions2023: false},
    });

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
        {features: {polarisSummerEditions2023: false}},
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
        {features: {polarisSummerEditions2023: false}},
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
        {features: {polarisSummerEditions2023: false}},
      );

      expect(bannerWithAction).toContainReactComponent('button', {
        disabled: true,
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
        {features: {polarisSummerEditions2023: false}},
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
        {features: {polarisSummerEditions2023: false}},
      );

      expect(bannerWithActions.find(UnstyledLink)).toContainReactText(
        'Secondary external link',
      );
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is clicked', () => {
      const spy = jest.fn();
      const banner = mountWithApp(<Banner onDismiss={spy} />, {
        features: {polarisSummerEditions2023: false},
      });
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
      {features: {polarisSummerEditions2023: false}},
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
      {features: {polarisSummerEditions2023: false}},
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
      {features: {polarisSummerEditions2023: false}},
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

        return <Banner ref={banner} status="critical" />;
      }

      const testComponent = mountWithApp(<Test />, {
        features: {polarisSummerEditions2023: false},
      });

      expect(document.activeElement).toBe(
        testComponent.find('div', {tabIndex: 0})!.domNode,
      );
    });

    describe('Focus className', () => {
      it('adds a keyFocused class to the banner on keyUp', () => {
        const banner = mountWithApp(<Banner />, {
          features: {polarisSummerEditions2023: false},
        });

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
        const banner = mountWithApp(<Banner />, {
          features: {polarisSummerEditions2023: false},
        });

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

  describe('context', () => {
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
        {features: {polarisSummerEditions2023: false}},
      );

      expect(banner.find(Child)).toContainReactComponent('div');
    });
  });

  describe('Icon', () => {
    it.each([
      ['Banner has a default status', null, 'base', CircleInformationMajor],
      ['Banner has a success status', 'success', 'success', CircleTickMajor],
      [
        'Banner has an info status',
        'info',
        'highlight',
        CircleInformationMajor,
      ],
      ['Banner has a warning status', 'warning', 'warning', CircleAlertMajor],
      [
        'Banner has a critical status',
        'critical',
        'critical',
        DiamondAlertMajor,
      ],
    ])(
      'sets Icon props when: %s',
      (_: any, status: any, color: any, iconSource: any) => {
        const banner = mountWithApp(<Banner status={status} />, {
          features: {polarisSummerEditions2023: false},
        });

        expect(banner).toContainReactComponent(Icon, {
          color,
          source: iconSource,
        });
      },
    );
  });
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('<BannerExperimental />', () => {
  it('renders a title', () => {
    const banner = mountWithApp(<Banner title="Banner title" />, {
      features: {polarisSummerEditions2023: true},
    });
    expect(
      banner.find(Text, {as: 'h2', variant: 'headingSm'}),
    ).toContainReactText('Banner title');
  });

  it('passes the provided icon source to Icon', () => {
    const banner = mountWithApp(<Banner icon={CirclePlusMinor} />, {
      features: {polarisSummerEditions2023: true},
    });
    expect(banner).toContainReactComponent(Icon, {source: CirclePlusMinor});
  });

  it('disables aria-live when stopAnnouncements is enabled', () => {
    const politeBanner = mountWithApp(<Banner />, {
      features: {polarisSummerEditions2023: true},
    });
    const quietBanner = mountWithApp(<Banner stopAnnouncements />, {
      features: {polarisSummerEditions2023: true},
    });

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
        {features: {polarisSummerEditions2023: true}},
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
        {features: {polarisSummerEditions2023: true}},
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
        {features: {polarisSummerEditions2023: true}},
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
        {features: {polarisSummerEditions2023: true}},
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
        {features: {polarisSummerEditions2023: true}},
      );

      expect(bannerWithActions.find(UnstyledLink)).toContainReactText(
        'Secondary external link',
      );
    });
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is clicked', () => {
      const spy = jest.fn();
      const banner = mountWithApp(<Banner onDismiss={spy} />, {
        features: {polarisSummerEditions2023: true},
      });
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
      {features: {polarisSummerEditions2023: true}},
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
      {features: {polarisSummerEditions2023: true}},
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
      {features: {polarisSummerEditions2023: true}},
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

        return <Banner ref={banner} status="critical" />;
      }

      const testComponent = mountWithApp(<Test />, {
        features: {polarisSummerEditions2023: true},
      });

      expect(document.activeElement).toBe(
        testComponent.find('div', {tabIndex: 0})!.domNode,
      );
    });

    describe('Focus className', () => {
      it('adds a keyFocused class to the banner on keyUp', () => {
        const banner = mountWithApp(<Banner />, {
          features: {polarisSummerEditions2023: true},
        });

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
        const banner = mountWithApp(<Banner />, {
          features: {polarisSummerEditions2023: true},
        });

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
        {features: {polarisSummerEditions2023: true}},
      );

      expect(banner.find(Child)).toContainReactComponent('div');
    });

    it('shows the WithinContentContainerBanner variant inside a Card', () => {
      const card = mountWithApp(
        <Card>
          <Banner title="Banner title" />
        </Card>,
        {
          features: {polarisSummerEditions2023: true},
        },
      );
      expect(card).toContainReactComponent(WithinContentContainerBanner);
    });

    it('shows the WithinContentContainerBanner variant inside a Modal', () => {
      const modal = mountWithApp(
        <Modal open title="" onClose={() => {}}>
          <Banner title="Banner title" />
        </Modal>,
        {
          features: {polarisSummerEditions2023: true},
        },
      );
      expect(modal).toContainReactComponent(WithinContentContainerBanner);
    });

    it('shows the DefaultBanner variant by default', () => {
      const banner = mountWithApp(<Banner title="Banner title" />, {
        features: {polarisSummerEditions2023: true},
      });
      expect(banner).toContainReactComponent(DefaultBanner);
    });

    it('shows the InlineIconBanner variant by default when there is no title and it is not in a content container', () => {
      const banner = mountWithApp(<Banner />, {
        features: {polarisSummerEditions2023: true},
      });
      expect(banner).toContainReactComponent(InlineIconBanner);
    });

    it('shows the WithinContentContainerBanner variant by default when there is no title and it is in a content container', () => {
      const card = mountWithApp(
        <Card>
          <Banner />
        </Card>,
        {
          features: {polarisSummerEditions2023: true},
        },
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
    ])(
      'aria role when status is %s',
      (status: BannerStatus, role: 'string') => {
        const banner = mountWithApp(<Banner status={status} />, {
          features: {polarisSummerEditions2023: true},
        });

        expect(banner).toContainReactComponent('div', {role});
      },
    );
  });

  describe('icon', () => {
    it.each([
      ['success', TickMinor],
      ['info', InfoMinor],
      ['warning', RiskMinor],
      ['critical', DiamondAlertMinor],
    ])('icon when status is %s', (status: BannerStatus, icon: any) => {
      const banner = mountWithApp(<Banner status={status} />, {
        features: {polarisSummerEditions2023: true},
      });

      expect(banner).toContainReactComponent(Icon, {
        source: icon,
      });
    });
  });
});
