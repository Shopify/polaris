import React from 'react';
import {mountWithApp} from 'test-utilities';
import {TextField, Button, Popover, ActionList} from 'components';

import {PhoneField} from '../PhoneField';

const countries = [
  {
    image: '🇺🇸',
    countryName: 'United States',
    countryCode: '+1',
    displayFormat: [3, 3, 4],
    areaCodes: [201, 202, 408, 409, 412],
  },
];

describe('<PhoneField />', () => {
  it('renders an error message when the validator returns false', () => {
    const errorMessage = 'Please enter a valid phone number';
    const element = mountWithApp(
      <PhoneField
        countries={countries}
        validator={() => false}
        errorMessage={errorMessage}
      />,
    );

    expect(element).toContainReactComponent(TextField, {
      error: errorMessage,
    });
  });
});
