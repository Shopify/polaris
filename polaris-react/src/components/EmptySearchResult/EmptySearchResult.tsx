import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {Text} from '../Text';
import {Image} from '../Image';
import {LegacyStack} from '../LegacyStack';

import {emptySearch} from './illustrations';

export interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

export function EmptySearchResult({
  title,
  description,
  withIllustration,
}: EmptySearchResultProps) {
  const i18n = useI18n();
  const altText = i18n.translate('Polaris.EmptySearchResult.altText');

  const descriptionMarkup = description ? <p>{description}</p> : null;

  const illustrationMarkup = withIllustration ? (
    <Image alt={altText} source={emptySearch} draggable={false} />
  ) : null;

  return (
    <LegacyStack alignment="center" vertical>
      {illustrationMarkup}
      <Text variant="headingLg" as="p">
        {title}
      </Text>
      <Text variant="bodyMd" color="subdued" as="span">
        {descriptionMarkup}
      </Text>
    </LegacyStack>
  );
}
