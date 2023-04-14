import {LegacyStack, Button, useEventListener} from '@shopify/polaris';
import {useState} from 'react';
import {useI18n} from '@shopify/react-i18n';

import {condensedPage} from '../../../../utilities/breakpoints';

interface Props {
  cancel: () => void;
  isDirty: boolean;
  apply: () => void;
}

export function ActionButtons({cancel, isDirty, apply}: Props) {
  const [i18n] = useI18n();

  const [isCondensedPage, setIsCondensedPage] = useState(
    condensedPage().matches,
  );

  const buttonAlignment = isCondensedPage ? 'equalSpacing' : 'trailing';

  useEventListener('resize', () => {
    setIsCondensedPage(condensedPage().matches);
  });

  return (
    <LegacyStack distribution={buttonAlignment}>
      <Button onClick={cancel}>{i18n.translate('cancel')}</Button>
      <Button testID="applyButton" primary disabled={!isDirty} onClick={apply}>
        {i18n.translate('apply')}
      </Button>
    </LegacyStack>
  );
}
