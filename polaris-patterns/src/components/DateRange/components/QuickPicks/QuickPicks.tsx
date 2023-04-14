import {OptionList} from '@shopify/polaris';
import {useCallback, useMemo} from 'react';

import type {QueryPeriod} from 'app/utilities/reportify';

import type {DateRange} from '../../types';

import {QuickPicksSection} from './components/QuickPicksSection';
import styles from './QuickPicks.scss';

export interface SectionDescriptor {
  title?: string;
  options: DateRange[];
}

export type QuickPickSource =
  | 'recommended-option'
  | 'section-option'
  | 'option';

export interface QuickPick {
  value: DateRange['alias'];
  period: QueryPeriod | null;
  source: QuickPickSource;
}

interface Props {
  selected?: QuickPick;
  onSelect: (value: QuickPick) => void;
  options?: DateRange[];
  recommended?: DateRange[];
  sections?: SectionDescriptor[];
}

export function QuickPicks({
  selected,
  onSelect,
  options = [],
  sections = [],
  recommended = [],
}: Props) {
  const optionListOptions = useMemo(() => {
    return [...options.map(({alias, title}) => ({value: alias, label: title}))];
  }, [options]);

  const recommendedListOptions = useMemo(
    () => recommended.map(({alias, title}) => ({value: alias, label: title})),
    [recommended],
  );

  const recommendedSelected: string[] =
    selected && selected.source === 'recommended-option'
      ? [selected.value]
      : [];

  const regularSelected: string[] =
    selected && selected.source === 'option' ? [selected.value] : [];

  const sectionSelected: string[] =
    selected && selected.source === 'section-option' ? [selected.value] : [];

  const handleRecommendedOnChange = useCallback(
    (values: string[]) => {
      const quickPick = recommended.find(
        (quickPick) => quickPick.alias === (values[0] as DateRange['alias']),
      );

      if (!quickPick) {
        throw new Error('Unable to select quick pick');
      }

      onSelect({
        value: quickPick.alias,
        period: quickPick.period,
        source: 'recommended-option',
      });
    },
    [onSelect, recommended],
  );

  const handleSectionOnChange = useCallback(
    (values: string[]) => {
      const quickPick = sections
        .flatMap((section) => section.options)
        .find(
          (quickPick) => quickPick.alias === (values[0] as DateRange['alias']),
        );

      if (!quickPick) {
        throw new Error('Unable to select quick pick');
      }

      onSelect({
        value: quickPick.alias,
        period: quickPick.period,
        source: 'section-option',
      });
    },
    [onSelect, sections],
  );

  const handleOnChange = useCallback(
    (values: string[]) => {
      const quickPick = options.find(
        (quickPick) => quickPick.alias === (values[0] as DateRange['alias']),
      );

      if (!quickPick) {
        throw new Error('Unable to select quick pick');
      }

      onSelect({
        value: quickPick.alias,
        period: quickPick.period,
        source: 'option',
      });
    },
    [onSelect, options],
  );

  return (
    <div className={styles.QuickPicks}>
      {recommendedListOptions.length > 0 ? (
        <div className={styles.QuickPicksRecommendedOptions}>
          <OptionList
            key="recommended"
            options={recommendedListOptions}
            selected={recommendedSelected}
            onChange={handleRecommendedOnChange}
          />
        </div>
      ) : null}
      <div className={styles.QuickPicksOptions}>
        <OptionList
          options={optionListOptions}
          selected={regularSelected}
          onChange={handleOnChange}
        />
      </div>
      {sections.map((section) => (
        <QuickPicksSection
          key={section.title}
          title={section.title}
          options={section.options}
          selected={sectionSelected}
          onChange={handleSectionOnChange}
        />
      ))}
    </div>
  );
}
