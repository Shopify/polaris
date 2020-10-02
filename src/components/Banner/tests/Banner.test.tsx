import React, {useEffect, useRef} from 'react';
import {
  CirclePlusMinor,
  CircleAlertMajorTwotone,
  CircleDisabledMajorTwotone,
  CircleTickMajorTwotone,
  CircleInformationMajorTwotone,
  FlagMajorTwotone,
  CircleTickMajorFilled,
  CircleInformationMajorFilled,
  CircleAlertMajorFilled,
  CircleDisabledMajorFilled,
} from '@shopify/polaris-icons';
import {mountWithApp} from 'test-utilities/react-testing';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {BannerContext} from 'utilities/banner-context';
import {Button, Icon, UnstyledLink, Heading} from 'components';

import {WithinContentContext} from '../../../utilities/within-content-context';
import {Banner} from '../Banner';

describe('<Banner />', () => {
  it('renders a title', () => {
    const banner = mountWithAppProvider(<Banner title="Banner title" />);
    expect(banner.find(Heading).contains('Banner title')).toBe(true);
  });

  it('passes a p element to Heading', () => {
    const banner = mountWithAppProvider(<Banner title="Banner title" />);
    expect(banner.find(Heading).prop('element')).toBe('p');
  });

  it('passes the provided icon source to Icon', () => {
    const banner = mountWithAppProvider(<Banner icon={CirclePlusMinor} />);
    expect(banner.find(Icon).prop('source')).toBe(CirclePlusMinor);
  });

  it('uses a greenDark circleCheckMark if status is success and sets a status aria role', () => {
    const banner = mountWithAppProvider(<Banner status="success" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleTickMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('greenDark');
    expect(banner.find('div').first().prop('role')).toBe('status');
  });

  it('uses a tealDark circleInformation if status is info and sets a status aria role', () => {
    const banner = mountWithAppProvider(<Banner status="info" />);
    expect(banner.find(Icon).prop('source')).toBe(
      CircleInformationMajorTwotone,
    );
    expect(banner.find(Icon).prop('color')).toBe('tealDark');
    expect(banner.find('div').first().prop('role')).toBe('status');
  });

  it('uses a yellowDark circleAlert if status is warning and sets an alert aria role', () => {
    const banner = mountWithAppProvider(<Banner status="warning" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleAlertMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('yellowDark');
    expect(banner.find('div').first().prop('role')).toBe('alert');
  });

  it('uses a redDark circleBarred if status is critical and sets an alert aria role', () => {
    const banner = mountWithAppProvider(<Banner status="critical" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleDisabledMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('redDark');
    expect(banner.find('div').first().prop('role')).toBe('alert');
  });

  it('uses a default icon and aria role', () => {
    const banner = mountWithAppProvider(<Banner />);
    expect(banner.find(Icon).prop('source')).toBe(FlagMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('inkLighter');
    expect(banner.find('div').first().prop('role')).toBe('status');
  });

  it('disables aria-live when stopAnnouncements is enabled', () => {
    const politeBanner = mountWithAppProvider(<Banner />)
      .find('div')
      .filterWhere((element) => element.prop('aria-live') === 'polite');
    expect(politeBanner).toBeTruthy();

    const quietBanner = mountWithAppProvider(<Banner stopAnnouncements />)
      .find('div')
      .filterWhere((element) => element.prop('aria-live') === 'off');
    expect(quietBanner).toBeTruthy();
  });

  describe('onDismiss()', () => {
    it('is called when the dismiss button is clicked', () => {
      const spy = jest.fn();
      const banner = mountWithAppProvider(<Banner onDismiss={spy} />);
      banner.find(Button).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  const bannerWithSecondaryAction = mountWithAppProvider(
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

  const unstyledLink = bannerWithSecondaryAction.find(UnstyledLink).find('a');

  it('creates an external link when external prop is true in secondaryAction', () => {
    expect(unstyledLink.prop('target')).toBe('_blank');
  });

  it('adds the noopener and noreferrer accessibility attributes to external link in secondaryAction', () => {
    expect(unstyledLink.prop('rel')).toBe('noopener noreferrer');
  });

  const bannerWithContentContext = mountWithAppProvider(
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

  it('renders a slim button with contentContext', () => {
    const button = bannerWithContentContext.find(Button);
    expect(button.prop('size')).toBe('slim');
  });

  describe('focus', () => {
    it('exposes a function that allows the banner to be programmatically focused', () => {
      function Test() {
        const banner = useRef<Banner>(null);

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
        const banner = mountWithApp(<Banner />, {
          features: {newDesignLanguage: true},
        });

        const bannerDiv = banner.find('div', {
          className: 'Banner withinPage newDesignLanguage',
        });

        bannerDiv!.trigger('onKeyUp', {
          target: bannerDiv!.domNode as HTMLDivElement,
        });

        expect(banner).toContainReactComponent('div', {
          className: 'Banner keyFocused withinPage newDesignLanguage',
        });
      });

      it('does not add a keyFocused class onMouseUp', () => {
        const banner = mountWithApp(<Banner />, {
          features: {newDesignLanguage: true},
        });

        const bannerDiv = banner.find('div', {
          className: 'Banner withinPage newDesignLanguage',
        });

        bannerDiv!.trigger('onMouseUp', {
          currentTarget: bannerDiv!.domNode as HTMLDivElement,
        });

        expect(banner).toContainReactComponent('div', {
          className: 'Banner withinPage newDesignLanguage',
        });
      });
    });
  });

  describe('context', () => {
    it('passes the within banner context', () => {
      const Child: React.SFC = (_props) => {
        return (
          <BannerContext.Consumer>
            {(BannerContext) => {
              return BannerContext ? <div /> : null;
            }}
          </BannerContext.Consumer>
        );
      };

      const banner = mountWithAppProvider(
        <Banner>
          <Child />
        </Banner>,
      );

      const div = banner.find(Child).find('div').first();

      expect(div.exists()).toBe(true);
    });
  });

  describe('Icon', () => {
    it.each([
      [
        'Banner has a default status',
        null,
        'base',
        CircleInformationMajorFilled,
      ],
      [
        'Banner has a success status',
        'success',
        'success',
        CircleTickMajorFilled,
      ],
      [
        'Banner has an info status',
        'info',
        'highlight',
        CircleInformationMajorFilled,
      ],
      [
        'Banner has a warning status',
        'warning',
        'warning',
        CircleAlertMajorFilled,
      ],
      [
        'Banner has a critical status',
        'critical',
        'critical',
        CircleDisabledMajorFilled,
      ],
    ])(
      'Sets Icon props when: %s',
      (_: any, status: any, color: any, iconSource: any) => {
        const banner = mountWithApp(<Banner status={status} />, {
          features: {newDesignLanguage: true},
        });

        expect(banner.find(Icon)!.props).toStrictEqual({
          backdrop: false,
          color,
          source: iconSource,
        });
      },
    );
  });
});
