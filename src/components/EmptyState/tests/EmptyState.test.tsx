import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Image, DisplayText, TextContainer} from 'components';
import EmptyState from '../EmptyState';

describe('<EmptyState />', () => {
  let imgSrc: string;
  let footerMarkup: React.ReactNode;
  let emptyState: any;

  beforeAll(() => {
    imgSrc =
      'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
    footerMarkup = (
      <p>
        Import inventory from <a href="/settings">settings</a>
      </p>
    );

    emptyState = mountWithAppProvider(
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        image={imgSrc}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        footer={footerMarkup}
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>,
    );
  });

  it('renders a button with the action content', () => {
    expect(emptyState.find('button').contains('Add transfer')).toBe(true);
  });

  it('renders children and footer', () => {
    expect(emptyState.find(TextContainer)).toHaveLength(2);
  });

  describe('img', () => {
    it('passes the provided source to Image', () => {
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
    it('passes the provided heading to DisplayText', () => {
      expect(emptyState.find(DisplayText).prop('size')).toBe('medium');
      expect(
        emptyState
          .find(DisplayText)
          .contains('Manage your inventory transfers'),
      ).toBe(true);
    });
  });

  describe('footer', () => {
    it('passes the provided content to TextContainer', () => {
      const footerTextField = emptyState.find(TextContainer).last();

      expect(footerTextField.text()).toContain(
        'Import inventory from settings',
      );
    });
  });
});
