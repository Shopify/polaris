import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  LegacyCard,
  OptionList,
  Popover,
  Thumbnail,
  BlockStack,
} from '@shopify/polaris';
import {DiscountsMajor, DiscountsMinor} from '@shopify/polaris-icons';

export default {
  component: OptionList,
} as ComponentMeta<typeof OptionList>;

export function Default() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <LegacyCard>
      <OptionList
        title="Inventory Location"
        onChange={handleChange}
        options={[
          {value: 'byward_market', label: 'Byward Market'},
          {value: 'centretown', label: 'Centretown'},
          {value: 'hintonburg', label: 'Hintonburg'},
          {value: 'westboro', label: 'Westboro'},
          {value: 'downtown', label: 'Downtown'},
        ]}
        selected={selected}
      />
    </LegacyCard>
  );
}

export function Multiple() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <LegacyCard>
      <OptionList
        title="Manage sales channels availability"
        onChange={handleChange}
        options={[
          {value: 'online_store', label: 'Online Store'},
          {value: 'messenger', label: 'Messenger'},
          {value: 'facebook', label: 'Facebook'},
          {value: 'wholesale', label: 'Wholesale'},
          {value: 'buzzfeed', label: 'BuzzFeed'},
        ]}
        selected={selected}
        allowMultiple
      />
    </LegacyCard>
  );
}

export function MultipleWithDisabledOption() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <LegacyCard>
      <OptionList
        title="Manage sales channels availability"
        onChange={handleChange}
        options={[
          {value: 'online_store', label: 'Online Store'},
          {value: 'messenger', label: 'Messenger', disabled: true},
          {value: 'facebook', label: 'Facebook'},
          {value: 'wholesale', label: 'Wholesale'},
          {value: 'buzzfeed', label: 'BuzzFeed'},
        ]}
        selected={selected}
        allowMultiple
      />
    </LegacyCard>
  );
}

export function WithSections() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <LegacyCard>
      <OptionList
        onChange={handleChange}
        sections={[
          {
            options: [
              {value: 'type', label: 'Sale item type'},
              {value: 'kind', label: 'Sale kind'},
            ],
          },
          {
            title: 'Traffic',
            options: [
              {value: 'source', label: 'Traffic referrer source'},
              {value: 'host', label: 'Traffic referrer host'},
              {value: 'path', label: 'Traffic referrer path'},
            ],
          },
          {
            title: 'Inventory Location',
            options: [
              {value: 'byward_market', label: 'Byward Market'},
              {value: 'centretown', label: 'Centretown'},
              {value: 'hintonburg', label: 'Hintonburg'},
              {value: 'westboro', label: 'Westboro'},
              {value: 'downtown', label: 'Downtown'},
            ],
          },
        ]}
        selected={selected}
        allowMultiple
      />
    </LegacyCard>
  );
}

