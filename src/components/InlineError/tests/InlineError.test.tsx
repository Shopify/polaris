import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';

import InlineError from '../InlineError';

describe('<InlineError />', () => {
  describe('fieldID', () => {
    it('renders with an ID generated from the fieldID', () => {
      const error = mountWithAppProvider(
        <InlineError message="Some error message" fieldID="SomeInput" />,
      );

      expect(error.find('#SomeInputError')).toHaveLength(1);
    });
  });

  describe('message', () => {
    it('only renders error markup when message is truthy', () => {
      const error = mountWithAppProvider(
        <InlineError message="Some error message" fieldID="SomeInput" />,
      );

      expect(error.find('#SomeInputError').text()).toContain(
        'Some error message',
      );

      error.setProps({message: ''});
      expect(error.find('#SomeInputError')).toBeNull;
    });
  });
});
