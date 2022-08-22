import React from 'react';

import {DisplayText} from '../DisplayText';
import {TextStyle} from '../TextStyle';
import {Image} from '../Image';
import {Stack} from '../Stack';

import {emptySearch} from './illustrations';

export interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
  accessibilityLabel?: string;
}

export function EmptySearchResult({
  title,
  description,
  withIllustration,
  accessibilityLabel,
}: EmptySearchResultProps) {
  const descriptionMarkup = description ? <p>{description}</p> : null;

  const illustrationMarkup = withIllustration ? (
    <Image alt={accessibilityLabel} source={emptySearch} draggable={false} />
  ) : null;

  return (
    <Stack alignment="center" vertical>
      {illustrationMarkup}
      <DisplayText size="small">{title}</DisplayText>
      <TextStyle variation="subdued">{descriptionMarkup}</TextStyle>
    </Stack>
  );
}
