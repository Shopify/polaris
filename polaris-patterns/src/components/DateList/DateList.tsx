import React, {useState} from 'react';
import {Button, Popover, OptionList} from '@shopify/polaris';
import {CalendarMinor} from '@shopify/polaris-icons';

interface DateRangeOption {
  label: string;
  value: string;
  period: {
    since: string;
    until: string;
  } | null;
}

export interface DateListProps {
  options: DateRangeOption[];
  selected: DateRangeOption;
  onChange: (value: string[]) => void;
}

export const DateList = function DateList({
  options,
  selected,
  onChange,
}: DateListProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  return (
    <Popover
      autofocusTarget="none"
      preferredAlignment="left"
      preferInputActivator={false}
      preferredPosition="below"
      onClose={() => {
        setPopoverActive(false);
      }}
      activator={
        <Button
          onClick={() => setPopoverActive(!popoverActive)}
          icon={CalendarMinor}
        >
          {selected.label}
        </Button>
      }
      active={popoverActive}
    >
      <OptionList
        options={options.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
        selected={[selected.value]}
        onChange={(value) => {
          onChange(value);
          setPopoverActive(false);
        }}
      />
    </Popover>
  );
};
