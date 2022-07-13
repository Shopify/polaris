import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Spinner} from '../Spinner';
// eslint-disable-next-line import/no-deprecated
import {VisuallyHidden} from '../../VisuallyHidden';

describe('<Spinner />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the spinner', () => {
      const spinner = mountWithApp(
        <Spinner accessibilityLabel="Content is loading" />,
      );
      // eslint-disable-next-line import/no-deprecated
      expect(spinner.find(VisuallyHidden)).toContainReactText(
        'Content is loading',
      );
    });
  });

  describe('size', () => {
    it('renders a large spinner by default', () => {
      const spinner = mountWithApp(<Spinner />);

      expect(spinner).toContainReactComponentTimes('span', 1, {
        className: expect.stringContaining('sizeLarge'),
      });
    });

    it('renders a large spinner when size is large', () => {
      const spinner = mountWithApp(<Spinner size="large" />);

      expect(spinner).toContainReactComponentTimes('span', 1, {
        className: expect.stringContaining('sizeLarge'),
      });
    });

    it('renders a small spinner when size is small', () => {
      const spinner = mountWithApp(<Spinner size="small" />);

      expect(spinner).toContainReactComponentTimes('span', 1, {
        className: expect.stringContaining('sizeSmall'),
      });
    });
  });

  describe('role', () => {
    it('sets the role to status to denote advisory information to screen readers when a live region is not active', () => {
      const spinner = mountWithApp(<Spinner hasFocusableParent={false} />);
      expect(spinner).toContainReactComponentTimes('span', 1, {role: 'status'});
    });

    it('does not set role to status when a live region is active', () => {
      const spinner = mountWithApp(<Spinner hasFocusableParent />);
      expect(spinner).not.toContainReactComponent('span', {role: 'status'});
    });
  });
});
