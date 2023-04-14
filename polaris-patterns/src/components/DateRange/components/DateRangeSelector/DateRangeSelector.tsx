import {Select} from '@shopify/polaris';
import {useI18n} from '@shopify/react-i18n';

import styles from '../../AnalyticsDatePicker.scss';
import type {DateRange} from '../../types';

interface Props {
  activeDateRange: DateRange | null;
  dateRanges: DateRange[];
  setIsDirty: (isDirty: boolean) => void;
  setDateRange: (dateRange: DateRange) => void;
  setMonthShouldUpdate: (monthShouldUpdate: boolean) => void;
  timeZone?: string;
}

export default function DateRangeSelector({
  activeDateRange,
  setIsDirty,
  setDateRange,
  setMonthShouldUpdate,
  dateRanges,
}: Props) {
  const [i18n] = useI18n();

  function getRangeSelectOptions() {
    const selectOptions = dateRanges.map(({alias, title}) => {
      return title || alias;
    });

    if (activeDateRange?.alias === 'custom') {
      return [i18n.translate('dateRanges.custom'), ...selectOptions];
    }

    return selectOptions;
  }

  function handleRangeSelectChange(selectedValue: string) {
    const dateRange = dateRanges.find(
      ({alias, title}) => alias === selectedValue || title === selectedValue,
    );
    if (dateRange == null) {
      return;
    }
    setIsDirty(true);
    setDateRange(dateRange);
    setMonthShouldUpdate(true);
  }

  return (
    <div className={styles.SelectLabel}>
      <Select
        label={i18n.translate('dateRangeLabel')}
        labelHidden
        options={getRangeSelectOptions()}
        value={activeDateRange?.title || activeDateRange?.alias || ''}
        onChange={handleRangeSelectChange}
      />
    </div>
  );
}
