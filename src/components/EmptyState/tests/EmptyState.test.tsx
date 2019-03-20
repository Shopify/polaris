import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Image, DisplayText, TextContainer, Link} from 'components';
import EmptyState from '../EmptyState';

describe('<EmptyState />', () => {
  let imgSrc: string;
  let footerContentMarkup: React.ReactNode;
  let emptyState: any;

  beforeAll(() => {
    imgSrc =
      'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
    footerContentMarkup = (
      <p>
        If you don’t want to add a transfer, you can import your inventory from{' '}
        <Link url="/settings">settings</Link>.
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
        footerContent={footerContentMarkup}
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>,
    );
  });

  it('renders a button with the action content', () => {
    expect(emptyState.find('button').contains('Add transfer')).toBe(true);
  });

  it('renders children and footer context', () => {
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

  describe('footerContent', () => {
    it('passes the provided content to TextContainer', () => {
      const footerContentTextContainer = emptyState.find(TextContainer).last();

      expect(footerContentTextContainer.text()).toContain(
        'If you don’t want to add a transfer, you can import your inventory from settings.',
      );
    });

    it('renders a link', () => {
      const footerContentTextField = emptyState.find(TextContainer).last();

      expect(footerContentTextField.find(Link).contains('settings')).toBe(true);
    });
  });
});
