import {mountWithApp} from 'tests/utilities';

import {Avatar} from '../../Avatar';
import {Button} from '../../Button';
import {AccountConnection} from '../AccountConnection';

describe('<AccountConnection />', () => {
  describe('title', () => {
    it('shows the title when one is provided', () => {
      const title = 'Example app';
      const accountConnection = mountWithApp(
        <AccountConnection title={title} />,
      );
      expect(accountConnection).toContainReactText(title);
    });
  });

  describe('details', () => {
    it('is shown on the card when provided', () => {
      const details = 'No account connected.';
      const accountConnection = mountWithApp(
        <AccountConnection details={details} />,
      );
      expect(accountConnection).toContainReactText(details);
    });
  });

  describe('termsOfService', () => {
    it('is shown on the card when provided', () => {
      const TermsOfService = () => (
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Sample App’s
          terms and conditions. You’ll pay a commission rate of 15% on sales
          made through Sample App.
        </p>
      );
      const accountConnection = mountWithApp(
        <AccountConnection termsOfService={<TermsOfService />} />,
      );
      expect(accountConnection).toContainReactComponent(TermsOfService);
    });
  });

  describe('action', () => {
    it('creates a primary button using the given action', () => {
      const action = {
        content: 'Connect',
        onAction: noop,
      };
      const accountConnection = mountWithApp(
        <AccountConnection action={action} />,
      );
      expect(accountConnection).toContainReactComponent(Button, {
        children: action.content,
        onClick: action.onAction,
        primary: true,
      });
    });

    it('makes the button secondary when connected', () => {
      const action = {
        content: 'Connect',
        onAction: noop,
      };
      const accountConnection = mountWithApp(
        <AccountConnection action={action} connected />,
      );
      expect(accountConnection).toContainReactComponent(Button, {
        children: action.content,
        onClick: action.onAction,
        primary: false,
      });
    });
  });

  describe('connected', () => {
    it('shows an avatar when truthy', () => {
      const accountConnection = mountWithApp(<AccountConnection connected />);
      expect(accountConnection).toContainReactComponent(Avatar);
    });

    it('doesnt show an avatar by default', () => {
      const accountConnection = mountWithApp(<AccountConnection />);
      expect(accountConnection).not.toContainReactComponent(Avatar);
    });
  });

  describe('accountName', () => {
    it('is passed into the avatar', () => {
      const accountName = 'John Doe';
      const accountConnection = mountWithApp(
        <AccountConnection accountName={accountName} connected />,
      );
      expect(accountConnection).toContainReactComponent(Avatar, {
        name: accountName,
      });
    });

    it('is used to construct the initials when connected', () => {
      const accountName = 'John Doe';
      const initials = 'JD';
      const accountConnection = mountWithApp(
        <AccountConnection accountName={accountName} connected />,
      );
      expect(accountConnection).toContainReactComponent(Avatar, {
        initials,
      });
    });

    it('is used as the title when not connected and no title is provided', () => {
      const accountName = 'John Doe';
      const accountConnection = mountWithApp(
        <AccountConnection accountName={accountName} />,
      );
      expect(accountConnection).toContainReactText(accountName);
    });
  });

  describe('avatarUrl', () => {
    it('gets passed into the avatar when connected', () => {
      const avatarUrl = 'http://url-to-image/';
      const accountConnection = mountWithApp(
        <AccountConnection avatarUrl={avatarUrl} connected />,
      );
      expect(accountConnection).toContainReactComponent(Avatar, {
        source: avatarUrl,
      });
    });
  });
});

function noop() {}
