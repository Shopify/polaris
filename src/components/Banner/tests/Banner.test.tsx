import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Button, Icon, UnstyledLink, Heading} from 'components';
import Banner from '..';

import successIcon from '../icons/circle-check-mark.svg';
import fallbackIcon from '../icons/flag.svg';
import warningIcon from '../icons/circle-alert.svg';
import criticalIcon from '../icons/circle-barred.svg';
import infoIcon from '../icons/circle-information.svg';
import {Provider} from '../../WithinContentContext';

describe('<Banner />', () => {
  it('renders a title', () => {
    const banner = mountWithAppProvider(<Banner title="Banner title" />);
    expect(banner.find(Heading).contains('Banner title')).toBe(true);
  });

  it('passes a p element to Heading', () => {
    const banner = mountWithAppProvider(<Banner title="Banner title" />);
    expect(banner.find(Heading).prop('element')).toBe('p');
  });

  it('passes the correct icon source to Icon', () => {
    const banner = mountWithAppProvider(<Banner icon="circlePlus" />);
    expect(banner.find(Icon).prop('source')).toBe('circlePlus');
  });

  it('uses a greenDark successIcon if status is success', () => {
    const banner = mountWithAppProvider(<Banner status="success" />);
    expect(banner.find(Icon).prop('source')).toBe(successIcon);
    expect(banner.find(Icon).prop('color')).toBe('greenDark');
  });

  it('uses a tealDark infoIcon if status is info', () => {
    const banner = mountWithAppProvider(<Banner status="info" />);
    expect(banner.find(Icon).prop('source')).toBe(infoIcon);
    expect(banner.find(Icon).prop('color')).toBe('tealDark');
  });

  it('uses a yellowDark warningIcon if status is warning', () => {
    const banner = mountWithAppProvider(<Banner status="warning" />);
    expect(banner.find(Icon).prop('source')).toBe(warningIcon);
    expect(banner.find(Icon).prop('color')).toBe('yellowDark');
  });

  it('uses a redDark criticalIcon if status is critical', () => {
    const banner = mountWithAppProvider(<Banner status="critical" />);
    expect(banner.find(Icon).prop('source')).toBe(criticalIcon);
    expect(banner.find(Icon).prop('color')).toBe('redDark');
  });

  it('uses a default icon', () => {
    const banner = mountWithAppProvider(<Banner />);
    expect(banner.find(Icon).prop('source')).toBe(fallbackIcon);
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

  it('adds the correct accessibility attributes to external link in secondaryAction', () => {
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
