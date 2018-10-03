import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import {Avatar, buttonFrom} from 'src/components';
import AccountConnection from '../AccountConnection';

describe('<AccountConnection />', () => {
  describe('title', () => {
    it('shows the title when one is provided', () => {
      const title = 'Example app';
      const accountConnection = mountWithAppProvider(
        <AccountConnection title={title} />,
      );
      expect(accountConnection.text()).toBe(title);
    });
  });

  describe('details', () => {
    it('is shown on the card when provided', () => {
      const details = 'No account connected.';
      const accountConnection = mountWithAppProvider(
        <AccountConnection details={details} />,
      );
      expect(accountConnection.text()).toContain(details);
    });
  });

  describe('termsOfService', () => {
    it('is shown on the card when provided', () => {
      const TermsOfService = () => (
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
          terms and conditions. You’ll pay a commission rate of 15% on sales
          made through Sample App.
        </p>
      );
      const accountConnection = mountWithAppProvider(
        <AccountConnection termsOfService={<TermsOfService />} />,
      );
      expect(accountConnection.find(TermsOfService).exists()).toBeTruthy();
    });
  });

  describe('action', () => {
    it('creates a primary button using the given action', () => {
      const action = {
        content: 'Connect',
        onAction: noop,
      };
      const accountConnection = mountWithAppProvider(
        <AccountConnection action={action} />,
      );
      expect(
        accountConnection.contains(buttonFrom(action, {primary: true})),
      ).toBeTruthy();
    });

    it('makes the button secondary when connected', () => {
      const action = {
        content: 'Connect',
        onAction: noop,
      };
      const accountConnection = mountWithAppProvider(
        <AccountConnection action={action} connected />,
      );
      expect(
        accountConnection.contains(buttonFrom(action, {primary: false})),
      ).toBeTruthy();
    });
  });

  describe('connected', () => {
    it('shows an avatar when truthy', () => {
      const accountConnection = mountWithAppProvider(
        <AccountConnection connected />,
      );
      expect(accountConnection.find(Avatar).exists()).toBeTruthy();
    });

    it('doesnt show an avatar by default', () => {
      const accountConnection = mountWithAppProvider(<AccountConnection />);
      expect(accountConnection.find(Avatar).exists()).toBeFalsy();
    });
  });

  describe('accountName', () => {
    it('is passed into the avatar', () => {
      const accountName = 'John Doe';
      const accountConnection = mountWithAppProvider(
        <AccountConnection accountName={accountName} connected />,
      );
      expect(accountConnection.find(Avatar).prop('name')).toBe(accountName);
    });

    it('is used to construct the initials when connected', () => {
      const accountName = 'John Doe';
      const initials = 'JD';
      const accountConnection = mountWithAppProvider(
        <AccountConnection accountName={accountName} connected />,
      );
      expect(accountConnection.find(Avatar).prop('initials')).toBe(initials);
    });

    it('is used as the title when not connected and no title is provided', () => {
      const accountName = 'John Doe';
      const accountConnection = mountWithAppProvider(
        <AccountConnection accountName={accountName} />,
      );
      expect(accountConnection.text()).toBe(accountName);
    });
  });

  describe('avatarUrl', () => {
    it('gets passed into the avatar when connected', () => {
      const avatarUrl = 'http://url-to-image/';
      const accountConnection = mountWithAppProvider(
        <AccountConnection avatarUrl={avatarUrl} connected />,
      );
      expect(accountConnection.find(Avatar).prop('source')).toBe(avatarUrl);
    });
  });
});
