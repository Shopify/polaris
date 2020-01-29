import React from 'react';
import {EmptySearchResult} from '../../../EmptySearchResult';
import {useI18n} from '../../../../utilities/i18n';
import {useResourceManagerForEmptyState} from '../../../../utilities/resources';

import styles from './EmptyState.scss';

export interface EmptyStateProps {}

export function EmptyState() {
  const {resourceName} = useResourceManagerForEmptyState();
  const i18n = useI18n();

  const title = i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
    resourceNamePlural: resourceName.plural,
  });
  const description = i18n.translate(
    'Polaris.ResourceList.emptySearchResultDescription',
  );

  return (
    <div className={styles.EmptySearchResultWrapper}>
      <EmptySearchResult
        title={title}
        description={description}
        withIllustration
      />
    </div>
  );
}
