import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {InlineError, errorTextID} from '../InlineError';

describe('<InlineError />', () => {
  describe('fieldID', () => {
    it('renders with an ID generated from the fieldID', () => {
      const fieldId = 'ProductTitle';
      const expectedId = `${errorTextID(fieldId)}`;

      const error = mountWithApp(
        <InlineError message="Title can’t be blank" fieldID={fieldId} />,
      );

      expect(error).toContainReactComponent('div', {id: expectedId});
    });
  });

  describe('message', () => {
    it('only renders error markup when message is truthy', () => {
      const error = mountWithApp(
        <InlineError message="Title can’t be blank" fieldID="ProductTitle" />,
      );

      expect(error.find('div', {id: 'ProductTitleError'})).toContainReactText(
        'Title can’t be blank',
      );

      error.setProps({message: ''});

      expect(error).not.toContainReactComponent('div', {
        id: 'ProductTitleError',
      });
    });
  });
});
