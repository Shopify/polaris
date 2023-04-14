import React from 'react';
import type {ButtonProps} from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {CalendarMinor} from '@shopify/polaris-icons';
import {useI18n} from '@shopify/react-i18n';

import {humanizedDateRange} from '../../../../utilities/reportify';
import type {DatePeriod} from '../../../../utilities/reportify';
import type {DateRange} from '../../types';
import {useDateRanges} from '../../hooks/useDateRanges';

interface Props {
  toggleViewer: () => void;
  fullWidth: boolean;
  timeZone?: string;
  datePeriod: DatePeriod | null;
  content?: string;
  options?: ButtonProps;
  dateRanges?: DateRange[];
}

export const ActivatorButton = function ActivatorButton({
  toggleViewer,
  fullWidth,
  timeZone,
  datePeriod,
  content,
  options,
  dateRanges = [],
}: Props) {
  const [i18n] = useI18n();
  const {deriveDateRange} = useDateRanges();

  function getButtonText() {
    const dateRange = deriveDateRange(dateRanges, datePeriod, timeZone);

    return dateRange?.alias === 'custom' && datePeriod
      ? humanizedDateRange(datePeriod, i18n, timeZone)
      : dateRange?.title || dateRange?.alias || '';
  }

  return (
    <Button
      size="slim"
      onClick={toggleViewer}
      fullWidth={fullWidth}
      icon={CalendarMinor}
      {...options}
    >
      {content || getButtonText()}
    </Button>
  );
};
