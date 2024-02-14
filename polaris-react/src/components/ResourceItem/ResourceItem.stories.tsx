import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Avatar,
  LegacyCard,
  ResourceItem,
  ResourceList,
  Text,
} from '@shopify/polaris';
import type {ResourceListProps} from '@shopify/polaris';

export default {
  component: ResourceItem,
} as ComponentMeta<typeof ResourceItem>;

export function Default() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'blog post', plural: 'blog posts'}}
        items={[
          {
            id: '6',
            url: '#',
            title: 'How To Get Value From Wireframes',
            author: 'Jonathan Mangrove',
          },
        ]}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const {id, url, title, author} = item;
          const authorMarkup = author ? <div>by {author}</div> : null;
          return (
            <ResourceItem
              id={id}
              url={url}
              accessibilityLabel={`View details for ${title}`}
              name={title}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {title}
                </Text>
              </h3>
              {authorMarkup}
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function SelectableWithMedia() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        selectable
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
          },
          {
            id: '146',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/woman-standing-in-front-of-yellow-background.jpg?width=746',
            name: 'Jane Smith',
            location: 'Manhattan, New York',
          },
          {
            id: '147',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/relaxing-in-headphones.jpg?width=746',
            name: 'Grace Baker',
            location: 'Los Angeles, California',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location} = item;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function WithMedia() {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location} = item;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function WithShortcutActions() {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
            latestOrderUrl: '#latestOrderUrl',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location, latestOrderUrl} = item;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              shortcutActions={[
                {content: 'View latest order', url: latestOrderUrl},
              ]}
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function WithPersistedShortcutActions() {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
            latestOrderUrl: '#latestOrderUrl',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location, latestOrderUrl} = item;
          const shortcutActions = latestOrderUrl
            ? [{content: 'View latest order', url: latestOrderUrl}]
            : undefined;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              persistActions
              shortcutActions={shortcutActions}
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function WithVerticalAlignment() {
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
            lastOrder: 'Emerald Silk Gown',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location, lastOrder} = item;
          return (
            <ResourceItem
              verticalAlignment="center"
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
              <div>{lastOrder}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}

export function WithDisabledState() {
  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([]);

  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        selectable
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        items={[
          {
            id: '145',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
            name: 'Yi So-Yeon',
            location: 'Gwangju, South Korea',
          },
          {
            id: '146',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/woman-standing-in-front-of-yellow-background.jpg?width=746',
            name: 'Jane Smith',
            location: 'Manhattan, New York',
          },
          {
            id: '147',
            url: '#',
            avatarSource:
              'https://burst.shopifycdn.com/photos/relaxing-in-headphones.jpg?width=746',
            name: 'Grace Baker',
            location: 'Los Angeles, California',
          },
        ]}
        renderItem={(item) => {
          const {id, url, avatarSource, name, location} = item;

          return (
            <ResourceItem
              disabled={id === '145'}
              id={id}
              url={url}
              media={
                <Avatar customer size="md" name={name} source={avatarSource} />
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}
