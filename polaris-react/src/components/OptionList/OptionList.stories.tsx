import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, LegacyCard, OptionList, Popover} from '@shopify/polaris';

export default {
  component: OptionList,
} as ComponentMeta<typeof OptionList>;

export function Default() {
  const [selected, setSelected] = useState([]);

  return (
    <LegacyCard>
      <OptionList
        title="Inventory Location"
        onChange={setSelected}
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

  return (
    <LegacyCard>
      <OptionList
        title="Manage sales channels availability"
        onChange={setSelected}
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

export function WithSections() {
  const [selected, setSelected] = useState([]);

  return (
    <LegacyCard>
      <OptionList
        onChange={setSelected}
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
          onChange={setSelected}
          options={[
            {
              value: 'byward_market',
              label: 'Byward Market',
              active: true,
            },
            {value: 'centretown', label: 'Centretown'},
            {
              value: 'hintonburg',
              label: 'Hintonburg',
              active: true,
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
