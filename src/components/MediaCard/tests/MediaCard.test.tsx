import React from 'react';
import {Heading, Popover, Button, ActionList} from 'components';
import {mountWithApp} from 'test-utilities';

import {MediaCard} from '../MediaCard';

const mockProps = {
  title: 'test title',
  description: 'test description',
  primaryAction: {
    content: 'test primary action',
    onAction: () => {},
  },
};

describe('<MediaCard>', () => {
  it('renders the title as a Heading', () => {
    const title = 'Getting Started';
    const videoCard = mountWithApp(<MediaCard {...mockProps} title={title} />);

    expect(videoCard).toContainReactComponent(Heading, {children: title});
  });

  it('renders the description as a paragraph', () => {
    const description = 'test';
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} description={description} />,
    );

    expect(videoCard).toContainReactComponent('p', {children: description});
  });

  it('renders a Button with the primaryAction', () => {
    const primaryAction = {content: 'test primary action'};
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} primaryAction={primaryAction} />,
    );

    expect(videoCard).toContainReactComponent(Button, {
      children: primaryAction.content,
    });
  });

  it('renders secondaryAction as a plain Button', () => {
    const secondaryAction = {content: 'test'};
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} secondaryAction={secondaryAction} />,
    );

    expect(videoCard).toContainReactComponent(Button, {
      children: secondaryAction.content,
    });
  });

  it('renders a Popover and ActionList when popoverActions are provided', () => {
    const actions = [{content: 'Dismiss'}];
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} popoverActions={actions} />,
    );

    expect(videoCard).toContainReactComponentTimes(Popover, 1);

    const popoverActivator = videoCard.find(Popover)!.find(Button);
    popoverActivator!.trigger('onClick');

    expect(videoCard).toContainReactComponent(ActionList, {
      items: actions,
    });
  });

  it('does not render a Popover if popoverActions are empty', () => {
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} popoverActions={[]} />,
    );

    expect(videoCard).not.toContainReactComponent(Popover);
  });

  it('renders in landscape mode by default', () => {
    const videoCard = mountWithApp(<MediaCard {...mockProps} />);

    expect(videoCard.find('div')).toContainReactComponentTimes('div', 0, {
      className: 'portrait',
    });
  });
});
