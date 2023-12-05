import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../Text';
import {Popover} from '../../Popover';
import {Button} from '../../Button';
import {ActionList} from '../../ActionList';
import {Badge} from '../../Badge';
import {MediaCard} from '../MediaCard';
import styles from '../MediaCard.scss';

const mockProps = {
  children: <img alt="" />,
  title: 'test title',
  description: 'test description',
  primaryAction: {
    content: 'test primary action',
    onAction: () => {},
  },
};

describe('<MediaCard>', () => {
  it('renders the title as a Text', () => {
    const title = 'Getting Started';
    const videoCard = mountWithApp(<MediaCard {...mockProps} title={title} />);

    expect(videoCard).toContainReactComponent(Text, {children: title});
  });

  it('title can have any valid react element', () => {
    const titleString = 'Online store';
    const badgeString = 'I am a badge';
    const title = (
      <h2>
        {titleString}
        <Badge>{badgeString}</Badge>
      </h2>
    );
    const videoCard = mountWithApp(<MediaCard {...mockProps} title={title} />);

    const headerMarkup = videoCard.find('h2')!;

    expect(headerMarkup.find(Badge)).toContainReactText(badgeString);
    expect(headerMarkup).toContainReactText(titleString);
  });

  it('renders the description as a paragraph', () => {
    const description = 'test';
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} description={description} />,
    );

    expect(videoCard).toContainReactComponent('p', {children: description});
  });

  it('does not render a wrapper around actions when primaryAction and secondaryAction are empty', () => {
    const videoCard = mountWithApp(
      <MediaCard
        {...mockProps}
        primaryAction={undefined}
        secondaryAction={undefined}
      />,
    );

    expect(videoCard).not.toContainReactComponent('div', {
      className: expect.stringContaining(styles.ActionContainer),
    });
  });

  it('renders a wrapper around actions when primaryAction and secondaryAction are provided', () => {
    const mockAction = {content: 'test'};
    const videoCardWithPrimaryAction = mountWithApp(
      <MediaCard {...mockProps} primaryAction={mockAction} />,
    );
    const videoCardWithSecondaryAction = mountWithApp(
      <MediaCard
        {...mockProps}
        primaryAction={undefined}
        secondaryAction={mockAction}
      />,
    );

    expect(videoCardWithPrimaryAction).toContainReactComponent('div', {
      className: expect.stringContaining(styles.ActionContainer),
    });
    expect(videoCardWithSecondaryAction).toContainReactComponent('div', {
      className: expect.stringContaining(styles.ActionContainer),
    });
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

  it('renders a dismiss button when onDismiss is passed', () => {
    const videoCard = mountWithApp(
      <MediaCard {...mockProps} onDismiss={() => {}} />,
    );

    expect(videoCard).toContainReactComponent(Button, {
      accessibilityLabel: 'Dismiss',
    });
  });

  it('renders in landscape mode by default', () => {
    const videoCard = mountWithApp(<MediaCard {...mockProps} />);

    expect(videoCard.find('div')).toContainReactComponentTimes('div', 0, {
      className: 'portrait',
    });
  });

  it('renders a smaller media if smallMedia is provided', () => {
    const videoCard = mountWithApp(<MediaCard {...mockProps} size="small" />);

    expect(videoCard.find('div')).toContainReactComponentTimes('div', 1, {
      className: 'MediaContainer sizeSmall',
    });
    expect(videoCard.find('div')).toContainReactComponentTimes('div', 1, {
      className: 'InfoContainer sizeSmall',
    });
  });
});
