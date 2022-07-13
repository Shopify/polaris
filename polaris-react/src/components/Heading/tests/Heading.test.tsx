import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {Heading} from '../Heading';

describe('<Heading />', () => {
  it('renders its children', () => {
    const text = 'Online store dashboard';
    const heading = mountWithApp(<Heading element="h1">{text}</Heading>);
    expect(heading).toContainReactText(text);
  });

  it('renders the specified element', () => {
    const heading = mountWithApp(
      <Heading element="h1">Online store dashboard</Heading>,
    );
    expect(heading.find('h1')).not.toBeNull();
  });

  it('renders an h2 element if not specified', () => {
    const heading = mountWithApp(<Heading>Online store dashboard</Heading>);
    expect(heading.find('h2')).not.toBeNull();
  });

  it('renders an ID for hash links', () => {
    const heading = mountWithApp(
      <Heading element="h1" id="dashboard">
        Online store dashboard
      </Heading>,
    );
    expect(heading.find('h1')!.props.id).toBe('dashboard');
  });
});
