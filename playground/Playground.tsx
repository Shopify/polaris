import React, {useState} from 'react';

import {Button, OptionList, Page, Popover} from '../src';

import styles from './Playground.scss';

const OPTIONS: any[] = [
  {value: 'byward_market', label: 'Byward Market'},
  {
    value: 'centretown',
    label: 'Centretown',
  },
  {
    value: 'hintonburg',
    label: 'Hintonburg',
  },
  {
    value: 'westboro',
    label: 'Westboro',
  },
  {
    value: '1town',
    label: '1town',
  },
  {
    value: '2town',
    label: '2town',
  },
  {
    value: '3town',
    label: '3town',
  },
  {
    value: '4town',
    label: '4town',
  },
  {
    value: 'funktown',
    label: 'Funktown',
  },
  {
    value: 'downtown',
    label: 'Downtown',
  },
  {
    value: 'uptown',
    label: 'Uptown',
  },
  {
    value: 'midtown',
    label: 'Midtown',
  },
];

export function Playground() {
  const [selected, setSelected] = useState<string[]>([]);
  const [popoverActive, setPopoverActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState<any>();

  const togglePopoverActive = () => {
    setPopoverActive((popoverActive) => !popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  const handleChange = (nextSelection: string[]) => {
    const [nextValue] = nextSelection;

    const nextOption = OPTIONS.find(({value}) => value === nextValue);
    if (nextOption) {
      setSelectedOption(nextOption);
    }

    setSelected(nextSelection);
    setPopoverActive(false);
  };

  const buildOptions = () => {
    return OPTIONS.map(({value, label}) => {
      return {
        value,
        label: <div>{label}</div>,
        active: selectedOption?.value === value,
      };
    });
  };

  return (
    <Page title="Playground">
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <div className={styles.OptionListContainer}>
          <OptionList
            onChange={handleChange}
            options={buildOptions()}
            selected={selected}
          />
        </div>
        <div className={styles.ButtonWrapper}>
          <Button>CREATE OPTION</Button>
        </div>
        <div className={styles.ButtonWrapper}>
          <Button>SORT ASCENDING</Button>
        </div>
      </Popover>
    </Page>
  );
}
