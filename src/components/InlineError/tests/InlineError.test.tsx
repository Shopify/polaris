import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import InlineError from '../InlineError';

describe('<InlineError />', () => {
  describe('fieldID', () => {
    it('renders with an ID generated from the fieldID', () => {
      const error = mountWithAppProvider(
        <InlineError message="Title can’t be blank" fieldID="ProductTitle" />,
      );

      expect(error.find('#ProductTitleError')).toHaveLength(1);
    });
  });

  describe('message', () => {
    it('only renders error markup when message is truthy', () => {
      const error = mountWithAppProvider(
        <InlineError message="Title can’t be blank" fieldID="ProductTitle" />,
      );

      expect(error.find('#ProductTitleError').text()).toContain(
        'Title can’t be blank',
      );

      error.setProps({message: ''});
      expect(error.find('#ProductTitleError')).toHaveLength(0);
    });
  });
});