export function InAPopover() {
  const [selected, setSelected] = useState([]);
  const [popoverActive, setPopoverActive] = useState(true);

  const handleChange = useCallback((value) => setSelected(value), []);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div style={{height: '275px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <OptionList
          title="Inventory Location"
          onChange={handleChange}
          options={[
            {
              value: 'byward_market',
              label: 'Byward Market',
            },
            {value: 'centretown', label: 'Centretown'},
            {
              value: 'hintonburg',
              label: 'Hintonburg',
            },
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={selected}
        />
      </Popover>
    </div>
  );
}

export function WithDisabledOption() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <LegacyCard>
      <OptionList
        title="Inventory Location"
        onChange={handleChange}
        options={[
          {value: 'byward_market', label: 'Byward Market'},
          {value: 'centretown', disabled: true, label: 'Centretown'},
          {value: 'hintonburg', label: 'Hintonburg'},
          {value: 'westboro', label: 'Westboro'},
          {value: 'downtown', label: 'Downtown'},
        ]}
        selected={selected}
      />
    </LegacyCard>
  );
}

export function All() {
  return (
    <BlockStack gap="200">
      <Card padding="0">
        <OptionList
          title="Default"
          onChange={() => {}}
          options={[
            {value: 'byward_market', label: 'Byward Market'},
            {value: 'centretown', disabled: true, label: 'Centretown'},
            {value: 'hintonburg', label: 'Hintonburg'},
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={['byward_market']}
        />
      </Card>
      <Card padding="0">
        <OptionList
          title="Mutiple"
          onChange={() => {}}
          options={[
            {value: 'byward_market', label: 'Byward Market'},
            {value: 'centretown', disabled: true, label: 'Centretown'},
            {value: 'hintonburg', disabled: true, label: 'Hintonburg'},
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={['byward_market', 'hintonburg']}
          allowMultiple
        />
      </Card>
      <Card padding="0">
        <OptionList
          onChange={() => {}}
          options={[
            {value: 'byward_market', label: 'No title'},
            {value: 'centretown', disabled: true, label: 'Centretown'},
            {value: 'hintonburg', label: 'Hintonburg'},
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={['byward_market']}
        />
      </Card>
      <Card padding="0">
        <OptionList
          title="Top vertical alignment"
          onChange={() => {}}
          options={[
            {
              value: 'top',
              label: 'Top',
              media: (
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                  size="small"
                />
              ),
            },
          ]}
          selected={[]}
          verticalAlign="top"
          allowMultiple
        />
        <OptionList
          title="Center vertical alignment"
          onChange={() => {}}
          options={[
            {
              value: 'center',
              label: 'Center',
              media: (
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                  size="small"
                />
              ),
            },
          ]}
          selected={['center']}
          verticalAlign="center"
          allowMultiple
        />
        <OptionList
          title="Bottom vertical alignment"
          onChange={() => {}}
          options={[
            {
              value: 'bottom',
              label: 'Bottom',
              media: (
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                  alt="Black choker necklace"
                  size="small"
                />
              ),
            },
          ]}
          selected={[]}
          verticalAlign="bottom"
          allowMultiple
        />
      </Card>
      <Card padding="0">
        <OptionList
          title="Media"
          onChange={() => {}}
          sections={[
            {
              title: 'Icons',
              options: [
                {
                  value: 'minor',
                  label: 'Minor',
                  media: <Icon source={DiscountsMinor} />,
                },
                {
                  value: 'major',
                  label: 'Major',
                  media: <Icon source={DiscountsMajor} />,
                },
              ],
            },
            {
              title: 'Avatars',
              options: [
                {
                  value: 'avatar_extra_small',
                  label: 'Avatar extra small',
                  media: <Avatar name="Hello World" size="xs" />,
                },
                {
                  value: 'avatar_small',
                  label: 'Avatar small',
                  media: <Avatar name="Hello World" size="sm" />,
                },
              ],
            },
            {
              title: 'Thumbnails',
              options: [
                {
                  value: 'thumbnail_small',
                  label: 'Thumbnail small',
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                      alt="Black choker necklace"
                      size="small"
                    />
                  ),
                },
                {
                  value: 'thumbnail_medium',
                  label: 'Thumbnail medium',
                  media: (
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                      alt="Black choker necklace"
                    />
                  ),
                },
              ],
            },
          ]}
          selected={['avatar_small']}
          verticalAlign="center"
        />
      </Card>
      <Card padding="0">
        <OptionList
          onChange={() => {}}
          title="Sectioned multiselect"
          sections={[
            {
              title: 'Type',
              options: [
                {value: 'type', label: 'Sale item type'},
                {value: 'kind', label: 'Sale kind'},
              ],
            },
            {
              title: 'Traffic',
              options: [
                {value: 'source', label: 'Traffic referrer source'},
                {value: 'host', disabled: true, label: 'Traffic referrer host'},
                {value: 'path', label: 'Traffic referrer path'},
              ],
            },
            {
              title: 'Inventory Location',
              options: [
                {value: 'byward_market', label: 'Byward Market'},
                {value: 'centretown', label: 'Centretown'},
                {value: 'hintonburg', label: 'Hintonburg'},
                {value: 'westboro', label: 'Westboro'},
                {value: 'downtown', label: 'Downtown'},
              ],
            },
          ]}
          selected={['source', 'host', 'westboro']}
          allowMultiple
        />
      </Card>
      <Card padding="0">
        <OptionList
          onChange={() => {}}
          title="Sectioned single select"
          sections={[
            {
              title: 'Type',
              options: [
                {value: 'type', disabled: true, label: 'Sale item type'},
                {value: 'kind', label: 'Sale kind'},
              ],
            },
            {
              title: 'Sectioned single select',
              options: [
                {value: 'source', label: 'Traffic referrer source'},
                {value: 'host', label: 'Traffic referrer host'},
                {value: 'path', label: 'Traffic referrer path'},
              ],
            },
          ]}
          selected={['source']}
        />
      </Card>
    </BlockStack>
  );
}
