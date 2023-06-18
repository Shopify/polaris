import React from 'react';
import {Collapsible} from '@shopify/polaris';
import {mountWithApp} from 'tests/utilities';

import type {DateRange} from '../../../../../types';
import {QuickPicksSection} from '../QuickPicksSection';

describe('<QuickPicksSection />', () => {
  it('renders the component', async () => {
    const options: DateRange[] = [
      {
        title: 'Today',
        alias: 'today',
        period: {since: '2022-09-29', until: '2022-09-29'},
      },
      {
        title: 'Yesterday',
        alias: 'yesterday',
        period: {since: '2022-09-28', until: '2022-09-28'},
      },
    ];
    const wrapper = await mountWithApp(
      <QuickPicksSection onChange={jest.fn()} options={options} />,
    );

    expect(wrapper).toContainReactComponent(Collapsible);
  });

  it('does not render the component if there are no options', async () => {
    const wrapper = await mountWithApp(
      <QuickPicksSection onChange={jest.fn()} options={[]} />,
    );

    expect(wrapper).not.toContainReactComponent(Collapsible);
  });

  it('renders expanded if the selected prop is in the options list component', async () => {
    const options: DateRange[] = [
      {
        title: 'Today',
        alias: 'today',
        period: {since: '2022-09-29', until: '2022-09-29'},
      },
    ];

    const wrapper = await mountWithApp(
      <QuickPicksSection
        onChange={jest.fn()}
        options={options}
        selected={['today']}
      />,
    );

    expect(wrapper).toContainReactComponent(Collapsible, {open: true});
  });

  it('renders collapsed if the selected prop is not in the options list component', async () => {
    const options: DateRange[] = [
      {
        title: 'Today',
        alias: 'today',
        period: {since: '2022-09-29', until: '2022-09-29'},
      },
    ];

    const wrapper = await mountWithApp(
      <QuickPicksSection
        onChange={jest.fn()}
        options={options}
        selected={['another-selection']}
      />,
    );

    expect(wrapper).toContainReactComponent(Collapsible, {open: false});
  });

  it('calls onChange when selecting an option', async () => {
    const onChange = jest.fn();

    const options: DateRange[] = [
      {
        title: 'Today',
        alias: 'today',
        period: {since: '2022-09-29', until: '2022-09-29'},
      },
      {
        title: 'Yesterday',
        alias: 'yesterday',
        period: {since: '2022-09-28', until: '2022-09-28'},
      },
    ];

    const wrapper = await mountWithApp(
      <QuickPicksSection
        onChange={onChange}
        options={options}
        selected={['today']}
      />,
    );

    const bfcmButton = wrapper
      .findWhere((node) => node.text() === 'Yesterday')!
      .find('button')!;

    bfcmButton.trigger('onClick');

    expect(onChange).toHaveBeenCalledWith(['yesterday']);
  });
});
