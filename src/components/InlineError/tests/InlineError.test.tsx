import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {InlineError, errorTextID} from '../InlineError';

describe('<InlineError />', () => {
  describe('fieldID', () => {
    it('renders with an ID generated from the fieldID', () => {
      const fieldId = 'ProductTitle';
      const expectedId = `#${errorTextID(fieldId)}`;

      const error = mountWithAppProvider(
        <InlineError message="Title can’t be blank" fieldID={fieldId} />,
      );

      expect(error.find(expectedId)).toHaveLength(1);
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
