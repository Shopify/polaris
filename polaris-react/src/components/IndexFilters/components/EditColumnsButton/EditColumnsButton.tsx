import React from 'react';
import {Columns3Minor} from '@shopify/polaris-icons';

import {useFeatures} from '../../../../utilities/features';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';
import {FilterButton} from '../FilterButton';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';

export interface EditColumnsButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function EditColumnsButton({onClick, disabled}: EditColumnsButtonProps) {
  const i18n = useI18n();
  const {polarisSummerEditions2023} = useFeatures();

  const tooltipContent = (
    <Text as="span" variant="bodyMd" alignment="center">
      {i18n.translate('Polaris.IndexFilters.EditColumnsButton.editColumns')}
    </Text>
  );

  return (
    <Tooltip
      content={tooltipContent}
      preferredPosition="above"
      hoverDelay={400}
    >
      <FilterButton
        onClick={onClick}
        icon={polarisSummerEditions2023 ? Columns3Minor : undefined}
        label={i18n.translate(
          'Polaris.IndexFilters.EditColumnsButton.editColumns',
        )}
        disabled={disabled}
      >
        {!polarisSummerEditions2023 ? (
          <Icon source={Columns3Minor} color="base" />
        ) : null}
      </FilterButton>
    </Tooltip>
  );
}
