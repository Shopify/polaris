import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Picker} from '../Picker';
import {Activator, SearchField} from '../components';
import {Listbox} from '../../Listbox';

describe('<Picker />', () => {
  it('renders an Activator', () => {
    const activatorProps = {
      label: 'Vendor',
      placeholder: 'Pick a vendor',
    };

    const picker = mountWithApp(<Picker activator={activatorProps} />);

    expect(picker).toContainReactComponent(Activator, activatorProps);
  });

  it('renders a SearchField', () => {
    const picker = mountWithApp(
      <Picker
        searchField={{label: 'Input', autoComplete: 'off'}}
        activator={{label: 'Choose something'}}
      />,
    );

    picker.find('button')!.trigger('onClick');

    expect(picker).toContainReactComponent(SearchField);
  });

  it('renders a Listbox with Listbox.Options', () => {
    const options = [
      {value: 'one', children: 'One'},
      {value: 'two', children: 'Two'},
    ];

    const picker = mountWithApp(<Picker activator={{}} options={options} />);

    picker.find('button')!.trigger('onClick');

    expect(picker).toContainReactComponent(Listbox);
    expect(picker).toContainReactComponentTimes(Listbox.Option, options.length);
  });

  it('renders a Listbox.Action with an addAction', () => {
    const addAction = {value: 'add', children: 'Add'};
    const picker = mountWithApp(
      <Picker
        activator={{}}
        addAction={addAction}
        options={[{value: 'one', children: 'One'}]}
        searchField={{label: '', autoComplete: 'off'}}
      />,
    );

    picker.find('button')!.trigger('onClick');
    picker.find(SearchField)!.trigger('onChange', 'Add');

    expect(picker).toContainReactComponent(Listbox.Action);
  });

  it('filters the options when the search field changes', () => {
    const options = [
      {value: 'one', children: 'One'},
      {value: 'two', children: 'Two'},
    ];

    const picker = mountWithApp(
      <Picker
        activator={{}}
        options={options}
        searchField={{label: '', autoComplete: 'off'}}
      />,
    );

    picker.find('button')!.trigger('onClick');
    expect(picker).toContainReactComponentTimes(Listbox.Option, options.length);

    picker.find(SearchField)!.trigger('onChange', 'One');
    expect(picker).toContainReactComponentTimes(Listbox.Option, 1);
  });
});
