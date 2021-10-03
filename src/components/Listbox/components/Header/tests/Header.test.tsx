import React from 'react';
import {mountWithApp} from 'test-utilities';

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

  it('renders an element with aria hidden', () => {
    const header = mountWithApp(<Header>Header</Header>);

    expect(header).toContainReactComponent('div', {'aria-hidden': true});
  });

  it('renders string headers with standard styling', () => {
    const header = mountWithApp(<Header>Header</Header>);

    expect(header).toContainReactComponent('div', {className: 'Header'});
  });

  it('renders headers without default wrapper when not type string', () => {
    const header = mountWithApp(
      <Header>
        <button>header</button>
      </Header>,
    );

    expect(header).toContainReactComponent('button');
    expect(header).not.toContainReactComponent('div', {className: 'Header'});
  });

  it('renders an element with id from Section', () => {
    const id = 'mock-id';
    mockUseSection(id);
    const section = mountWithApp(<Section title={<Header>Header</Header>} />);

    expect(section).toContainReactComponent('div', {
      id,
    });
  });
});

function mockUseSection(id: string) {
  const useSection: jest.Mock = jest.requireMock('../../Section').useSection;

  useSection.mockReturnValue(id);
}
