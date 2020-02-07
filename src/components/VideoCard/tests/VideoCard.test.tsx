import React from 'react';
import {Heading, Popover, Button, ActionList} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {VideoCard} from '../VideoCard';

function createVideoCard() {
  return {
    title: '',
    primaryActions: createPrimaryAction(),
    description: '',
    popoverActions: createPopoverActions(2),
  };
}

function createPrimaryAction() {
  return [
    {
      content: '',
      onAction: () => {},
      url: '',
      external: true,
      accessibilityLabel: '',
    },
  ];
}

function createPopoverActions(num: number) {
  return new Array(num).fill({}).map(createPopoverAction);
}

function createPopoverAction() {
  return {
    content: '',
    onAction: () => {},
  };
}

describe('<VideoCard>', () => {
  it('renders title and checks contents', () => {
    const titleText = 'Getting Started';
    const videoCard = mountWithApp(
      <VideoCard {...createVideoCard()} title={titleText} />,
    );
    expect(videoCard.find(Heading)).not.toBeNull();
    expect(videoCard.find(Heading)!).toContainReactText(titleText);
  });

  it('renders description and checks contents', () => {
    const descriptionLabel =
      'Discover how Shopify can power up your entrepreneurial journey.';
    const videoCard = mountWithApp(
      <VideoCard {...createVideoCard()} description={descriptionLabel} />,
    );
    expect(videoCard.find('p', {className: 'Description'})).not.toBeNull();
    expect(videoCard.find('p', {className: 'Description'})).toContainReactText(
      descriptionLabel,
    );
  });

  it('renders CTA and checks contents', () => {
    const mainCTALabel = 'Learn about getting started and more';
    const mainCTAUrl = '';
    const accesssibilityLabel = 'button1';
    const videoCard = mountWithApp(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            content: mainCTALabel,
            url: mainCTAUrl,
            external: true,
            accessibilityLabel: accesssibilityLabel,
          },
        ]}
      />,
    );
    expect(videoCard.find(Button)).not.toBeNull();
    expect(videoCard).toContainReactComponent(Button, {
      url: mainCTAUrl,
      external: true,
      accessibilityLabel: accesssibilityLabel,
    });
    expect(
      videoCard.find(Button, {
        children: mainCTALabel,
      })!,
    ).toContainReactText(mainCTALabel);
  });

  it('renders CTA and plain button and checks contents', () => {
    const secondaryCTALabel = 'Additional Info';
    const secondaryCTAUrl = '';
    const accesssibilityLabel = 'button2';
    const videoCard = mountWithApp(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            content: '',
            url: '',
            external: true,
            accessibilityLabel: '',
          },
          {
            content: secondaryCTALabel,
            url: secondaryCTAUrl,
            external: true,
            accessibilityLabel: accesssibilityLabel,
          },
        ]}
      />,
    );
    expect(videoCard.find(Button)).not.toBeNull();
    expect(videoCard).toContainReactComponent(Button, {
      url: secondaryCTAUrl,
      external: true,
      accessibilityLabel: accesssibilityLabel,
    });
    expect(
      videoCard.find(Button, {
        children: secondaryCTALabel,
      })!,
    ).toContainReactText(secondaryCTALabel);
  });

  it('calls the onAction callback when the CTA is clicked', () => {
    const spy = jest.fn();
    const videoCard = mountWithAppProvider(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            onAction: spy,
          },
        ]}
      />,
    );
    videoCard
      .find('button')
      .last()
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onAction callback when the plain button is clicked', () => {
    const spy = jest.fn();
    const videoCard = mountWithAppProvider(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            content: '',
          },
          {
            onAction: spy,
          },
        ]}
      />,
    );

    videoCard
      .find('button')
      .last()
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('toggles the popover menu when clicked and calls the first action item', () => {
    const spyDismiss = jest.fn();
    const spyFeedback = jest.fn();
    const videoCard = mountWithAppProvider(
      <VideoCard
        {...createVideoCard()}
        popoverActions={[
          {
            content: 'Dismiss',
            onAction: spyDismiss,
          },
          {
            content: 'Feedback',
            onAction: spyFeedback,
          },
        ]}
      />,
    );
    trigger(videoCard.find(Popover)!.find(Button)!, 'onClick');
    expect(videoCard.find(Popover)!.prop('active')).toBe(true);

    trigger(videoCard.find(Popover)!.find(Button)!, 'onClick');
    expect(videoCard.find(Popover)!.prop('active')).toBe(false);

    const actionList = videoCard.find(ActionList)!;
    expect(actionList.prop('items')).toHaveLength(2);

    actionList
      .find('button')
      .first()
      .simulate('click');
    expect(spyDismiss).toHaveBeenCalled();
    actionList
      .find('button')
      .last()
      .simulate('click');
    expect(spyFeedback).toHaveBeenCalled();
  });

  it('does not render popover menu if secondary actions are empty', () => {
    const videoCard = mountWithApp(
      <VideoCard {...createVideoCard()} popoverActions={[]} />,
    );
    expect(videoCard).not.toContainReactComponent(Popover);
  });

  it('renders in landscape mode by default', () => {
    const videoCard = mountWithApp(<VideoCard {...createVideoCard()} />);
    expect(videoCard.find('div', {className: 'PortraitContainer'})).toBeNull();
  });

  it('renders in portrait mode if specified', () => {
    const videoCard = mountWithApp(
      <VideoCard {...createVideoCard()} portrait />,
    );
    expect(
      videoCard.find('div', {className: 'Container PortraitContainer'}),
    ).not.toBeNull();
  });
});
