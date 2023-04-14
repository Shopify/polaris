import {Button, Popover} from '@shopify/polaris';

import {mountWithAppContext} from 'tests/modern';

import type {Props, QuickPicks} from '../DateRange';
import {DatePicker} from '../DateRange';
import TextFields from '../components/TextFields';

const mockQuickPicks: QuickPicks = {
  options: [
    {
      title: 'Today',
      alias: 'today',
      period: {
        since: 'today',
        until: 'today',
      },
    },
    {
      title: 'Yesterday',
      alias: 'yesterday',
      period: {
        since: 'yesterday',
        until: 'yesterday',
      },
    },
    {
      title: 'Last 7 days',
      alias: 'last7days',
      period: {
        since: '-7d',
        until: '-1d',
      },
    },
  ],
};

const mockProps: Props = {
  datePeriod: {
    since: new Date(),
    until: new Date(),
  },
  timeZone: undefined,
  onChange: jest.fn(),
  quickPicks: mockQuickPicks,
};

describe('<DatePicker />', () => {
  it('renders the popover component', async () => {
    const wrapper = await mountWithAppContext(<DatePicker {...mockProps} />);

    expect(wrapper).toContainReactComponent(Popover);
  });

  it('applies the new reporting period when the apply button is clicked', async () => {
    const onChangeSpy = jest.fn();

    const wrapper = await mountWithAppContext(
      <DatePicker {...mockProps} onChange={onChangeSpy} />,
    );

    const button = wrapper.find(Button);
    button!.triggerKeypath('onClick');

    const textFields = wrapper.find(TextFields)!;

    const mockReportingPeriod = {
      since: new Date('October 29 1989'),
      until: new Date('October 31 1989'),
    };

    textFields.triggerKeypath('onChange', mockReportingPeriod);

    const applyButton = wrapper
      .findAll(Button)
      .filter((button) => button.text() === 'Apply')[0];
    applyButton.triggerKeypath('onClick');

    expect(onChangeSpy).toHaveBeenCalledWith(
      {
        since: new Date('October 29 1989'),
        // Until date is set to be the last millisecond of the day
        until: new Date('October 31 1989 23:59:59.999Z'),
      },
      {
        since: '1989-10-29',
        until: '1989-10-31',
      },
      'input',
    );
  });

  it('closes <Datapicker /> when popoverOptions.forcePopoverClose is true', async () => {
    const wrapper = await mountWithAppContext(
      <DatePicker {...mockProps} popoverOptions={{forcePopoverClose: false}} />,
    );

    const button = wrapper.find(Button);
    button!.triggerKeypath('onClick');

    expect(wrapper).toContainReactComponent(Popover, {active: true});

    wrapper.setProps({popoverOptions: {forcePopoverClose: true}});

    expect(wrapper).toContainReactComponent(Popover, {active: false});
  });
});
