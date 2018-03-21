import * as React from 'react';

import {DisplayText, TextStyle, Image, Stack} from '../';

import emptySearch from './illustrations/empty-search.svg';
import styles from './EmptySearchResult.scss';

export interface Props {
  title: string;
  description?: string;
  withIllustration?: boolean;
}

class EmptySearchResult extends React.PureComponent<Props, never> {
  private altText = 'Empty search results';

  render() {
    const {title, description, withIllustration} = this.props;

    const descriptionMarkup = description ? <p>{description}</p> : null;

    const illustrationMarkup = withIllustration ? (
      <Image
        alt={this.altText}
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

export default EmptySearchResult;
