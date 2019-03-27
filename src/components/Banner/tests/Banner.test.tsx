import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {mountWithAppProvider} from 'test-utilities';
import {
  CirclePlusMinor,
  CircleAlertMajorTwotone,
  CircleDisabledMajorTwotone,
  CircleTickMajorTwotone,
  CircleInformationMajorTwotone,
  FlagMajorTwotone,
} from '@shopify/polaris-icons';

import {Button, Icon, UnstyledLink, Heading} from 'components';
import Banner from '..';

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

  it('uses a greenDark circleCheckMark if status is success', () => {
    const banner = mountWithAppProvider(<Banner status="success" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleTickMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('greenDark');
  });

  it('uses a tealDark circleInformation if status is info', () => {
    const banner = mountWithAppProvider(<Banner status="info" />);
    expect(banner.find(Icon).prop('source')).toBe(
      CircleInformationMajorTwotone,
    );
    expect(banner.find(Icon).prop('color')).toBe('tealDark');
  });

  it('uses a yellowDark circleAlert if status is warning', () => {
    const banner = mountWithAppProvider(<Banner status="warning" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleAlertMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('yellowDark');
  });

  it('uses a redDark circleBarred if status is critical', () => {
    const banner = mountWithAppProvider(<Banner status="critical" />);
    expect(banner.find(Icon).prop('source')).toBe(CircleDisabledMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('redDark');
  });

  it('uses a default icon', () => {
    const banner = mountWithAppProvider(<Banner />);
    expect(banner.find(Icon).prop('source')).toBe(FlagMajorTwotone);
    expect(banner.find(Icon).prop('color')).toBe('inkLighter');
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

  const mockContext = {
    withinContentContainer: true,
  };

  const bannerWithContentContext = mountWithAppProvider(
    <Banner
      action={{
        content: 'Primary action',
      }}
    >
      Some content
    </Banner>,
    {context: mockContext},
  );

  it('renders a slim button with contentContext', () => {
    const button = bannerWithContentContext.find(Button);
    expect(button.prop('size')).toBe('slim');
  });

  describe('focus', () => {
    it('exposes a function that allows the banner to be programmatically focused', () => {
      class Test extends React.Component {
        banner = React.createRef<any>();

        componentDidMount() {
          this.banner.current.focus();
        }

        render() {
          return <Banner ref={this.banner} status="critical" />;
        }
      }

      const div = mountWithAppProvider(<Test />)
        .find('div')
        .filterWhere((element: ReactWrapper) => element.prop('tabIndex') === 0);

      expect(div.getDOMNode()).toBe(document.activeElement);
    });
  });
});
