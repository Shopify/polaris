import React, {memo, useEffect} from 'react';

import {useI18n} from '../../../../../../utilities/i18n';
import {Spinner} from '../../../../../Spinner';
import {useListBox} from '../../utilities/hooks/useListBox';

import styles from './Loading.scss';

export interface LoadingProps {
  children?: React.ReactNode;
  accessibilityLabel?: string;
}

export const Loading = memo(function LoadingOption({
  children,
  accessibilityLabel,
}: LoadingProps) {
  const i18n = useI18n();
  const {setLoading} = useListBox();

  // TODO add prop for resource/thing type?
  const label =
    accessibilityLabel ||
    i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel');

  useEffect(() => {
    setLoading(label);
    return () => {
      setLoading(undefined);
    };
  }, [label, setLoading]);

  return (
    <li className={styles.ListItem}>
      {children ? (
        children
      ) : (
        <div className={styles.Loading}>
          <Spinner size="small" accessibilityLabel={label} />
        </div>
      )}
    </li>
  );
});
