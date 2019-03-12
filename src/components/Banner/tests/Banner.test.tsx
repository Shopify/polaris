import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Button, Icon, UnstyledLink, Heading} from 'components';
import Banner from '..';
import {Provider} from '../../WithinContentContext';

import {
  CircleAlertMajorTwotone,
  CircleDisabledMajorTwotone,
  CircleTickMajorTwotone,
  CircleInformationMajorTwotone,
  FlagMajorTwotone,
} from '../../../icons';

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
    const banner = mountWithAppProvider(<Banner icon="circlePlus" />);
    expect(banner.find(Icon).prop('source')).toBe('circlePlus');
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
    <Provider value={mockContext}>
      <Banner
        action={{
          content: 'Primary action',
        }}
      >
        Some content
      </Banner>
    </Provider>,
  );

  it('renders a slim button with contentContext', () => {
    const button = bannerWithContentContext.find(Button);
    expect(button.prop('size')).toBe('slim');
  });
});
