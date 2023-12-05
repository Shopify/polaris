import React from 'react';
import {Columns3Minor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {Button} from '../../../Button';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';

export interface EditColumnsButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function EditColumnsButton({onClick, disabled}: EditColumnsButtonProps) {
  const i18n = useI18n();

  const tooltipContent = (
    <Text as="span" variant="bodyMd" alignment="center">
      {i18n.translate('Polaris.IndexFilters.EditColumnsButton.tooltip')}
    </Text>
  );

  return (
    <Tooltip
      content={tooltipContent}
      preferredPosition="above"
      hoverDelay={400}
    >
      <Button
        size="slim"
        onClick={onClick}
        disabled={disabled}
        icon={Columns3Minor}
        accessibilityLabel={i18n.translate(
          'Polaris.IndexFilters.EditColumnsButton.accessibilityLabel',
        )}
      />
    </Tooltip>
  );
}
