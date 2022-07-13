import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {buttonsFrom} from '../../../../Button';
import {ButtonGroup} from '../../../../ButtonGroup';
// eslint-disable-next-line import/no-deprecated
import {Heading} from '../../../../Heading';
import {Header} from '../Header';

jest.mock('../../../../Button', () => ({
  ...(jest.requireActual('../../../../Button') as any),
  buttonsFrom: jest.fn(),
}));

const buttonsFromMock = buttonsFrom as jest.Mock;

describe('<Header />', () => {
  describe('title', () => {
    it('renders a heading when defined', () => {
      const header = mountWithApp(<Header title="Staff accounts" />);
      // eslint-disable-next-line import/no-deprecated
      expect(header).toContainReactComponent(Heading);
    });

    it('renders the title directly if its a valid React element', () => {
      const title = <div>Staff accounts</div>;
      const header = mountWithApp(<Header title={title} />);
      // eslint-disable-next-line import/no-deprecated
      expect(header).not.toContainReactComponent(Heading);
      expect(header).toContainReactComponent('div', {
        children: 'Staff accounts',
      });
    });

    it('is used as the content for the heading', () => {
      const title = 'Staff accounts';
      const header = mountWithApp(<Header title={title} />);
      // eslint-disable-next-line import/no-deprecated
      expect(header.find(Heading)).toContainReactText(title);
    });
  });

  describe('actions', () => {
    const mockActions = [{content: 'Preview'}];

    it('renders a button group when defined', () => {
      const header = mountWithApp(<Header actions={mockActions} />);
      expect(header).toContainReactComponent(ButtonGroup);
    });

    it('renders buttons for each action', () => {
      mountWithApp(<Header actions={mockActions} />);
      expect(buttonsFromMock).toHaveBeenCalledWith(
        mockActions,
        expect.anything(),
      );
    });

    it('does not render a button group when not defined', () => {
      const header = mountWithApp(<Header />);
      expect(header).not.toContainReactComponent(ButtonGroup);
    });
  });

  describe('children', () => {
    it('renders when defined', () => {
      const Children = () => <div>Hello!</div>;
      const header = mountWithApp(
        <Header>
          <Children />
        </Header>,
      );
      expect(header).toContainReactComponent(Children);
    });
  });
});
