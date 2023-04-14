import {mountWithAppContext} from 'tests/modern';

import ActivatorButton from '../ActivatorButton';

const mockProps = {
  toggleViewer: () => {},
  fullWidth: true,
  timeZone: 'America/New_York',
  datePeriod: {
    since: new Date(),
    until: new Date(),
  },
};

describe('<ActivatorButton>', () => {
  it('renders the active date period', async () => {
    const wrapper = await mountWithAppContext(
      <ActivatorButton
        {...mockProps}
        datePeriod={{
          since: new Date('1989-10-29T11:00:00-05:00'),
          until: new Date('1989-10-31T11:00:00-05:00'),
        }}
      />,
    );

    expect(wrapper).toContainReactText('Oct 29–Oct 31, 1989');
  });

  it('renders the date range title when applicable', async () => {
    const wrapper = await mountWithAppContext(
      <ActivatorButton
        {...mockProps}
        datePeriod={{
          since: new Date(),
          until: new Date(),
        }}
        dateRanges={[
          {
            title: 'Today',
            alias: 'today',
            period: {
              since: 'today',
              until: 'today',
            },
          },
        ]}
      />,
    );

    expect(wrapper).toContainReactText('Today');
  });
});
