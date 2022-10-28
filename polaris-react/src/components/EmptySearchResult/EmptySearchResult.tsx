import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {DisplayText} from '../DisplayText';
import {TextStyle} from '../TextStyle';
import {Image} from '../Image';
import {Stack} from '../Stack';

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
    <Stack alignment="center" vertical>
      {illustrationMarkup}
      <DisplayText size="small">{title}</DisplayText>
      <TextStyle variation="subdued">{descriptionMarkup}</TextStyle>
    </Stack>
  );
}
