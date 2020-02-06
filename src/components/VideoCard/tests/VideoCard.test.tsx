import React from 'react';
import {Heading, Popover, Button, ActionList} from '@shopify/polaris';
import faker from 'faker';
import {mountWithAppContext} from 'tests/modern';

import VideoCard from '../VideoCard';

function createVideoCard() {
  return {
    title: faker.random.words(),
    primaryActions: createPrimaryAction(),
    description: faker.random.words(),
    popoverActions: createPopoverActions(faker.random.number(3)),
  };
}

function createPrimaryAction() {
  return [
    {
      content: faker.random.words(),
      onAction: () => {},
      url: faker.internet.url(),
      external: true,
      accessibilityLabel: faker.random.words(),
    },
  ];
}

function createPopoverActions(num: number) {
  return new Array(num).fill({}).map(createPopoverAction);
}

function createPopoverAction() {
  return {
    content: faker.random.words(),
    onAction: () => {},
  };
}

describe('<VideoCard>', () => {
  it('renders title and checks contents', async () => {
    const titleText = 'Getting Started';
    const videoCard = await mountWithAppContext(
      <VideoCard {...createVideoCard()} title={titleText} />,
    );
    expect(videoCard.find(Heading)).not.toBeNull();
    expect(videoCard.find(Heading)!).toContainReactText(titleText);
  });

  it('renders description and checks contents', async () => {
    const descriptionLabel =
      'Discover how Shopify can power up your entrepreneurial journey.';
    const videoCard = await mountWithAppContext(
      <VideoCard {...createVideoCard()} description={descriptionLabel} />,
    );
    expect(videoCard.find('p', {className: 'Description'})).not.toBeNull();
    expect(videoCard.find('p', {className: 'Description'})).toContainReactText(
      descriptionLabel,
    );
  });

  it('renders CTA and checks contents', async () => {
    const mainCTALabel = 'Learn about getting started and more';
    const mainCTAUrl = faker.internet.url();
    const accesssibilityLabel = 'button1';
    const videoCard = await mountWithAppContext(
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

  it('renders CTA and plain button and checks contents', async () => {
    const secondaryCTALabel = 'Additional Info';
    const secondaryCTAUrl = faker.internet.url();
    const accesssibilityLabel = 'button2';
    const videoCard = await mountWithAppContext(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            content: faker.random.words(),
            url: faker.internet.url(),
            external: true,
            accessibilityLabel: faker.random.words(),
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

  it('calls the onAction callback when the CTA is clicked', async () => {
    const spy = jest.fn();
    const videoCard = await mountWithAppContext(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            onAction: spy,
          },
        ]}
      />,
    );
    videoCard.findAll(Button)[1].trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onAction callback when the plain button is clicked', async () => {
    const spy = jest.fn();
    const videoCard = await mountWithAppContext(
      <VideoCard
        {...createVideoCard()}
        primaryActions={[
          {
            content: faker.random.words(),
          },
          {
            onAction: spy,
          },
        ]}
      />,
    );
    videoCard.findAll(Button)[2].trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('toggles the popover menu when clicked and calls the first action item', async () => {
    const spy = jest.fn();
    const videoCard = await mountWithAppContext(
      <VideoCard
        {...createVideoCard()}
        popoverActions={[
          {
            content: 'Dismiss',
            onAction: spy,
          },
        ]}
      />,
    );

    videoCard
      .find(Popover)!
      .find(Button)!
      .trigger('onClick');
    expect(videoCard.find(Popover)!.prop('active')).toBeTrue();

    videoCard
      .find(Popover)!
      .find(Button)!
      .trigger('onClick');
    expect(videoCard.find(Popover)!.prop('active')).toBeFalse();

    const actionList = videoCard.find(ActionList)!;
    expect(actionList.prop('items')).toHaveLength(1);
    actionList.triggerKeypath('items[0].onAction');
    expect(spy).toHaveBeenCalled();
  });

  it('renders in landscape mode by default', async () => {
    const videoCard = await mountWithAppContext(
      <VideoCard {...createVideoCard()} />,
    );
    expect(videoCard.find('div', {className: 'PortraitContainer'})).toBeNull();
  });

  it('renders in portrait mode if specified', async () => {
    const videoCard = await mountWithAppContext(
      <VideoCard {...createVideoCard()} portrait />,
    );
    expect(
      videoCard.find('div', {className: 'Container PortraitContainer'}),
    ).not.toBeNull();
  });
});
