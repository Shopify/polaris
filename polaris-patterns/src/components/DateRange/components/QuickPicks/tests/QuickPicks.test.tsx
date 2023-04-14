import {OptionList} from '@shopify/polaris';

import {mountWithAppContext} from 'tests/modern';

import type {DateRange} from '../../../types';
import type {SectionDescriptor} from '../QuickPicks';
import {QuickPicks} from '../QuickPicks';

const recommended: DateRange[] = [
  {
    title: 'BFCM 2022',
    alias: 'bfcm-2022',
    period: {since: '2022-01-01', until: '2022-03-31'},
  },
];

const options: DateRange[] = [
  {
    title: 'Today',
    alias: 'today',
    period: {since: '2022-09-29', until: '2022-09-29'},
  },
];

const sections: SectionDescriptor[] = [
  {
    title: 'Quarters',
    options: [
      {
        title: 'Quarter 1',
        alias: 'quarter1',
        period: {since: '2022-01-01', until: '2022-03-31'},
      },
    ],
  },
];

describe('<QuickPicks />', () => {
  it('renders the component', async () => {
    const wrapper = await mountWithAppContext(
      <QuickPicks onSelect={jest.fn()} />,
    );

    expect(wrapper).toContainReactComponent(OptionList);
  });

  it('renders the recommended, regular and section quick picks', async () => {
    const wrapper = await mountWithAppContext(
      <QuickPicks
        recommended={recommended}
        options={options}
        sections={sections}
        selected={{
          value: 'quarter1',
          source: 'option',
          period: {since: '', until: ''},
        }}
        onSelect={jest.fn()}
      />,
    );

    const quartersButton = wrapper
      .findWhere((node) => node.text() === 'Quarters')!
      .find('button')!;

    quartersButton.trigger('onClick');

    expect(wrapper).toContainReactComponent(OptionList, {
      options: [{value: 'bfcm-2022', label: 'BFCM 2022'}],
    });

    expect(wrapper).toContainReactComponent(OptionList, {
      options: [{value: 'today', label: 'Today'}],
    });

    expect(wrapper).toContainReactComponent(OptionList, {
      options: [{value: 'quarter1', label: 'Quarter 1'}],
    });
  });

  it('calls on select with value and source as recommended when selecting a recommended option', async () => {
    const onSelect = jest.fn();

    const wrapper = await mountWithAppContext(
      <QuickPicks
        recommended={recommended}
        options={options}
        sections={sections}
        selected={{
          value: 'quarter1',
          source: 'option',
          period: {since: '', until: ''},
        }}
        onSelect={onSelect}
      />,
    );

    const bfcmButton = wrapper
      .findWhere((node) => node.text() === 'BFCM 2022')!
      .find('button')!;

    bfcmButton.trigger('onClick');

    expect(onSelect).toHaveBeenCalledWith({
      value: 'bfcm-2022',
      source: 'recommended-option',
      period: {
        since: '2022-01-01',
        until: '2022-03-31',
      },
    });
  });

  it('calls on select with value and source undefined when selecting a regular option', async () => {
    const onSelect = jest.fn();

    const wrapper = await mountWithAppContext(
      <QuickPicks
        recommended={recommended}
        options={options}
        sections={sections}
        selected={{
          value: 'quarter1',
          source: 'option',
          period: {since: '', until: ''},
        }}
        onSelect={onSelect}
      />,
    );

    const bfcmButton = wrapper
      .findWhere((node) => node.text() === 'Today')!
      .find('button')!;

    bfcmButton.trigger('onClick');

    expect(onSelect).toHaveBeenCalledWith({
      value: 'today',
      period: {since: '2022-09-29', until: '2022-09-29'},
      source: 'option',
    });
  });
});
