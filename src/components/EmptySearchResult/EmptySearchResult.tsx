import React from 'react';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';
import {DisplayText} from '../DisplayText';
import {TextStyle} from '../TextStyle';
import {Image} from '../Image';
import {Stack} from '../Stack';

import {emptySearch} from './illustrations';
import styles from './EmptySearchResult.scss';

export interface EmptySearchResultProps {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

type CombinedProps = EmptySearchResultProps & WithAppProviderProps;

class EmptySearchResult extends React.PureComponent<CombinedProps, never> {
  render() {
    const {
      title,
      description,
      withIllustration,
      polaris: {intl},
    } = this.props;

    const altText = intl.translate('Polaris.EmptySearchResult.altText');

    const descriptionMarkup = description ? <p>{description}</p> : null;

    const illustrationMarkup = withIllustration ? (
      <Image
        alt={altText}
        source={emptySearch}
        className={styles.Image}
        draggable={false}
      />
    ) : null;

    return (
      <Stack alignment="center" vertical>
        {illustrationMarkup}
        <DisplayText size="small">{title}</DisplayText>
        <TextStyle variation="subdued">{descriptionMarkup}</TextStyle>
      </Stack>
    );
  }
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<EmptySearchResultProps>()(EmptySearchResult);
