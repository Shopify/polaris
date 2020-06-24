import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {ButtonGroup, Heading, buttonsFrom} from 'components';

import {Header} from '../Header';

jest.mock('../../../../Button', () => ({
  ...(jest.requireActual('../../../../Button') as any),
  buttonsFrom: jest.fn(),
}));

const buttonsFromMock = buttonsFrom as jest.Mock;

describe('<Header />', () => {
  describe('title', () => {
    it('renders a heading when defined', () => {
      const header = mountWithAppProvider(<Header title="Staff accounts" />);
      expect(header.find(Heading).exists()).toBeTruthy();
    });

    it('renders the title directly if its a valid React element', () => {
      const title = <div>Staff accounts</div>;
      const header = mountWithAppProvider(<Header title={title} />);
      expect(header.find(Heading).exists()).toBeFalsy();
      expect(header.find(title)).toBeTruthy();
    });

    it('is used as the content for the heading', () => {
      const title = 'Staff accounts';
      const header = mountWithAppProvider(<Header title={title} />);
      expect(header.find(Heading).prop('children')).toBe(title);
    });
  });

  describe('actions', () => {
    const mockActions = [{content: 'Preview'}];

    it('renders a button group when defined', () => {
      const header = mountWithAppProvider(<Header actions={mockActions} />);
      expect(header.find(ButtonGroup).exists()).toBeTruthy();
    });

    it('renders buttons for each action', () => {
      mountWithAppProvider(<Header actions={mockActions} />);
      expect(buttonsFromMock).toHaveBeenCalledWith(
        mockActions,
        expect.anything(),
      );
    });

    it('does not render a button group when not defined', () => {
      const header = mountWithAppProvider(<Header />);
      expect(header.find(ButtonGroup).exists()).toBeFalsy();
    });
  });

  describe('children', () => {
    it('renders when defined', () => {
      const Children = () => <div>Hello!</div>;
      const header = mountWithAppProvider(
        <Header>
          <Children />
        </Header>,
      );
      expect(header.find(Children).exists()).toBeTruthy();
    });
  });
});
