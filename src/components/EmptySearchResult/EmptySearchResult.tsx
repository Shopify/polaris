import * as React from 'react';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import {DisplayText, TextStyle, Image, Stack} from '../';

import emptySearch from './illustrations/empty-search.svg';
import styles from './EmptySearchResult.scss';

export interface Props {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

export type CombinedProps = Props & WithAppProviderProps;

export class EmptySearchResult extends React.PureComponent<
  CombinedProps,
  never
> {
  render() {
    const {title, description, withIllustration, polaris: {intl}} = this.props;

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

export default withAppProvider<Props>()(EmptySearchResult);
