import * as React from 'react';

import {ComplexAction} from '../types';
import Avatar from '../Avatar';
import {buttonFrom} from '../Button';
import Card from '../Card';
import FeatureAction from '../FeatureAction';
import Stack from '../Stack';
import TextContainer from '../TextContainer';
import TextStyle from '../TextStyle';

export interface Props {
  connected?: boolean,
  action?: ComplexAction,
  avatarUrl?: string,
  accountName?: string,
  title?: React.ReactNode,
  details?: React.ReactNode,
  termsOfService?: React.ReactNode,
}

export default class AccountConnection extends React.PureComponent<Props, {}> {
  render() {
    const {
      connected = false,
      action,
      avatarUrl,
      accountName = '',
      title,
      details,
      termsOfService,
    } = this.props;

    const initials = accountName ? accountName.split(/\s+/).map((name) => name[0]) : undefined;

    const avatarMarkup = connected
      ? (
          <Avatar
            name={accountName}
            circular
            initials={initials}
            image={avatarUrl}
          />
        )
      : null;

    const titleMarkup = title
      ? <div>{title}</div>
      : <div>{accountName}</div>;

    const detailsMarkup = details
      ? <div><TextStyle variation="subdued">{details}</TextStyle></div>
      : null;

    const termsOfServiceMarkup = termsOfService
      ? <Card.Footer>{termsOfService}</Card.Footer>
      : null;

    const actionElement = action
      ? buttonFrom(action, {primary: !connected})
      : null;

    return (
      <Card>
        <Card.Section>
          <FeatureAction action={actionElement}>
            <Stack>
              {avatarMarkup}
              <Stack.Item fill>
                <TextContainer>
                  {titleMarkup}
                  {detailsMarkup}
                </TextContainer>
              </Stack.Item>
            </Stack>
          </FeatureAction>
        </Card.Section>
        {termsOfServiceMarkup}
      </Card>
    );
  }
}
