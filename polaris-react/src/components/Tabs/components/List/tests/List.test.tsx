import {mountWithAppContext} from 'tests/modern';

import {List} from '../List';
import {Item} from '../../Item';

describe('<List />', () => {
  const mockProps = {
    focusIndex: -1,
    disclosureTabs: [
      {
        id: 'repeat-customers',
        name: 'Repeat customers',
      },
      {
        id: 'prospects',
        name: 'Prospects',
      },
    ],
  };

  it('renders an unordered list', async () => {
    const list = await mountWithAppContext(<List {...mockProps} />);

    expect(list).toContainReactComponent('ul');
  });

  describe('focusIndex', () => {
    it('does not pass focusIndex to last Item', async () => {
      const focusIndex = 1;
      const list = await mountWithAppContext(
        <List {...mockProps} focusIndex={focusIndex} />,
      );

      expect(list).toContainReactComponent(Item, {
        focused: false,
      });
    });

    it('passes focusIndex to first Item', async () => {
      const focusIndex = 1;
      const list = await mountWithAppContext(
        <List {...mockProps} focusIndex={focusIndex} />,
      );

      expect(list).toContainReactComponent(Item, {
        focused: true,
      });
    });
  });

  describe('disclosureTabs', () => {
    const disclosureTabs = [
      {
        id: 'repeat-customers',
        name: 'Repeat customers',
      },
      {
        id: 'prospects',
        name: 'Prospects',
      },
    ];

    it('renders a button for each item in disclosureTabs', async () => {
      const list = await mountWithAppContext(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );

      expect(list).toContainReactComponentTimes('button', 2);
    });

    it('passes the id to the button', async () => {
      const list = await mountWithAppContext(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );

      expect(list).toContainReactComponent('button', {
        id: 'repeat-customers',
      });
    });
  });

  describe('<Item />', () => {
    const disclosureTabs = [
      {
        id: 'repeat-customers',
        name: 'Repeat customers',
      },
      {
        id: 'prospects',
        name: 'Prospects',
      },
    ];

    it('renders an Item for each item in disclosureTabs', async () => {
      const list = await mountWithAppContext(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );

      expect(list).toContainReactComponentTimes(Item, 2);
    });

    it('renders the provided content', async () => {
      const list = await mountWithAppContext(
        <List {...mockProps} disclosureTabs={disclosureTabs} />,
      );

      expect(list.find(Item)).toContainReactText('Repeat customers');
    });
  });
});
