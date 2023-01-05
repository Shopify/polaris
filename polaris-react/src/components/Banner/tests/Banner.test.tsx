import React, {useEffect, useRef} from 'react';
import {
  CirclePlusMinor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  DiamondAlertMajor,
} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
import {Text} from '../../Text';
import {Icon} from '../../Icon';
import {Spinner} from '../../Spinner';
import {UnstyledButton} from '../../UnstyledButton';
import {UnstyledLink} from '../../UnstyledLink';
import {BannerContext} from '../../../utilities/banner-context';
import {WithinContentContext} from '../../../utilities/within-content-context';
import {Banner, BannerHandles} from '../Banner';

describe('<Banner />', () => {
  it('renders a title', () => {
    const banner = mountWithApp(<Banner title="Banner title" />);
    expect(
      banner.find(Text, {as: 'h2', variant: 'headingMd'}),
    ).toContainReactText('Banner title');
  });

  it('passes an h2 element to Heading', () => {
    const banner = mountWithApp(<Banner title="Banner title" />);
    expect(banner).toContainReactComponent(Text, {as: 'h2'});
  });

  it('passes the provided icon source to Icon', () => {
    const banner = mountWithApp(<Banner icon={CirclePlusMinor} />);
    expect(banner).toContainReactComponent(Icon, {source: CirclePlusMinor});
  });

  it('uses a success circleCheckMark if status is success and sets a status aria role', () => {
    const banner = mountWithApp(<Banner status="success" />);

    expect(banner).toContainReactComponent(Icon, {
      source: CircleTickMajor,
      color: 'success',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
  });

  it('uses a highlight circleInformation if status is info and sets a status aria role', () => {
    const banner = mountWithApp(<Banner status="info" />);

    expect(banner).toContainReactComponent(Icon, {
      source: CircleInformationMajor,
      color: 'highlight',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
  });

  it('uses a warning circleAlert if status is warning and sets an alert aria role', () => {
    const banner = mountWithApp(<Banner status="warning" />);
    expect(banner).toContainReactComponent(Icon, {
      source: CircleAlertMajor,
      color: 'warning',
    });
    expect(banner).toContainReactComponent('div', {role: 'alert'});
  });

  it('uses a critical circleBarred if status is critical and sets an alert aria role', () => {
    const banner = mountWithApp(<Banner status="critical" />);
    expect(banner).toContainReactComponent(Icon, {
      source: DiamondAlertMajor,
      color: 'critical',
    });
    expect(banner).toContainReactComponent('div', {role: 'alert'});
  });

  it('uses a default icon and aria role', () => {
    const banner = mountWithApp(<Banner />);
    expect(banner).toContainReactComponent(Icon, {
      source: CircleInformationMajor,
      color: 'base',
    });
    expect(banner).toContainReactComponent('div', {role: 'status'});
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

        return <Banner ref={banner} status="critical" />;
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
        const banner = mountWithApp(<Banner status={status} />);

        expect(banner).toContainReactComponent(Icon, {
          color,
          source: iconSource,
        });
      },
    );
  });
});
