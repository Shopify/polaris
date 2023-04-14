import {useId, useMemo, useState} from 'react';
import {Collapsible, Icon, OptionList} from '@shopify/polaris';
import {ChevronUpMinor, ChevronDownMinor} from '@shopify/polaris-icons';

import type {DateRange} from '../../../../types';

import styles from './QuickPicksSection.scss';

interface Props {
  title?: string;
  selected?: string[];
  options?: DateRange[];
  onChange: (values: string[]) => void;
}

function initialState(options: DateRange[], selected?: string[]) {
  return Boolean(
    selected &&
      options.some(
        (option) => option.alias === (selected[0] as DateRange['alias']),
      ),
  );
}

export function QuickPicksSection({
  title,
  onChange,
  options = [],
  selected = [],
}: Props) {
  const [open, setOpen] = useState(() => initialState(options, selected));

  const optionListOptions = useMemo(
    () => options.map(({alias, title}) => ({value: alias, label: title})),
    [options],
  );

  const id = useId();
  const collapsibleId = `date-picker-quick-picks-${id}`;

  return options.length > 0 ? (
    <div className={styles.QuickPicksSection}>
      <div className={styles.QuickPicksSectionButtonContainer}>
        <button
          className={styles.QuickPicksSectionButton}
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.QuickPicksSectionButtonTitle}>{title}</span>
          <Icon
            color="base"
            source={open ? ChevronUpMinor : ChevronDownMinor}
          />
        </button>
      </div>
      <Collapsible id={collapsibleId} open={open}>
        <OptionList
          options={optionListOptions}
          selected={selected}
          onChange={onChange}
        />
      </Collapsible>
    </div>
  ) : null;
}
