import React from 'react';

import {Text} from '../Text';
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
  const altText = 'Empty search results';

  const descriptionMarkup = description ? <p>{description}</p> : null;

  const illustrationMarkup = withIllustration ? (
    <Image alt={altText} source={emptySearch} draggable={false} />
  ) : null;

  return (
    <Stack alignment="center" vertical>
      {illustrationMarkup}
      <Text variant="headingLg" as="p">
        {title}
      </Text>
      <Text variant="bodyMd" color="subdued" as="span">
        {descriptionMarkup}
      </Text>
    </Stack>
  );
}
