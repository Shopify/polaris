import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {Action} from '../types';
import {buttonFrom} from '../Button';
import Heading from '../Heading';
import Icon, {Color} from '../Icon';
import Stack from '../Stack';
import TextContainer from '../TextContainer';

import * as styles from './Banner.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'critical';

export interface Props {
  icon: SVGSource,
  title?: string,
  status?: Status,
  action?: Action,
  children?: React.ReactNode,
  onDismissRequest?(): void,
}

export default class Banner extends React.PureComponent<Props, {}> {
  render() {
    const {
      icon,
      action,
      title,
      children,
      status,
      onDismissRequest,
    } = this.props;

    let color: Color;

    switch (status) {
      case 'success':
        color = 'greenDark';
        break;
      case 'attention' :
        color = 'tealDark';
        break;
      case 'warning':
        color = 'yellowDark';
        break;
      case 'critical':
        color = 'redDark';
        break;
      default:
        color = 'ink';
    }

    const className = classNames(
      styles.Banner,
      status && styles[variationName('status', status)],
      onDismissRequest && styles.hasDismiss,
    );

    const dismissButton = onDismissRequest
      ? (
        <button onClick={onDismissRequest} className={styles.Dismiss}>
          <Icon size={10} source="cancelMicro"/>
        </button>
        )
      : null;

    const actionMarkup = action
      ? (
        <div className={styles.Action}>
          {buttonFrom(action, {outline: true})}
        </div>
      )
      : null;

    const heading = title
      ? <Heading>{title}</Heading>
      : null;

    return (
      <div className={className}>
        <div className={styles.Ribbon}>
          <Icon source={icon} color={color} size={20} backdrop />
        </div>
        <div className={styles.Content}>
          <Stack distribution="equalSpacing">
            <TextContainer>
              {heading}
              {children}
              {actionMarkup}
            </TextContainer>
          </Stack>
        </div>
        {dismissButton}
      </div>
    );
  }
}
