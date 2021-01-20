import React, {memo, useEffect} from 'react';

import {Spinner} from '../../../../../Spinner';
import {useListBox} from '../../../../../../utilities/list-box';

import styles from './Loading.scss';

export interface LoadingProps {
  children?: React.ReactNode;
  accessibilityLabel: string;
}

export const Loading = memo(function LoadingOption({
  children,
  accessibilityLabel: label,
}: LoadingProps) {
  const {setLoading} = useListBox();

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
