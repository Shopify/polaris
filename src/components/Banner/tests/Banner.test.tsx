import * as React from 'react';
import {findByTestID} from '../../../../tests/utilities/enzyme';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Banner from '..';
import Button from '../../Button';

describe('<Banner />', () => {
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
        // onAction: null,
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

  const anchorElement = findByTestID(
    bannerWithSecondaryAction,
    'secondaryLink',
  ).find('a');

  it('creates an external link when external prop is true in secondaryAction', () => {
    expect(anchorElement.prop('target')).toBe('_blank');
  });

  it('adds the correct accessibility attributes to external link in secondaryAction', () => {
    expect(anchorElement.prop('rel')).toBe('noopener noreferrer');
  });
});
