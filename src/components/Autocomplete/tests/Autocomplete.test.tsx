import * as React from 'react';
import Autocomplete from '..';
import ComboBox from '../components/ComboBox';
import Spinner from '../../Spinner';
import {mountWithAppProvider} from '../../../../tests/utilities';

describe('<Autocomplete/>', () => {
  const options = [
    {value: 'cheese_pizza', label: 'Cheese Pizza'},
    {value: 'macaroni_pizza', label: 'Macaroni Pizza'},
    {value: 'pepperoni_pizza', label: 'Pepperoni Pizza'},
  ];
  it('mounts', () => {
    const autocomplete = mountWithAppProvider(
      <Autocomplete
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={emptyFunction}
      />,
    );
    expect(autocomplete.find(Autocomplete).exists()).toBe(true);
  });

  it('displays a spinner when loading is true', () => {
    const autocomplete = mountWithAppProvider(
      <Autocomplete
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={emptyFunction}
        loading
      />,
    );
    autocomplete.simulate('click');
    expect(autocomplete.find(Spinner).exists()).toBe(true);
  });
});

function renderTextField() {
  return <ComboBox.TextField label="" onChange={emptyFunction} />;
}

function emptyFunction() {
  return {};
}
