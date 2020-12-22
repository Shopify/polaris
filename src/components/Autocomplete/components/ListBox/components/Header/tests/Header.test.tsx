import React from 'react';
import {mount} from 'tests/modern';

import {Header} from '../Header';
import {Section} from '../../Section';

jest.mock('../../Section', () => ({
  ...jest.requireActual('../../Section'),
  useSection: jest.fn(),
}));

describe('Header', () => {
  afterEach(() => {
    mockUseSection('');
  });

  it('renders an element with aria hidden', async () => {
    const header = mount(<Header>Header</Header>);

    expect(header).toContainReactComponent('div', {'aria-hidden': true});
  });

  it('renders an element with id from Section', () => {
    const id = 'mock-id';
    mockUseSection(id);
    const section = mount(<Section title={<Header>Header</Header>} />);

    expect(section).toContainReactComponent('div', {
      id,
    });
  });
});

function mockUseSection(id: string) {
  const useSection: jest.Mock = jest.requireMock('../../Section').useSection;

  useSection.mockReturnValue(id);
}
