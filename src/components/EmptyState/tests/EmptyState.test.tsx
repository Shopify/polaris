import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Image, DisplayText} from 'components';
import EmptyState from '../EmptyState';

describe('<EmptyState />', () => {
  let imgSrc: string;
  let emptyState: any;

  beforeAll(() => {
    imgSrc =
      'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

    emptyState = mountWithAppProvider(
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        image={imgSrc}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>,
    );
  });

  it('renders a button with the action content', () => {
    expect(emptyState.find('button').contains('Add transfer')).toBe(true);
  });

  describe('img', () => {
    it('passes the correct source to Image', () => {
      expect(emptyState.find(Image).prop('source')).toBe(imgSrc);
    });
  });

  describe('role', () => {
    it('passes the presentation role to Image', () => {
      expect(emptyState.find(Image).prop('role')).toBe('presentation');
    });
  });

  describe('alt', () => {
    it('passes an empty alt to Image', () => {
      expect(emptyState.find(Image).prop('alt')).toBe('');
    });
  });

  describe('heading', () => {
    it('passes the correct heading to DisplayText', () => {
      expect(emptyState.find(DisplayText).prop('size')).toBe('medium');
      expect(
        emptyState
          .find(DisplayText)
          .contains('Manage your inventory transfers'),
      ).toBe(true);
    });
  });
});
